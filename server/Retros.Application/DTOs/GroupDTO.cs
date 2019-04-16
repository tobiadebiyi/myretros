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

        public GroupDTO(Group group, string activeUserId)
        {
            this.Id = group.Id;
            this.Name = group.Name;
            this.Comments = group.Open ? group.Comments
                .OrderBy(c => c.WhenCreated)
                .Select(c => new CommentDTO(c, activeUserId)) : new List<CommentDTO>();
            this.Tags = group.Tags.OrderBy(t => t.WhenCreated).Select(t => t.Value);
            this.IsOpenForComments = group.Open;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<CommentDTO> Comments { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public bool IsOpenForComments { get; set; }
    }
}
