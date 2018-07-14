using System;
using System.Collections.Generic;
using System.Linq;
using Retros.Domain;

namespace Retros.Web.UseCases.GetRetros
{
    public class RetroDTO
    {
        public RetroDTO(Retro domainRetro)
        {
            this.Name = domainRetro.Name;
            this.Groups = domainRetro.Groups.Select(g => new GroupDTO(g));

        }

        public string Name { get; }
        public IEnumerable<GroupDTO> Groups { get; }
    }
}
