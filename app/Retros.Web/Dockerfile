FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build AS builder
WORKDIR /src
COPY Retros.Web.sln ./
COPY Retros.Web/Retros.Web.csproj Retros.Web/
COPY Retros.DataAccess/Retros.DataAccess.csproj Retros.DataAccess/
COPY Retros.Domain/Retros.Domain.csproj Retros.Domain/
COPY Retros.Application/Retros.Application.csproj Retros.Application/
RUN dotnet restore -nowarn:msb3202,nu1503
COPY . .
WORKDIR /src/Retros.Web
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Retros.Web.dll"]
