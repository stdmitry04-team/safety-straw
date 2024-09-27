const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api', // Your API endpoint
        createProxyMiddleware({
            target: process.env.REACT_APP_BACKEND_URL, // Use the backend URL from .env
            changeOrigin: true,
        })
    );
};
