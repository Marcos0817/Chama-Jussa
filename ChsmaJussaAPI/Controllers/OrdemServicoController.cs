using ChamaJussa.DTOs;
using ChamaJussa.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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


        // =========================================================
        // GET: api/OrdemServico/minhas
        // =========================================================

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


        // =========================================================
        // GET: api/OrdemServico
        // =========================================================

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


        // =========================================================
        // GET: api/OrdemServico/{id}
        // =========================================================

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


        // =========================================================
        // POST: api/OrdemServico
        // =========================================================

        [Authorize]
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<OrdemServicoResponseDTO>> PostOrdemServico(
            [FromForm] OrdemServicoDTO ordemServicoDTO)
        {
            // -----------------------------------------------------
            // Usuário logado
            // -----------------------------------------------------

            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }


            // -----------------------------------------------------
            // Verifica se o usuário existe
            // -----------------------------------------------------

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.IdUsuario == idUsuario);

            if (usuario == null)
            {
                return Unauthorized("Usuário não encontrado.");
            }


            // -----------------------------------------------------
            // Validação dos campos
            // -----------------------------------------------------

            if (string.IsNullOrWhiteSpace(ordemServicoDTO.TituloProblema))
            {
                return BadRequest("Título do problema é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(ordemServicoDTO.MaquinaEquipamento))
            {
                return BadRequest("Máquina/Equipamento é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(ordemServicoDTO.LocalSetor))
            {
                return BadRequest("Local/Setor é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(ordemServicoDTO.DescricaoProblema))
            {
                return BadRequest("Descrição do problema é obrigatória.");
            }


            // -----------------------------------------------------
            // GERA AUTOMATICAMENTE O NÚMERO DA OS
            // -----------------------------------------------------

            var numerosExistentes = await _context.OrdemServicos
                .Select(os => os.NumeroOs)
                .ToListAsync();

            int proximoNumero = 1;

            foreach (var numero in numerosExistentes)
            {
                if (int.TryParse(numero, out int numeroConvertido))
                {
                    if (numeroConvertido >= proximoNumero)
                    {
                        proximoNumero = numeroConvertido + 1;
                    }
                }
            }

            var numeroOS = proximoNumero.ToString("D3");


            // -----------------------------------------------------
            // Foto
            // -----------------------------------------------------

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

                var extensao = Path
                    .GetExtension(ordemServicoDTO.FotoProblema.FileName)
                    .ToLowerInvariant();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    return BadRequest("Formato de imagem não permitido.");
                }

                if (ordemServicoDTO.FotoProblema.Length > 5 * 1024 * 1024)
                {
                    return BadRequest("A imagem deve ter no máximo 5 MB.");
                }

                var nomeArquivo =
                    $"{Guid.NewGuid()}{extensao}";

                var pasta = Path.Combine(
                    _environment.WebRootPath ?? Path.Combine(
                        _environment.ContentRootPath,
                        "wwwroot"
                    ),
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

                caminhoFoto =
                    $"imagens/ordens/{nomeArquivo}";
            }


            // -----------------------------------------------------
            // Cria a Ordem de Serviço
            // -----------------------------------------------------

            var ordemServico = new OrdemServico
            {
                IdOs = Guid.NewGuid().ToString(),

                // Número gerado automaticamente
                NumeroOs = numeroOS,

                TituloProblema =
                    ordemServicoDTO.TituloProblema,

                MaquinaEquipamento =
                    ordemServicoDTO.MaquinaEquipamento,

                LocalSetor =
                    ordemServicoDTO.LocalSetor,

                DescricaoProblema =
                    ordemServicoDTO.DescricaoProblema,

                FotoProblema =
                    caminhoFoto,

                Status =
                    ordemServicoDTO.Status,

                IdUsuario =
                    idUsuario
            };


            _context.OrdemServicos.Add(ordemServico);

            await _context.SaveChangesAsync();


            // -----------------------------------------------------
            // Cria notificação
            // -----------------------------------------------------

            var notificacao = new Notificacao
            {
                IdNotificacao =
                    Guid.NewGuid().ToString(),

                Titulo =
                    "Nova Ordem de Serviço",

                Mensagem =
                    $"A ordem de serviço {ordemServico.NumeroOs} foi criada.",

                Lida = false,

                IdUsuario =
                    idUsuario,

                IdOs =
                    ordemServico.IdOs
            };


            _context.Notificacaos.Add(notificacao);

            await _context.SaveChangesAsync();


            // -----------------------------------------------------
            // Retorno
            // -----------------------------------------------------

            var resposta = new OrdemServicoResponseDTO
            {
                IdOS =
                    ordemServico.IdOs,

                NumeroOS =
                    ordemServico.NumeroOs,

                TituloProblema =
                    ordemServico.TituloProblema,

                MaquinaEquipamento =
                    ordemServico.MaquinaEquipamento,

                LocalSetor =
                    ordemServico.LocalSetor,

                DescricaoProblema =
                    ordemServico.DescricaoProblema,

                FotoProblema =
                    ordemServico.FotoProblema,

                Status =
                    ordemServico.Status,

                IdUsuario =
                    ordemServico.IdUsuario,

                NomeUsuario =
                    usuario.Nome
            };


            return CreatedAtAction(
                nameof(GetOrdemServico),
                new
                {
                    id = ordemServico.IdOs
                },
                resposta
            );
        }


        // =========================================================
        // PUT: api/OrdemServico/{id}
        // =========================================================

        [Authorize]
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> PutOrdemServico(
            string id,
            [FromForm] OrdemServicoDTO ordemServicoDTO)
        {
            var idUsuario =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }


            var ordemServico =
                await _context.OrdemServicos
                    .FirstOrDefaultAsync(os => os.IdOs == id);


            if (ordemServico == null)
            {
                return NotFound(
                    "Ordem de serviço não encontrada."
                );
            }


            // -----------------------------------------------------
            // Verifica proprietário
            // -----------------------------------------------------

            if (ordemServico.IdUsuario != idUsuario)
            {
                return Forbid();
            }


            // -----------------------------------------------------
            // Atualiza os dados
            // -----------------------------------------------------

            // O número NÃO é alterado na edição.
            // Ele continua sendo o número original gerado
            // quando a OS foi criada.

            ordemServico.TituloProblema =
                ordemServicoDTO.TituloProblema;

            ordemServico.MaquinaEquipamento =
                ordemServicoDTO.MaquinaEquipamento;

            ordemServico.LocalSetor =
                ordemServicoDTO.LocalSetor;

            ordemServico.DescricaoProblema =
                ordemServicoDTO.DescricaoProblema;

            ordemServico.Status =
                ordemServicoDTO.Status;


            // -----------------------------------------------------
            // Nova foto
            // -----------------------------------------------------

            if (ordemServicoDTO.FotoProblema != null)
            {
                var extensoesPermitidas = new[]
                {
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".webp"
                };


                var extensao = Path
                    .GetExtension(
                        ordemServicoDTO.FotoProblema.FileName
                    )
                    .ToLowerInvariant();


                if (!extensoesPermitidas.Contains(extensao))
                {
                    return BadRequest(
                        "Formato de imagem não permitido."
                    );
                }


                if (
                    ordemServicoDTO.FotoProblema.Length >
                    5 * 1024 * 1024
                )
                {
                    return BadRequest(
                        "A imagem deve ter no máximo 5 MB."
                    );
                }


                var nomeArquivo =
                    $"{Guid.NewGuid()}{extensao}";


                var pasta = Path.Combine(
                    _environment.WebRootPath ??
                    Path.Combine(
                        _environment.ContentRootPath,
                        "wwwroot"
                    ),
                    "imagens",
                    "ordens"
                );


                if (!Directory.Exists(pasta))
                {
                    Directory.CreateDirectory(pasta);
                }


                var caminhoCompleto =
                    Path.Combine(
                        pasta,
                        nomeArquivo
                    );


                using var stream =
                    new FileStream(
                        caminhoCompleto,
                        FileMode.Create
                    );


                await ordemServicoDTO
                    .FotoProblema
                    .CopyToAsync(stream);


                ordemServico.FotoProblema =
                    $"imagens/ordens/{nomeArquivo}";
            }


            await _context.SaveChangesAsync();


            return NoContent();
        }


        // =========================================================
        // DELETE: api/OrdemServico/{id}
        // =========================================================

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrdemServico(
            string id)
        {
            var idUsuario =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (idUsuario == null)
            {
                return Unauthorized();
            }


            var ordemServico =
                await _context.OrdemServicos
                    .FirstOrDefaultAsync(
                        os => os.IdOs == id
                    );


            if (ordemServico == null)
            {
                return NotFound(
                    "Ordem de serviço não encontrada."
                );
            }


            // -----------------------------------------------------
            // Verifica proprietário
            // -----------------------------------------------------

            if (ordemServico.IdUsuario != idUsuario)
            {
                return Forbid();
            }


            // -----------------------------------------------------
            // Guarda caminho da foto
            // -----------------------------------------------------

            var caminhoFoto =
                ordemServico.FotoProblema;


            // -----------------------------------------------------
            // Remove notificações
            // -----------------------------------------------------

            var notificacoes =
                await _context.Notificacaos
                    .Where(
                        n => n.IdOs ==
                        ordemServico.IdOs
                    )
                    .ToListAsync();


            if (notificacoes.Any())
            {
                _context.Notificacaos
                    .RemoveRange(notificacoes);
            }


            // -----------------------------------------------------
            // Remove OS
            // -----------------------------------------------------

            _context.OrdemServicos
                .Remove(ordemServico);


            await _context.SaveChangesAsync();


            // -----------------------------------------------------
            // Remove foto física
            // -----------------------------------------------------

            if (!string.IsNullOrEmpty(caminhoFoto))
            {
                var caminhoCompleto =
                    Path.Combine(
                        _environment.WebRootPath ??
                        Path.Combine(
                            _environment.ContentRootPath,
                            "wwwroot"
                        ),
                        caminhoFoto.Replace(
                            "/",
                            Path.DirectorySeparatorChar
                                .ToString()
                        )
                    );


                if (System.IO.File.Exists(caminhoCompleto))
                {
                    System.IO.File.Delete(
                        caminhoCompleto
                    );
                }
            }


            return NoContent();
        }
    }
}