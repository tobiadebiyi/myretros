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
            modelBuilder.Entity<Retro>().HasMany(r => r.Groups).WithOne(g => g.Retro);
            modelBuilder.Entity<Group>().HasMany(g => g.Comments).WithOne(c => c.Group);
        }
    }
}