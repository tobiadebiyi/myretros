using System;
using Retros.Application.DTOs;
using Retros.Application.UseCases.Common;

namespace Retros.Application.UseCases.AddComment
{
    public class AddCommentRequest : RetroGroupActionRequest
    {
        public CommentDTO Comment { get; set; }
    }
}