using Microsoft.AspNetCore.Http;

namespace ChamaJussa.DTOs
{
    public class UsuarioDTO
    {
        public string Nome { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        public IFormFile? FotoPerfil { get; set; }
    }
}