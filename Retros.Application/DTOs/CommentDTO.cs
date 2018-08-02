using System;
using Retros.Domain;

namespace Retros.Application.DTOs
{
    public class CommentDTO
    {
        public CommentDTO()
        {

        }
        public CommentDTO(Comment comment)
        {
            this.Id = comment.Id;
            this.Text = comment.Text;
        }

        public Guid Id { get; set; }
        public string Text { get; set; }

        public Comment AsDomainModel()
        {
            return new Comment(this.Text);
        }
    }
}
