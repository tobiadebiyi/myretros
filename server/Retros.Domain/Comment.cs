using System;
using System.Collections.Generic;

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

        public string Text { get; set; }
        public string OwnerId { get; protected set; }
        public Group Group { get; protected set; }
        public ICollection<Action> Actions { get; set; } = new List<Action>();
    }
}