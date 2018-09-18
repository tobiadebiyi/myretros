# server build
FROM microsoft/dotnet:2.1-sdk AS dotnet-builder
WORKDIR /src
COPY server/Retros.Web.sln ./
COPY server/Retros.Web/Retros.Web.csproj Retros.Web/
COPY server/Retros.DataAccess/Retros.DataAccess.csproj Retros.DataAccess/
COPY server/Retros.Domain/Retros.Domain.csproj Retros.Domain/
COPY server/Retros.Application/Retros.Application.csproj Retros.Application/
COPY server/Application.Infrastructure/Application.Infrastructure.csproj Application.Infrastructure/
RUN dotnet restore
COPY ./server .
WORKDIR /src/Retros.Web
RUN dotnet publish --output /app/ --configuration Release

# client build
FROM node:alpine AS node-builder
COPY client/package.json .
RUN npm i

COPY ./client .
RUN npm run build

FROM nginx:alpine
COPY --from=node-builder /build /usr/share/nginx/html

# deployment
FROM microsoft/dotnet:2.1-aspnetcore-runtime
WORKDIR /app
COPY --from=dotnet-builder /app .
COPY --from=node-builder . wwwroot

# execute
ENTRYPOINT ["dotnet", "Retros.Web.dll"]