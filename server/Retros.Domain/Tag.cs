using System;
namespace Retros.Domain
{
    public class Tag : Entity
    {
        protected Tag()
        {

        }
        internal Tag(string value)
        {
            this.Value = value;
        }

        public string Value { get; protected set; }
        public Group Group { get; protected set; }
    }
}
