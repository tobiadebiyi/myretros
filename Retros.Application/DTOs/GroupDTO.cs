using System;
using System.Collections.Generic;
using System.Linq;
using Retros.Domain;

namespace Retros.Application.DTOs
{
    public class GroupDTO
    {
        public GroupDTO()
        {

        }

        public GroupDTO(Group group)
        {
            this.Id = group.Id;
            this.Name = group.Name;
            this.Comments = group.Comments.Select(c => new CommentDTO(c)).OrderBy(c => c.WhenAdded);
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<CommentDTO> Comments { get; set; }
    }
}
