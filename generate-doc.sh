var api = require('express-api-docs');
api.generate('./config/routes.js', 'public/api.html');