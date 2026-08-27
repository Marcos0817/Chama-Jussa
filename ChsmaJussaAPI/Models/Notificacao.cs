using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ChamaJussa.Models;

[Table("Notificacao")]
public partial class Notificacao
{
    [Key]
    [StringLength(40)]
    [Unicode(false)]
    public string IdNotificacao { get; set; } = null!;

    [StringLength(150)]
    [Unicode(false)]
    public string Titulo { get; set; } = null!;

    [StringLength(300)]
    [Unicode(false)]
    public string Mensagem { get; set; } = null!;

    public bool Lida { get; set; }

    [StringLength(40)]
    [Unicode(false)]
    public string? IdUsuario { get; set; }

    [Column("IdOS")]
    [StringLength(40)]
    [Unicode(false)]
    public string? IdOs { get; set; }

    [ForeignKey("IdOs")]
    [InverseProperty("Notificacaos")]
    public virtual OrdemServico? IdOsNavigation { get; set; }

    [ForeignKey("IdUsuario")]
    [InverseProperty("Notificacaos")]
    public virtual Usuario? IdUsuarioNavigation { get; set; }
    
}
