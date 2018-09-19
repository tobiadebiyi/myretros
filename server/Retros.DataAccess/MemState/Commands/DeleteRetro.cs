using Memstate;
using Retros.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Retros.DataAccess.MemState.Commands
{
    class DeleteRetro : Command<RetrosModel>
    { 
        public Retro Retro { get; protected set; }
        protected DeleteRetro()
        {

        }
        public DeleteRetro(Retro retro)
        {
            this.Retro = retro;
        }

        public override void Execute(RetrosModel model)
        {
            model.Retros.TryGetValue(this.Retro.Id, out Retro existingRetro);

            if (existingRetro == null)
                throw new InvalidOperationException("Retro not found");

            model.Retros.Remove(this.Retro.Id);
        }
    }
}
