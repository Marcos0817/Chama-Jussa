using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ChamaJussa.Models;

public partial class ChamaJussaContext : DbContext
{
    public ChamaJussaContext()
    {
    }

    public ChamaJussaContext(DbContextOptions<ChamaJussaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Notificacao> Notificacaos { get; set; }

    public virtual DbSet<OrdemServico> OrdemServicos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Notificacao>(entity =>
        {
            entity.HasKey(e => e.IdNotificacao)
                .HasName("PK__Notifica__046D38722147C755");

            entity.HasOne(d => d.IdOsNavigation)
                .WithMany(p => p.Notificacaos)
                .HasConstraintName("FK__Notificaca__IdOS__6477ECF3");

            entity.HasOne(d => d.IdUsuarioNavigation)
                .WithMany(p => p.Notificacaos)
                .HasConstraintName("FK__Notificac__IdUsu__6383C8BA");
        });

        modelBuilder.Entity<OrdemServico>(entity =>
        {
            entity.HasKey(e => e.IdOs)
                .HasName("PK__OrdemSer__B770330F1D8A87BA");

            entity.HasOne(d => d.IdUsuarioNavigation)
                .WithMany(p => p.OrdemServicos)
                .HasConstraintName("FK__OrdemServ__IdUsu__60A75C0F");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario)
                .HasName("PK__Usuario__5B65BF97518C73F8");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}