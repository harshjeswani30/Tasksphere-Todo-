FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* package-lock.json* ./

RUN pnpm install || npm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0", "--port", "3000"]
