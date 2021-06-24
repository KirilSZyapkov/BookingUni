const { Schema, model } = require('mongoose');

const schema = new Schema({
    userName: { type: String, required: true },
    email: {type: String, required: true, match: /^[a-zA-Z0-9]*@[a-z]*\.[a-z]{2,3}$/},
    hashPassword: { type: String, required: true },
    bookdHotels: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }]
})

module.exports = model('User', schema);

// email: {type: String, required: true, match: /^[a-zA-Z0-9]*@[a-z]*\.[a-z]{2,3}$/},
//     password: {type: Number, reuired: true, min: [5, 'The password should be at least 5 characters long!'], match: [/^[a-zA-Z0-9]*$/, 'Password must consist only english letters and digits!']}
// })