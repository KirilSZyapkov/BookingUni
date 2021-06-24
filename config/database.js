const mongoose  = require("mongoose")

module.exports = (app) => {
    return new Promise((resolve, reject) => {

        mongoose.connect('mongodb://localhost:27017/hotel', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const db = mongoose.connection;
        db.on('error', (err) => {
            console.log('Connection error');
            reject();
        });
        db.on('open', () => {
            console.log('Connected to DB');
            resolve();
        })

    });

}