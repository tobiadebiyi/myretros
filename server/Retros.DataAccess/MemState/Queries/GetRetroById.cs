using Memstate;
using Retros.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Retros.DataAccess.MemState.Queries
{
    class GetRetroById : Query<RetrosModel, Retro>
    {
        private readonly Guid RetroId;

        public GetRetroById(Guid retroId)
        {
            this.RetroId = retroId;
        }
        public override Retro Execute(RetrosModel model)
        {
            model.Retros.TryGetValue(this.RetroId, out Retro retro);

            return retro;
        }
    }
}
