namespace ChamaJussa.DTOs
{
    public class OrdemServicoResponseDTO
    {
        public string IdOS { get; set; }

        public string NumeroOS { get; set; }

        public string TituloProblema { get; set; }

        public string MaquinaEquipamento { get; set; }

        public string LocalSetor { get; set; }

        public string DescricaoProblema { get; set; }

        public string? FotoProblema { get; set; }

        public string Status { get; set; }

        public string IdUsuario { get; set; }

        public string? NomeUsuario { get; set; }
    }
}