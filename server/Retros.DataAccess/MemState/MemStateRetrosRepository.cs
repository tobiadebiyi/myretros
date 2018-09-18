using Memstate;
using Memstate.Configuration;
using Retros.Application.Interfaces;
using Retros.DataAccess.MemState;
using Retros.DataAccess.MemState.Commands;
using Retros.DataAccess.MemState.Queries;
using Retros.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Retros.DataAcces.MemState
{
    public class MemStateRetrosRepository : IRetroReposirotory
    {
        private readonly Engine<RetrosModel> MemStateEngine;

        public MemStateRetrosRepository()
        {
            var config = Config.Current;
            var settings = config.GetSettings<EngineSettings>();
            settings.StreamName = "RetroDB";
            
            this.MemStateEngine = Engine.Start<RetrosModel>().Result;
        }
        public async Task<Retro> Add(Retro newRetro)
        {
            var result = await MemStateEngine.Execute(new AddRetro(newRetro));
            return result;
        }

        public async Task Delete(Retro retro)
        {
            await this.MemStateEngine.Execute(new DeleteRetro(retro));
        }

        public async Task<Retro> Get(Guid retroId)
        {
            return await MemStateEngine.Execute(new GetRetroById(retroId));
        }

        public Task<IEnumerable<Retro>> GetByUserId(string userId)
        {
            return MemStateEngine.Execute(new GetRetrosByUserId(userId));
        }

        public async Task Update(Retro retro)
        {
            await this.MemStateEngine.Execute(new UpdateRetro(retro));
        }
    }
}
