# Stage 1: 
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force \
    # && npm install -g npm@10.8.1 \
    && npm install

COPY . .
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine AS runtime
WORKDIR /app
RUN npm install -g serve
COPY package*.json ./
RUN npm ci --only=production 

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
USER node