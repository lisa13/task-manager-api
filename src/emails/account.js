//how to integrate and send sendgrig email

const sendGrid = require('@sendgrid/mail')
sendGrid.setApiKey(process.env.SENDGRID_API);

//example of setup
// sendGrid.send({
//     to: 'lisamanukyan@gmail.com',
//     from: 'rok.edu4free@gmail.com',
//     subject: 'this is my first email through sendgrid! yay!',
//     text: 'hope this got to you eventually  ^_^'
// })

const sendWelcome = (email, name) => {
    sendGrid.send({
        to: email,
        from: 'lisamanukyan@gmail.com',
        subject: 'thanks for joinign',
        text: `${name}, welcome to the app`
    })
}

const sendGoodbye = (email, name) => {
    sendGrid.send({
        to: email,
        from: 'lisamanukyan@gmail.com',
        subject: 'Sprry to see you go',
        text: `${name}, We're sorry you wont be with us anymore.Good luck!`
    });
}
module.exports = {
    sendWelcome,
    sendGoodbye
}