using System;
using Retros.Domain;
using Retros.Web.UseCases.GetRetros;

namespace Retros.Web.UseCases.AddComment
{
    public class AddCommentRequest
    {
        public Guid RetroId { get; set; }
        public Guid GroupId { get; set; }
        public CommentDTO Comment { get; set; }
    }
}