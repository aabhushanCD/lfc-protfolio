
FROM node:22-alpine

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .



EXPOSE 5173

CMD ["npm", "run", "dev","--", "--host"]

# FROM nginx:alpine


# COPY --from=builder /app/build /usr/share/nginx/html



# CMD ["nginx", "-g", "daemon off;"]