module.exports = ({ env }) => {
    const isRailway = Boolean(
        env('RAILWAY_ENVIRONMENT') ||
        env('RAILWAY_SERVICE_ID') ||
        env('RAILWAY_PROJECT_ID')
    );
    const databaseSsl = isRailway || env.bool('DATABASE_SSL', true);

    return {
        connection: {
            client: 'postgres',
            connection: {
                connectionString: env('DATABASE_URL'),
                ssl: databaseSsl && {
                    rejectUnauthorized: false,
                },
                schema: env('DATABASE_SCHEMA', 'public'),
            },
            debug: true,
            pool: { min: 0, max: 7 },
        }
    };
};
