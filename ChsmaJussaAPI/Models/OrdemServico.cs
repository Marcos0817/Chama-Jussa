using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ChamaJussa.Models;

[Table("OrdemServico")]
[Index("NumeroOs", Name = "UQ__OrdemSer__C6A65EC26E1E4F5A", IsUnique = true)]
public partial class OrdemServico
{
    [Key]
    [Column("IdOS")]
    [StringLength(40)]
    [Unicode(false)]
    public string IdOs { get; set; } = null!;

    [Column("NumeroOS")]
    [StringLength(20)]
    [Unicode(false)]
    public string NumeroOs { get; set; } = null!;

    [StringLength(200)]
    [Unicode(false)]
    public string TituloProblema { get; set; } = null!;

    [StringLength(150)]
    [Unicode(false)]
    public string MaquinaEquipamento { get; set; } = null!;

    [StringLength(150)]
    [Unicode(false)]
    public string LocalSetor { get; set; } = null!;

    [Unicode(false)]
    public string DescricaoProblema { get; set; } = null!;

    [StringLength(100)]
    [Unicode(false)]
    public string? FotoProblema { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

    // ==========================================
    // DATA E HORA DO CADASTRO
    // ==========================================
    public DateTime DataCadastro { get; set; }

    [StringLength(40)]
    [Unicode(false)]
    public string? IdUsuario { get; set; }

    [ForeignKey("IdUsuario")]
    [InverseProperty("OrdemServicos")]
    public virtual Usuario? IdUsuarioNavigation { get; set; }   

    [InverseProperty("IdOsNavigation")]
    public virtual ICollection<Notificacao> Notificacaos { get; set; } = new List<Notificacao>();
}