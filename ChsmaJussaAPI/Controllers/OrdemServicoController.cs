using ChamaJussa.DTOs;
using ChamaJussa.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ChamaJussa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class OrdemServicoController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ChamaJussaContext _context;

        public OrdemServicoController(
    ChamaJussaContext context,
    IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }







        // GET: api/OrdemServico/minhas
        [Authorize]
        [HttpGet("minhas")]
        public async Task<ActionResult<IEnumerable<OrdemServicoResponseDTO>>> GetMinhasOrdens()
        {
            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }

            var ordens = await _context.OrdemServicos
                .Where(os => os.IdUsuario == idUsuario)
                .Select(os => new OrdemServicoResponseDTO
                {
                    IdOS = os.IdOs,
                    NumeroOS = os.NumeroOs,
                    TituloProblema = os.TituloProblema,
                    MaquinaEquipamento = os.MaquinaEquipamento,
                    LocalSetor = os.LocalSetor,
                    DescricaoProblema = os.DescricaoProblema,
                    FotoProblema = os.FotoProblema,
                    Status = os.Status,
                    IdUsuario = os.IdUsuario,
                    NomeUsuario = os.IdUsuarioNavigation.Nome
                })
                .ToListAsync();

            return Ok(ordens);
        }



        // GET: api/OrdemServico
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdemServicoResponseDTO>>> GetOrdensServico()
        {
            var ordens = await _context.OrdemServicos
                .Select(os => new OrdemServicoResponseDTO
                {
                    IdOS = os.IdOs,
                    NumeroOS = os.NumeroOs,
                    TituloProblema = os.TituloProblema,
                    MaquinaEquipamento = os.MaquinaEquipamento,
                    LocalSetor = os.LocalSetor,
                    DescricaoProblema = os.DescricaoProblema,
                    FotoProblema = os.FotoProblema,
                    Status = os.Status,
                    IdUsuario = os.IdUsuario,
                    NomeUsuario = os.IdUsuarioNavigation.Nome
                })
                .ToListAsync();

            return Ok(ordens);
        }

        // GET: api/OrdemServico/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<OrdemServicoResponseDTO>> GetOrdemServico(string id)
        {
            var ordemServico = await _context.OrdemServicos
                .Where(os => os.IdOs == id)
                .Select(os => new OrdemServicoResponseDTO
                {
                    IdOS = os.IdOs,
                    NumeroOS = os.NumeroOs,
                    TituloProblema = os.TituloProblema,
                    MaquinaEquipamento = os.MaquinaEquipamento,
                    LocalSetor = os.LocalSetor,
                    DescricaoProblema = os.DescricaoProblema,
                    FotoProblema = os.FotoProblema,
                    Status = os.Status,
                    IdUsuario = os.IdUsuario,
                    NomeUsuario = os.IdUsuarioNavigation.Nome
                })
                .FirstOrDefaultAsync();

            if (ordemServico == null)
            {
                return NotFound("Ordem de serviço não encontrada.");
            }

            return Ok(ordemServico);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<OrdemServicoResponseDTO>> PostOrdemServico(
     OrdemServicoDTO ordemServicoDTO)
        {
            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);

            if (usuario == null)
            {
                return Unauthorized("Usuário não encontrado.");
            }

            string? caminhoFoto = null;

            if (ordemServicoDTO.FotoProblema != null)
            {
                var extensoesPermitidas = new[]
                {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

                var extensao = Path.GetExtension(
                    ordemServicoDTO.FotoProblema.FileName
                ).ToLowerInvariant();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    return BadRequest("Formato de imagem não permitido.");
                }

                if (ordemServicoDTO.FotoProblema.Length > 5 * 1024 * 1024)
                {
                    return BadRequest("A imagem deve ter no máximo 5 MB.");
                }

                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                var pasta = Path.Combine(
    _environment.ContentRootPath,
    "wwwroot",
    "imagens",
    "ordens"
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

                await ordemServicoDTO.FotoProblema.CopyToAsync(stream);

                caminhoFoto = $"imagens/ordens/{nomeArquivo}";
            }
            var ordemServico = new OrdemServico
            {
                IdOs = Guid.NewGuid().ToString(),
                NumeroOs = ordemServicoDTO.NumeroOS,
                TituloProblema = ordemServicoDTO.TituloProblema,
                MaquinaEquipamento = ordemServicoDTO.MaquinaEquipamento,
                LocalSetor = ordemServicoDTO.LocalSetor,
                DescricaoProblema = ordemServicoDTO.DescricaoProblema,
                FotoProblema = caminhoFoto,
                Status = ordemServicoDTO.Status,
                IdUsuario = idUsuario
            };

            _context.OrdemServicos.Add(ordemServico);

            await _context.SaveChangesAsync();

            var notificacao = new Notificacao
            {
                IdNotificacao = Guid.NewGuid().ToString(),
                Titulo = "Nova Ordem de Serviço",
                Mensagem = $"A ordem de serviço {ordemServico.NumeroOs} foi criada.",
                Lida = false,
                IdUsuario = idUsuario,
                IdOs = ordemServico.IdOs
            };

            _context.Notificacaos.Add(notificacao);

            await _context.SaveChangesAsync();

            var resposta = new OrdemServicoResponseDTO
            {
                IdOS = ordemServico.IdOs,
                NumeroOS = ordemServico.NumeroOs,
                TituloProblema = ordemServico.TituloProblema,
                MaquinaEquipamento = ordemServico.MaquinaEquipamento,
                LocalSetor = ordemServico.LocalSetor,
                DescricaoProblema = ordemServico.DescricaoProblema,
                FotoProblema = ordemServico.FotoProblema,
                Status = ordemServico.Status,
                IdUsuario = ordemServico.IdUsuario,
                NomeUsuario = usuario.Nome
            };

            return CreatedAtAction(
                nameof(GetOrdemServico),
                new { id = ordemServico.IdOs },
                resposta
            );
        }

        [Authorize]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutOrdemServico(
     string id,
     [FromForm] OrdemServicoDTO ordemServicoDTO)
        {
            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }

            var ordemServico = await _context.OrdemServicos
                .FirstOrDefaultAsync(os => os.IdOs == id);

            if (ordemServico == null)
            {
                return NotFound("Ordem de serviço não encontrada.");
            }

            // Verifica se a OS pertence ao usuário logado
            if (ordemServico.IdUsuario != idUsuario)
            {
                return Forbid();
            }

            // Atualiza os dados da OS
            ordemServico.NumeroOs = ordemServicoDTO.NumeroOS;
            ordemServico.TituloProblema = ordemServicoDTO.TituloProblema;
            ordemServico.MaquinaEquipamento = ordemServicoDTO.MaquinaEquipamento;
            ordemServico.LocalSetor = ordemServicoDTO.LocalSetor;
            ordemServico.DescricaoProblema = ordemServicoDTO.DescricaoProblema;
            ordemServico.Status = ordemServicoDTO.Status;

            // Se uma nova imagem foi enviada
            if (ordemServicoDTO.FotoProblema != null)
            {
                var extensoesPermitidas = new[]
                {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        };

                var extensao = Path.GetExtension(
                    ordemServicoDTO.FotoProblema.FileName
                ).ToLowerInvariant();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    return BadRequest("Formato de imagem não permitido.");
                }

                if (ordemServicoDTO.FotoProblema.Length > 5 * 1024 * 1024)
                {
                    return BadRequest("A imagem deve ter no máximo 5 MB.");
                }

                var nomeArquivo = $"{Guid.NewGuid()}{extensao}";

                var pasta = Path.Combine(
                    _environment.WebRootPath,
                    "imagens",
                    "ordens"
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

                await ordemServicoDTO.FotoProblema.CopyToAsync(stream);

                ordemServico.FotoProblema =
                    $"imagens/ordens/{nomeArquivo}";
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }


        // DELETE: api/OrdemServico/{id}
        // DELETE: api/OrdemServico/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdemServico(string id)
        {
            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }

            var ordemServico = await _context.OrdemServicos
                .FirstOrDefaultAsync(os => os.IdOs == id);

            if (ordemServico == null)
            {
                return NotFound("Ordem de serviço não encontrada.");
            }

            // Verifica se a OS pertence ao usuário logado
            if (ordemServico.IdUsuario != idUsuario)
            {
                return Forbid();
            }

            // Guarda o caminho da foto antes de excluir a OS
            var caminhoFoto = ordemServico.FotoProblema;

            // Remove as notificações relacionadas à OS
            var notificacoes = await _context.Notificacaos
                .Where(n => n.IdOs == ordemServico.IdOs)
                .ToListAsync();

            if (notificacoes.Any())
            {
                _context.Notificacaos.RemoveRange(notificacoes);
            }

            // Remove a Ordem de Serviço
            _context.OrdemServicos.Remove(ordemServico);

            // Salva as alterações no banco
            await _context.SaveChangesAsync();

            // Depois que o banco confirmou a exclusão,
            // remove a imagem física
            if (!string.IsNullOrEmpty(caminhoFoto))
            {
                var caminhoCompleto = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    caminhoFoto.Replace("/", Path.DirectorySeparatorChar.ToString())
                );

                if (System.IO.File.Exists(caminhoCompleto))
                {
                    System.IO.File.Delete(caminhoCompleto);
                }
            }

            return NoContent();
        }
    }
}