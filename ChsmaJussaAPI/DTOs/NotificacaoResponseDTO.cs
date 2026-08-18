namespace ChamaJussa.DTOs
{
    public class NotificacaoResponseDTO
    {
        public string IdNotificacao { get; set; }

        public string Titulo { get; set; }

        public string Mensagem { get; set; }

        public bool Lida { get; set; }

        public string IdUsuario { get; set; }

        public string IdOS { get; set; }

        public string? NumeroOS { get; set; }
    }
}