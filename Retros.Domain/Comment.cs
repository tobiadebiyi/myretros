using System;

namespace Retros.Domain {
    public class Comment : Entity
    {
        protected Comment()
        {
            WhenAdded = DateTime.UtcNow;
        }
        public Comment(string text) : this()
        {
            this.Id = Guid.NewGuid();
            Text = text;
        }

        public string Text { get; protected set; }
        public Group Group { get; protected set; }
        public DateTime WhenAdded { get; protected set; }
    }
}