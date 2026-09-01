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
    public class NotificacaoController : ControllerBase
    {
        private readonly ChamaJussaContext _context;

        public NotificacaoController(ChamaJussaContext context)
        {
            _context = context;
        }


        // =====================================================
        // GET: api/Notificacao
        // =====================================================

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificacaoResponseDTO>>> GetNotificacoes()
        {
            var notificacoes = await _context.Notificacaos

                .Select(n => new NotificacaoResponseDTO
                {
                    IdNotificacao = n.IdNotificacao,

                    Titulo = n.Titulo,

                    Mensagem = n.Mensagem,

                    Lida = n.Lida,

                    IdUsuario = n.IdUsuario,

                    IdOS = n.IdOs,

                    // ==========================================
                    // NÚMERO DA OS
                    // ==========================================

                    NumeroOS = n.IdOsNavigation != null
                        ? n.IdOsNavigation.NumeroOs
                        : null,

                    // ==========================================
                    // DATA E HORA DA OS
                    // ==========================================

                    DataCadastro = n.IdOsNavigation != null
                        ? n.IdOsNavigation.DataCadastro
                        : null
                })

                .ToListAsync();


            return Ok(notificacoes);
        }


        // =====================================================
        // GET: api/Notificacao/minhas
        // =====================================================

        [Authorize]
        [HttpGet("minhas")]
        public async Task<ActionResult<IEnumerable<NotificacaoResponseDTO>>> GetMinhasNotificacoes()
        {
            // ==========================================
            // PEGA O ID DO USUÁRIO LOGADO
            // ==========================================

            var idUsuario =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (idUsuario == null)
            {
                return Unauthorized();
            }


            // ==========================================
            // BUSCA AS NOTIFICAÇÕES
            // ==========================================

            var notificacoes = await _context.Notificacaos

                .Where(n => n.IdUsuario == idUsuario)

                .Select(n => new NotificacaoResponseDTO
                {
                    IdNotificacao = n.IdNotificacao,

                    Titulo = n.Titulo,

                    Mensagem = n.Mensagem,

                    Lida = n.Lida,

                    IdUsuario = n.IdUsuario,

                    IdOS = n.IdOs,

                    // ==========================================
                    // NÚMERO DA OS
                    // ==========================================

                    NumeroOS = n.IdOsNavigation != null
                        ? n.IdOsNavigation.NumeroOs
                        : null,

                    // ==========================================
                    // DATA E HORA DA OS
                    // ==========================================

                    DataCadastro = n.IdOsNavigation != null
                        ? n.IdOsNavigation.DataCadastro
                        : null
                })

                .ToListAsync();


            return Ok(notificacoes);
        }


        // =====================================================
        // PUT: api/Notificacao/{id}/lida
        // =====================================================

        [Authorize]
        [HttpPut("{id}/lida")]
        public async Task<IActionResult> MarcarComoLida(string id)
        {
            // ==========================================
            // PEGA O ID DO USUÁRIO LOGADO
            // ==========================================

            var idUsuario =
                User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            if (idUsuario == null)
            {
                return Unauthorized();
            }


            // ==========================================
            // BUSCA A NOTIFICAÇÃO
            // ==========================================

            var notificacao = await _context.Notificacaos

                .FirstOrDefaultAsync(
                    n => n.IdNotificacao == id
                );


            if (notificacao == null)
            {
                return NotFound(
                    "Notificação não encontrada."
                );
            }


            // ==========================================
            // VERIFICA SE A NOTIFICAÇÃO PERTENCE AO USUÁRIO
            // ==========================================

            if (notificacao.IdUsuario != idUsuario)
            {
                return Forbid();
            }


            // ==========================================
            // MARCA COMO LIDA
            // ==========================================

            notificacao.Lida = true;


            await _context.SaveChangesAsync();


            return NoContent();
        }


        // =====================================================
        // CRIAR NOTIFICAÇÃO
        // =====================================================

        private async Task CriarNotificacao(
            string titulo,
            string mensagem,
            string idUsuario,
            string idOS)
        {
            var notificacao = new Notificacao
            {
                IdNotificacao = Guid.NewGuid().ToString(),

                Titulo = titulo,

                Mensagem = mensagem,

                Lida = false,

                IdUsuario = idUsuario,

                IdOs = idOS
            };


            _context.Notificacaos.Add(notificacao);


            await _context.SaveChangesAsync();
        }
    }
}