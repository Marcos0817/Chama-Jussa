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
    public class NotificacaoController : ControllerBase
    {
        private readonly ChamaJussaContext _context;

        public NotificacaoController(ChamaJussaContext context)
        {
            _context = context;
        }


        // GET: api/Notificacao
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
                    NumeroOS = n.IdOsNavigation.NumeroOs
                })
                .ToListAsync();

            return Ok(notificacoes);
        }
        // GET: api/Notificacao/usuario/{idUsuario}
        // GET: api/Notificacao/minhas
        [Authorize]
        [HttpGet("minhas")]
        public async Task<ActionResult<IEnumerable<NotificacaoResponseDTO>>> GetMinhasNotificacoes()
        {
            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }

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
                    NumeroOS = n.IdOsNavigation.NumeroOs
                })
                .ToListAsync();

            return Ok(notificacoes);
        }



        // PUT: api/Notificacao/{id}/lida
        [Authorize]
        [HttpPut("{id}/lida")]
        public async Task<IActionResult> MarcarComoLida(string id)
        {
            var idUsuario = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (idUsuario == null)
            {
                return Unauthorized();
            }

            var notificacao = await _context.Notificacaos
                .FirstOrDefaultAsync(n => n.IdNotificacao == id);

            if (notificacao == null)
            {
                return NotFound("Notificação não encontrada.");
            }

            if (notificacao.IdUsuario != idUsuario)
            {
                return Forbid();
            }

            notificacao.Lida = true;

            await _context.SaveChangesAsync();

            return NoContent();
        }








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