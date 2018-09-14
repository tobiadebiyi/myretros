FROM node:alpine AS node-builder
COPY package.json .
RUN npm i

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=node-builder /build /usr/share/nginx/html