# Using MyRetros

## Deployment

### Docker: Single Deployment
- Single deployment: An image of the application is available on Docker Hub @ `tobiadebiyi/myretros`

### Docker: Client/Server Deployment
- You can clone the repo and create separate docker images for ./client && ./server.
- Server: To allow connections from the client, you will need to pass the `ALLOWED_ORIGINS` environment variable to your server container.
