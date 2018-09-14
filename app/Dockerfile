FROM microsoft/dotnet:2.1-sdk AS dotnet-builder
WORKDIR /src

COPY Retros.Web.sln ./
COPY Retros.Web/Retros.Web.csproj Retros.Web/
COPY Retros.DataAccess/Retros.DataAccess.csproj Retros.DataAccess/
COPY Retros.Domain/Retros.Domain.csproj Retros.Domain/
COPY Retros.Application/Retros.Application.csproj Retros.Application/
COPY Application.Infrastructure/Application.Infrastructure.csproj Application.Infrastructure/
RUN dotnet restore

COPY . .
WORKDIR /src/Retros.Web
RUN dotnet publish --output /app/ --configuration Release

FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=dotnet-builder /app .
ENTRYPOINT ["dotnet", "Retros.Web.dll"]