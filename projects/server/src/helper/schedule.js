const schedule = require('node-schedule');
const sequelize = require("sequelize");
const model = require("../models");

module.exports = {
    task: () => {
        const task = schedule.scheduleJob('*/1 * * * *', async () => {
            console.log('running a task every minute');
        });
        task.once('run', () => {
            console.log('task ran once, cancelling schedule');
            task.cancel();
        });
    }

}