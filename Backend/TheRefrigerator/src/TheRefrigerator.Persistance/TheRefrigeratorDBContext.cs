using Microsoft.EntityFrameworkCore;
using TheRefrigerator.Domain;

namespace TheRefrigerator.Persistance
{
    public class TheRefrigeratorDBContext : DbContext
    {
        public TheRefrigeratorDBContext(DbContextOptions<TheRefrigeratorDBContext> options) : base (options) { 

        }
        //Modelo, sirve para dar a EF la clase y que pueda o sepa manejar y qué hacer con esa clase
        public DbSet<Note> Notes { get; set; }
        public DbSet<User> Users { get; set; }

        //Crea Modelos para que se acerquen a la estructura de la BD
        //Igual sirve pa poder darle instrucciones de como capturar los datos
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            // Aca le digo a EF oye tengo una nota pero que tiene un usuario.
            // pero a la vez ese usuario tiene varias notas y para idintificar el usuario usa esta FK
            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasOne(n => n.User)
                .WithMany(u => u.Notes)
                .HasForeignKey(n => n.idUser)
                .IsRequired()
                //si se borra el usuario borra todas las notas consigo 
                .OnDelete(DeleteBehavior.Cascade);
                entity.Property(e => e.Id).HasColumnName("idNote");

            });
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("idUser");
            });
        }
    }
}
