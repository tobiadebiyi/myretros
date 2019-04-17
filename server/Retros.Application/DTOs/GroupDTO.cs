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
            this.Comments = group.Public ? 
            GetOrderedComments(group)
                .Select(c => new CommentDTO(c, activeUserId)) 
            : GetOrderedComments(group)
                .Where(c => c.OwnerId == activeUserId)
                .Select(c => new CommentDTO(c, activeUserId));
            this.Tags = group.Tags.OrderBy(t => t.WhenCreated).Select(t => t.Value);
            this.CommentsArePublic = group.Public;
        }

        public IOrderedEnumerable<Comment> GetOrderedComments(Group group) => group.Comments
            .OrderBy(c => c.WhenCreated);

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<CommentDTO> Comments { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public bool CommentsArePublic { get; set; }
    }
}
