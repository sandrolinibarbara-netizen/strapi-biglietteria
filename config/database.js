module.exports = ({ env }) => {
    const isRailway = Boolean(
        env('RAILWAY_ENVIRONMENT') ||
        env('RAILWAY_SERVICE_ID') ||
        env('RAILWAY_PROJECT_ID')
    );
    const databaseSsl = isRailway || env.bool('DATABASE_SSL', true);

    return ({
    connection: {
        client: 'postgres',
        connection: {
            connectionString: env('DATABASE_URL'),
            ssl: databaseSsl && {
              key: env('DATABASE_SSL_KEY', undefined),
              cert: env('DATABASE_SSL_CERT', undefined),
              ca: env('DATABASE_SSL_CA', undefined),
              capath: env('DATABASE_SSL_CAPATH', undefined),
              cipher: env('DATABASE_SSL_CIPHER', undefined),
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
            },
            schema: env('DATABASE_SCHEMA', 'public'),
          },
        debug: true,
        pool: { min: 0, max: 7 },
    }
    });
};
