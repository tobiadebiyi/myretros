using System;

namespace Retros.Domain
{
    public class Entity
    {
        public string Id { get; protected set; } = 

        public DateTime WhenCreated { get; protected set; } = DateTime.UtcNow;
    }
}