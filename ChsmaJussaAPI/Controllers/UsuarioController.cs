using ChamaJussa.DTOs;
using ChamaJussa.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChamaJussa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly ChamaJussaContext _context;
        private readonly IConfiguration _configuration;

        public UsuarioController(
            ChamaJussaContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Usuario
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioResponseDTO>>> GetUsuarios()
        {
            var usuarios = await _context.Usuarios
                .Select(u => new UsuarioResponseDTO
                {
                    IdUsuario = u.IdUsuario,
                    Nome = u.Nome,
                    Email = u.Email,
                    FotoPerfil = u.FotoPerfil
                })
                .ToListAsync();

            return Ok(usuarios);
        }

        // GET: api/Usuario/me
        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UsuarioResponseDTO>> GetMeuPerfil()
        {
            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }

            var usuario = await _context.Usuarios
                .Where(u => u.IdUsuario == idUsuario)
                .Select(u => new UsuarioResponseDTO
                {
                    IdUsuario = u.IdUsuario,
                    Nome = u.Nome,
                    Email = u.Email,
                    FotoPerfil = u.FotoPerfil
                })
                .FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(usuario);
        }

        // GET: api/Usuario/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioResponseDTO>> GetUsuario(string id)
        {
            var usuario = await _context.Usuarios
                .Where(u => u.IdUsuario == id)
                .Select(u => new UsuarioResponseDTO
                {
                    IdUsuario = u.IdUsuario,
                    Nome = u.Nome,
                    Email = u.Email,
                    FotoPerfil = u.FotoPerfil
                })
                .FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(usuario);
        }

        // PUT: api/Usuario/{id}
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutUsuario(
            string id,
            [FromForm] UsuarioDTO usuarioDTO)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            usuario.Nome = usuarioDTO.Nome;
            usuario.Email = usuarioDTO.Email;

            // Se uma nova foto foi enviada
            if (usuarioDTO.FotoPerfil != null)
            {
                var extensoesPermitidas = new[]
                {
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".webp"
                };

                var extensao = Path
                    .GetExtension(usuarioDTO.FotoPerfil.FileName)
                    .ToLowerInvariant();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    return BadRequest("Formato de imagem não permitido.");
                }

                if (usuarioDTO.FotoPerfil.Length > 5 * 1024 * 1024)
                {
                    return BadRequest("A imagem deve ter no máximo 5 MB.");
                }

                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                var pasta = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "imagens",
                    "usuarios"
                );

                if (!Directory.Exists(pasta))
                {
                    Directory.CreateDirectory(pasta);
                }

                var caminhoCompleto = Path.Combine(
                    pasta,
                    nomeArquivo
                );

                using var stream = new FileStream(
                    caminhoCompleto,
                    FileMode.Create
                );

                await usuarioDTO.FotoPerfil.CopyToAsync(stream);

                usuario.FotoPerfil =
                    $"imagens/usuarios/{nomeArquivo}";
            }

            // Por enquanto não alteramos a senha
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Usuario/login
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDTO>> Login(
            LoginDTO loginDTO)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u =>
                    u.Email == loginDTO.Email &&
                    u.Senha == loginDTO.Senha);

            if (usuario == null)
            {
                return Unauthorized("Email ou senha inválidos.");
            }

            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    usuario.IdUsuario
                ),

                new Claim(
                    ClaimTypes.Name,
                    usuario.Nome
                ),

                new Claim(
                    ClaimTypes.Email,
                    usuario.Email
                )
            };

            var chave = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!
                )
            );

            var credenciais = new SigningCredentials(
                chave,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credenciais
            );

            var tokenString = new JwtSecurityTokenHandler()
                .WriteToken(token);

            return Ok(new LoginResponseDTO
            {
                Token = tokenString,
                IdUsuario = usuario.IdUsuario,
                Nome = usuario.Nome,
                Email = usuario.Email
            });
        }

        // POST: api/Usuario
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<UsuarioResponseDTO>> PostUsuario(
            [FromForm] UsuarioDTO usuarioDTO)
        {
            // Verifica se o email já existe
            var emailExiste = await _context.Usuarios
                .AnyAsync(u => u.Email == usuarioDTO.Email);

            if (emailExiste)
            {
                return BadRequest("Este email já está cadastrado.");
            }

            string? caminhoFoto = null;

            // Se uma foto foi enviada
            if (usuarioDTO.FotoPerfil != null)
            {
                var extensoesPermitidas = new[]
                {
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".webp"
                };

                var extensao = Path
                    .GetExtension(usuarioDTO.FotoPerfil.FileName)
                    .ToLowerInvariant();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    return BadRequest("Formato de imagem não permitido.");
                }

                if (usuarioDTO.FotoPerfil.Length > 5 * 1024 * 1024)
                {
                    return BadRequest(
                        "A imagem deve ter no máximo 5 MB."
                    );
                }

                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                var pasta = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "imagens",
                    "usuarios"
                );

                if (!Directory.Exists(pasta))
                {
                    Directory.CreateDirectory(pasta);
                }

                var caminhoCompleto = Path.Combine(
                    pasta,
                    nomeArquivo
                );

                using var stream = new FileStream(
                    caminhoCompleto,
                    FileMode.Create
                );

                await usuarioDTO.FotoPerfil.CopyToAsync(stream);

                caminhoFoto =
                    $"imagens/usuarios/{nomeArquivo}";
            }

            var usuario = new Usuario
            {
                IdUsuario = Guid.NewGuid().ToString(),
                Nome = usuarioDTO.Nome,
                Email = usuarioDTO.Email,
                Senha = usuarioDTO.Senha,
                FotoPerfil = caminhoFoto
            };

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            var resposta = new UsuarioResponseDTO
            {
                IdUsuario = usuario.IdUsuario,
                Nome = usuario.Nome,
                Email = usuario.Email,
                FotoPerfil = usuario.FotoPerfil
            };

            return CreatedAtAction(
                nameof(GetUsuario),
                new { id = usuario.IdUsuario },
                resposta
            );
        }

        // DELETE: api/Usuario/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(string id)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            _context.Usuarios.Remove(usuario);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}