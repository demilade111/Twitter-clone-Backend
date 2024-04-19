# Use an official Node runtime as a parent image
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
ENV PORT 8000
CMD ["node", "index.js"]






