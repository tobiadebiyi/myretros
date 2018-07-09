using System;
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

        public DbSet<Retro> Retros {get; set;}
        public DbSet<Group> Groups {get; set;}
        public DbSet<Comment> Comments {get; set;}

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder.Entity<Retro>().HasMany(r => r.Groups);
            builder.Entity<Group>().HasMany(g => g.Comments);
        }
    }
}