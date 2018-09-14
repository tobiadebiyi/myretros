using System;
using Retros.Domain;

namespace Retros.Application.DTOs
{
    public class ActionDTO
    {
        public ActionDTO()
        {
        }

        public ActionDTO(Domain.Action action)
        {
            this.Id = action.Id;
            this.CommentId = action.CommentId;
            this.Text = action.Text;
        }

        public Guid Id { get; set; }
        public Guid CommentId { get; set; }
        public string Text { get; set; }
    }
}
