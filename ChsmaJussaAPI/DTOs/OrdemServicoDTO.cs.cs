using Microsoft.AspNetCore.Http;

namespace ChamaJussa.DTOs
{
    public class OrdemServicoDTO
    {

        public string TituloProblema { get; set; }

        public string MaquinaEquipamento { get; set; }

        public string LocalSetor { get; set; }

        public string DescricaoProblema { get; set; }

        public IFormFile? FotoProblema { get; set; }

        public string Status { get; set; }
    }
}