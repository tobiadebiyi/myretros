using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Retros.Application.Interfaces;
using Retros.Domain;

namespace Retros.DataAccess.Repositories
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

        public Task<Retro> Get(Guid retroId)
        {
            return this.context.Retros
                       .Include(r => r.Groups)
                       .ThenInclude(r => r.Comments)
                       .ThenInclude(c => c.Actions)
                       .FirstOrDefaultAsync(r => r.Id == retroId);
        }

        public async Task<IEnumerable<Retro>> GetByUserId(string userId)
        {
            return await this.context.Retros
                        .Where(r => r.OwnerId == userId)
                        .Include(r => r.Groups)
                        .ThenInclude(r => r.Comments)
                             .Include(r => r.Groups)
                             .ThenInclude(g => g.Tags)
                             .ToListAsync();
        }

        public async Task Update(Retro retro)
        {
            this.context.Retros.Update(retro);
            await this.context.SaveChangesAsync();
        }
    }
}