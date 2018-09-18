using Memstate;
using Retros.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Retros.DataAccess.MemState.Queries
{
    class GetRetrosByUserId : Query<RetrosModel, IEnumerable<Retro>>
    {
        private readonly string UserId;

        public GetRetrosByUserId(string userId)
        {
            this.UserId = userId;
        }
        public override IEnumerable<Retro> Execute(RetrosModel model)
        {
            var retros = model.Retros
                .Where(r => r.Value.OwnerId == UserId)
                .Select(r => r.Value);

            return retros;
        }
    }
}
