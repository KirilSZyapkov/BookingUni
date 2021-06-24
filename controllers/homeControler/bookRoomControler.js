module.exports = async (req, res) => {
    const hotelId = req.params.id;
    const userId = req.user._id;

    await req.storage.bookRoom(hotelId, userId);

    const hotel = await req.storage.getHotelById(hotelId);
    if(req.user){
        hotel.isUser = Boolean(req.user);
        hotel.isOwner = hotel.owner === req.user._id;
        hotel.isBooked = hotel.clients.find(c=> c.toString() === req.user._id).toString() ===  req.user._id;
    }
    

    const isLog = req.user !== undefined
    res.render('booking_pages/details', {
        title: hotel.name,
        hotel,
        isLog,
        hotels: { name: req.user.userName },
    });
}