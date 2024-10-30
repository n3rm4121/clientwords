# ClientWords Setup Guide

This guide will help you set up your own instance of ClientWords.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20.x)
- [MongoDB](https://www.mongodb.com/)
- You need to create OAuth credentials for Google which is need for auth.js (nextauth). Visit https://developers.google.com/identity/protocols/oauth2 to learn more and https://console.cloud.google.com/apis/dashboard to create a new project and OAuth credentials. You need to set the redirect URL to `http://localhost:3000/api/auth/callback/google` for development. You can also set the redirect URL to your own domain if you are deploying the app.

## Local Development

## Steps

1. Clone the repository:

```bash
  git clone https://github.com/n3rm4121/clientwords.git
  cd clientwords
```

2. Install dependencies:

```bash
   npm install
   Create a .env file in the root directory based on .env.sample:
   cp .env.sample .env
```

3. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view ClientWords in development mode.

## Docker Setup

#### Docker Compose

Refer to the [docker-compose.yml](docker-compose.yml) file to set up the environment using Docker.

#### Dockerfile

Refer to the [Dockerfile](Dockerfile) for building the Docker image.

#### Running with Docker

1. Build and start the services:

```bash
docker-compose up --build
```

2. Open http://localhost:3000 to view ClientWords in development mode.

## Building for Production

To build the application for production, use:

```bash
npm run build
npm start
```
