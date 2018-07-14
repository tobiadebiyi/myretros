using System;
using System.Collections.Generic;
using System.Linq;
using Retros.Domain;

namespace Retros.Web.UseCases.GetRetros
{
    public class RetroDTO
    {
        public RetroDTO()
        {

        }
        public RetroDTO(Retro retro)
        {
            this.Id = retro.Id;
            this.Name = retro.Name;
            this.Groups = retro.Groups.Select(g => new GroupDTO(g));

        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<GroupDTO> Groups { get; set; }
    }
}
