using System;
using Retros.Web.UseCases.GetRetros;

namespace Retros.Web.UseCases.UpdateComment
{
    public class UpdateCommentRequest
    {
        public Guid RetroId { get; set; }
        public Guid GroupId { get; set; }
        public CommentDTO Comment { get; set; }
    }
}