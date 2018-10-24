using System;
using Retros.Application.DTOs;

namespace Retros.Application.UseCases.UpdateComment
{
    public class UpdateCommentResponse
    {
        public CommentDTO Comment { get; set; }
        public Guid GroupId { get; set; }
        public Guid RetroId { get; internal set; }
    }
}
