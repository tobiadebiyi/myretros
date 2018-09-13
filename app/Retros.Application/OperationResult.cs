using System;
using System.Collections.Generic;
using Retros.Application.DTOs;

namespace Retros.Application
{
    public class OperationResult
    {
        protected OperationResult()
        {
        }

        public OperationResult(bool succeeded, params string[] errors)
        {
            this.Succeded = succeeded;
            this.Errors = errors;
        }

        public bool Succeded { get; protected set; }
        public IEnumerable<string> Errors { get; protected set; }
    }

    public class OperationResult<T> : OperationResult
    {
        public OperationResult(bool succeded, T value = default(T), params string[] errors)
        {
            this.Succeded = succeded;
            this.Value = value;
            this.Errors = errors;
        }
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
            return new OperationResult<T>(true, value);
        }

        public static OperationResult<T> Failed<T>(params string[] errors)
        {
            return new OperationResult<T>(false, errors: errors);
        }

        public static OperationResult Failed(params string[] errors)
        {
            return new OperationResult(false, errors);
        }
    }
}