const sequelize = require("sequelize");

const con = new sequelize(
    'tempatku_database',
    'daniel',
    '1234567890',
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