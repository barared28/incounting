# builder
FROM node:latest as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# starter
FROM nginx:1.21.0-alpine as starter

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]
