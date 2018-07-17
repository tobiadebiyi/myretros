using System;

namespace Retros.Application
{
    public class OperationResult
    {
        protected OperationResult()
        {
        }

        public OperationResult(bool succeeded)
        {
            this.Succeded = succeeded;
        }

        public bool Succeded { get; set; }
    }

    public class OperationResult<T> : OperationResult
    {
        public T Value { get; set; }
    }

    public static class OperationResultCreator
    {
        public static OperationResult Suceeded()
        {
            return new OperationResult(true);
        }

        public static OperationResult<T> Suceeded<T>(T value)
        {
            return new OperationResult<T> { Succeded = true, Value = value };
        }
    }
}