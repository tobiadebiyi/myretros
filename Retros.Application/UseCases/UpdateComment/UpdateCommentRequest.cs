using System;
using Retros.Application.DTOs;

namespace Retros.Application.UseCases.UpdateComment
{
    public class UpdateCommentRequest
    {
        public Guid RetroId { get; set; }
        public Guid GroupId { get; set; }
        public CommentDTO Comment { get; set; }
    }
}