using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Retros.Application.Interfaces;
using Retros.DataAccess;
using Retros.Domain;

namespace Projects.Repositories
{
    public class RetroReposirotory : IRetroReposirotory
    {
        private readonly RetrosContext context;

        public RetroReposirotory(RetrosContext context)
        {
            this.context = context;
        }

        public async Task<Retro> Add(Retro newRetro)
        {
            var retro = await this.context.Retros.AddAsync(newRetro);
            await this.context.SaveChangesAsync();

            return retro.Entity;
        }

        public async Task Delete(Retro retro)
        {
            this.context.Retros.Remove(retro);
            await this.context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Retro>> Get()
        {
            return await this.context.Retros
                             .Include(r => r.Groups)
                             .ThenInclude(g => g.Comments)
                             .ToListAsync();
        }

        public Task<Retro> Get(Guid retroId)
        {
            return this.context.Retros
                       .Include(r => r.Groups)
                       .ThenInclude(r => r.Comments)
                       .FirstOrDefaultAsync(r => r.Id == retroId);
        }

        public async Task Update(Retro retro)
        {
            this.context.Retros.Update(retro);
            await this.context.SaveChangesAsync();
        }
    }
}