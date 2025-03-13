module.exports = {
    apps: [
      {
        name: "index",
        script: "users-srv/index.js",
        env: {
          NODE_ENV: "production",
          GRPC_PORT: 1235,
          MONGODB_URI: '',
          KAFKA_URI: '',
          KAFKA_USERNAME: '',
          KAFKA_PASSWORD: '',
          NEO4J_PASSWORD: '',
          NEO4J_USERNAME: '',
          NEO4J_URI: '',
        },
      },
      {
        name: "index",
        script: "posts-srv/index.js",
        env: {
          NODE_ENV: "production",
          GRPC_PORT: 1236,
          MONGODB_URI: '',
          KAFKA_URI: '',
          KAFKA_USERNAME: '',
          KAFKA_PASSWORD: '',
        },
      },
      {
        name: "index",
        script: "api-gateway/index.js",
        env: {
          NODE_ENV: "production",
          PORT: 1237,
          MONGODB_URI: '',
          KAFKA_URI: '',
          KAFKA_USERNAME: '',
          KAFKA_PASSWORD: '',
          USERS_SERVICE_URI: '127.0.0.1:1235',
          POSTS_SERVICE_URI: '127.0.0.1:1236',
          LIKES_SERVICE_URI: '127.0.0.1:1236',
          COMMENTS_SERVICE_URI: '127.0.0.1:1236',
        },
      },

    ],
  };
  