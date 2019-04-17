using System;
using Retros.Application.DTOs;

namespace Retros.Application.UseCases.Common
{
    public class RetroGroupActionRequest
    {
        public Guid RetroId { get; set; }
        public Guid GroupId { get; set; }
    }
}