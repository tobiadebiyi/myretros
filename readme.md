# MyRetros

## Use
- If you simply want to use MyReytros with your team, click <a href="http://myretros.tobiadebiyi.com/">here</a>
- We're always open to new ideas and improvements, so don't forget to leave feedback and comments here on git hub.

## Deployment

### Docker: Single Deployment
- Single deployment: An image of the application is available on Docker Hub @ `tobiadebiyi/myretros`

### Docker: Client/Server Deployment
- You can clone the repo and create separate docker images for ./client && ./server.
- Server: To allow connections from the client, you will need to pass the `ALLOWED_ORIGINS` environment variable to your server container.
- Client: `REACT_APP_SERVER_URL` environment variable should be set to the server's url
