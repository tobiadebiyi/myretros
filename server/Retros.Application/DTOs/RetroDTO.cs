using System;
using System.Collections.Generic;
using System.Linq;
using Retros.Domain;

namespace Retros.Application.DTOs
{
    public class RetroDTO
    {
        public RetroDTO()
        {

        }

        public RetroDTO(Retro retro, string activeUserId)
        {
            this.Id = retro.Id;
            this.Name = retro.Name;
            this.Groups = 
                retro.Groups
                .OrderBy(g => g.WhenCreated)
                .Select(g => new GroupDTO(g, activeUserId));
            
            this.IsOwner = activeUserId.ToString() == retro.OwnerId;
            this.Reference = retro.Reference;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<GroupDTO> Groups { get; set; }
        public bool IsOwner { get; set; }
        public string Reference {get; set; }
    }
}
