FROM node:stable-alpine AS build
WORKDIR /usr/src/app
COPY . .

# Serve
FROM nginx:stable-alpine
COPY --from=build /usr/src/app /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
