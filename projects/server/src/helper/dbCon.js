const sequelize = require("sequelize");


const con = new sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD || '',
    {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    },
);

module.exports = con;