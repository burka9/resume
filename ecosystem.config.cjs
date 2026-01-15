module.exports = {
    apps: [
        {
            name: 'biruk-portfolio',
            script: './dist/server/entry.mjs',
            env: {
                NODE_ENV: 'production',
                PORT: 4321,
                HOST: '0.0.0.0',
                // DB_PATH will be set in the VPS environment or here if hardcoded
                // DB_PATH: '/home/user/portfolio-data/portfolio.db'
            },
        },
    ],
};
