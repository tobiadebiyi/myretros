using Memstate;
using Retros.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Retros.DataAccess.MemState.Queries
{
    class GetRetroByReference : Query<RetrosModel, Retro>
    {
        private readonly string Reference;

        public GetRetroByReference(string reference)
        {
            this.Reference = reference;
        }
        public override Retro Execute(RetrosModel model)
        {
            var retro = model.Retros
                .FirstOrDefault(r => r.Value.Reference == this.Reference);

            return retro.Value;
        }
    }
}
