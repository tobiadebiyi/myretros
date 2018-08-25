using System;
using System.Collections.Generic;
using System.Linq;
using Retros.Domain;

namespace Retros.Application.DTOs
{
    public class CommentDTO
    {
        public CommentDTO()
        {

        }
        public CommentDTO(Comment comment, string activeUserId)
        {
            this.Id = comment.Id;
            this.Text = comment.Text;
            this.IsOwner = activeUserId == comment.OwnerId;
            this.Actions = comment.Actions.Select(a => a.Value);
        }

        public Guid Id { get; set; }
        public string Text { get; set; }
        public bool IsOwner { get; set; }
        public IEnumerable<string> Actions { get; set; }
    }
}
