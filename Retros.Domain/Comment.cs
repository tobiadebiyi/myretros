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

        public string Text { get; }
        public Group Retro { get; }
    }
}