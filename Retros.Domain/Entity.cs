using System;

namespace Retros.Domain
{
    public class Entity
    {
        public Guid Id { get; protected set; } = Guid.NewGuid();

        public DateTime WhenCreated { get; set; } = DateTime.UtcNow;
    }
}