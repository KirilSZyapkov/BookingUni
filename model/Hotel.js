const { Schema, model } = require('mongoose');

const schema = new Schema({
    owner: {type: String},
    name: { type: String, required: true, minLength: [4, 'Name must be at least 4 characters!'] },
    city: { type: String, required: true, minLength: [3, 'City must be at least 3 characters!'] },
    imageUrl: { type: String, required: true, match: /^https?:\/\// },
    freeRooms: { type: Number, requred: true, min: [1, 'Rooms can`t be 0 or negativ number!'], max: [100, 'Exceed limit!'] },
    clients: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = model('Hotel', schema);