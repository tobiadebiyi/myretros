using Microsoft.EntityFrameworkCore;
using Retros.Domain;

namespace Retros.DataAccess
{
    public class RetrosContext : DbContext
    {
        public RetrosContext(DbContextOptions<RetrosContext> options) :
        base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Retro> Retros { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Retro>().HasKey(c => c.Id);
            modelBuilder.Entity<Retro>().HasMany(r => r.Groups).WithOne(g => g.Retro);
            modelBuilder.Entity<Retro>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<Retro>().Property(c => c.OwnerId).IsRequired();

            modelBuilder.Entity<Group>().HasKey(c => c.Id);
            modelBuilder.Entity<Group>().HasMany(g => g.Comments).WithOne(c => c.Group);
            modelBuilder.Entity<Group>().Property(c => c.Name).IsRequired();

            modelBuilder.Entity<Comment>().HasKey(c => c.Id);
            modelBuilder.Entity<Comment>().Property(c => c.Text).IsRequired();
        }
    }
}