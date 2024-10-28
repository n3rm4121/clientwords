const config = process.env.NODE_ENV === 'production'
    ? require('./config.prod').default
    : require('./config.local').default;

export default config;
