using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Retros.DataAccess;
using Retros.Domain;

namespace Projects.Repositories
{
    public interface IRetroReposirotory
    {
        Task<IEnumerable<Retro>> Get();
    }

    public class RetroReposirotory : IRetroReposirotory
    {
        private readonly RetrosContext context;

        public RetroReposirotory(RetrosContext context)
        {
            this.context = context;
        }
        public async Task<IEnumerable<Retro>> Get()
        {
            return await this.context.Retros.ToListAsync();
        }
    }
}