using System;

namespace Retros.Domain {
    public class Comment : Entity
    {
        protected Comment()
        {
            
        }
        public Comment(string text)
        {
            this.Id = Guid.NewGuid();
            Text = text;
        }

        public string Text { get; protected set; }
        public Group Group { get; protected set; }
    }
}