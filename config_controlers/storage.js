const Hotel = require('../model/Hotel');
const User = require('../model/User');

async function init() {
    return (req, res, next) => {
        req.storage = {
            getAllHotels,
            getHotelById,
            creatHotel,
            updateHotelById,
            bookRoom,
            removeHotelById
        }
        next();
    }
};

async function getAllHotels() {
    return Hotel.find({}).lean();
};

async function getHotelById(id) {
    return Hotel.findById(id).lean();
};

async function creatHotel(body, owner) {
    const name = body.hotel;
    const city = body.city;
    const freeRooms = body.freeRooms;
    const imageUrl = body.imgUrl;

    if (name === '' || city === '' || freeRooms === '' || imageUrl === '') {
        throw new Error('All fields are required!');
    };

    const hotel = new Hotel({ owner, name, city, imageUrl, freeRooms });
    await hotel.save();

};

async function updateHotelById(hotelId, body, owner) {

    const name = body.hotel;
    const city = body.city;
    const freeRooms = body.freeRooms;
    const imageUrl = body.imgUrl;

    if (name === '' || city === '' || freeRooms === '' || imageUrl === '') {
        throw new Error('All fields are required!');
    };

    const item = await Hotel.findById(hotelId);

    await item.updateOne({ owner, name, city, freeRooms, imageUrl });

};

async function bookRoom(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);
    const user = await User.findById(userId);

    hotel.clients.push(user);
    user.bookdHotels.push(hotel);

    await hotel.save();
    await user.save();
};

async function removeHotelById(hotelId) {
    await Hotel.findByIdAndDelete(hotelId);
};

module.exports = init;