using Memstate;
using Retros.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Retros.DataAccess.MemState.Commands
{
    class UpdateRetro : Command<RetrosModel, Retro>
    {
        public Retro Retro { get; set; }
        public UpdateRetro()
        {

        }
        public UpdateRetro(Retro retro)
        {
            this.Retro = retro;
        }

        public override Retro Execute(RetrosModel model)
        {
            model.Retros.TryGetValue(this.Retro.Id, out Retro existingRetro);

            if (existingRetro == null)
                throw new InvalidOperationException("Retro not found");

            model.Retros[this.Retro.Id] = this.Retro;
            return this.Retro;
        }
    }
}
