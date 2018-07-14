namespace Retros.Domain {
    public class Comment : Entity
    {
        protected Comment()
        {
            
        }
        public Comment(string text)
        {
            Text = text;
        }

        public string Text { get; protected set; }
        public Group Group { get; protected set; }
    }
}