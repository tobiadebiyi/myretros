using System;
using System.Collections.Generic;

namespace Retros.Web.UseCases.GetRetros
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
