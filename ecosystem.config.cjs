const { join } = require('path');

module.exports = {
    apps: [
        {
            name: 'biruk-portfolio',
            script: join(__dirname, 'dist/server/entry.mjs'),
            cwd: __dirname,
            env_file: join(__dirname, '.env'),
            env: {
                NODE_ENV: 'production',
                PORT: 4321,
                HOST: '0.0.0.0',
            },
        },
    ],
};
