using System;
using Retros.Domain;

namespace Retros.Web.UseCases.GetRetros
{
    public class CommentDTO
    {
        public CommentDTO(Comment comment)
        {
            this.Id = comment.Id;
            this.Text = comment.Text;
        }

        public Guid Id { get; }
        public string Text { get; }
    }
}
