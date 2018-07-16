using System.Collections.Generic;
using Retros.Application.DTOs;

namespace Retros.Application.UseCases.GetRetros
{
    public class GetRetrosResponse
    {
        public GetRetrosResponse(IEnumerable<RetroDTO> retros)
        {
            this.Retros = retros;
        }

        public IEnumerable<RetroDTO> Retros { get; }
    }
}
