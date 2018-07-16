using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Retros.Domain;

namespace Retros.Application.Interfaces
{
    public interface IRetroReposirotory
    {
        Task<IEnumerable<Retro>> Get();
        Task<Retro> Get(Guid retroId);
        Task Update(Retro retro);
    }
}