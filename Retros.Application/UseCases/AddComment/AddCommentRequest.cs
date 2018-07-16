using System;
using Retros.Application.DTOs;

namespace Retros.Application.UseCases.AddComment
{
    public class AddCommentRequest
    {
        public Guid RetroId { get; set; }
        public Guid GroupId { get; set; }
        public CommentDTO Comment { get; set; }
    }
}