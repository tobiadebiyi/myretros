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
            this.Comments = group.Comments.OrderBy(c => c.WhenCreated).Select(c => new CommentDTO(c));
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<CommentDTO> Comments { get; set; }
    }
}
