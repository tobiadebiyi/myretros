using System;

namespace Retros.Domain {
    public class Comment : Entity
    {
        protected Comment()
        {
        }
        public Comment(string text, string ownerId)
        {
            this.Id = Guid.NewGuid();
            Text = text;
            this.OwnerId = ownerId;
        }

        public string Text { get; protected set; }
        public string OwnerId { get; protected set; }
        public Group Group { get; protected set; }
        public DateTime WhenAdded { get; protected set; } = DateTime.UtcNow;
    }
}