const nodemailer = require('nodemailer'); 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'noreply.tempatku@gmail.com', 
        pass:'vjuuvolabsuuxqex'
    }
});

module.exports = transporter;
