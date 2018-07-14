namespace Retros.Web.Application
{
    public class OperationResult
    {
        object value { get; set; }
        public bool Succeded { get; set; }
    }
    public class OperationResult<T> : OperationResult
    {
        public T Value { get; set; }
    }
}