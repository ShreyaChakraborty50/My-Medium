const dbConfig = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'node-sequelize_api_db',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

const generalConfig = {
    PORT: 5050
}

export default { dbConfig, generalConfig }