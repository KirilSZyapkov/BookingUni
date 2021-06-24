const er = require('../../config/errors');

module.exports = {
    async openHotel(req, res) {
        const id = req.params.id;
        const hotel = await req.storage.getHotelById(id);
        if (req.user) {
            hotel.isUser = Boolean(req.user);
            hotel.isOwner = hotel.owner === req.user._id;
            hotel.isBooked = hotel.clients.find(c => c.toString() === req.user._id) || [].toString() === req.user._id;
        }

        const isLog = req.user !== undefined
        res.render('booking_pages/details', {
            title: hotel.name,
            hotel,
            isLog,
            hotels: { name: req.user.userName },
        });
    },

    async deleteHotel(req, res) {
         let hotel;
        try {
            const hotelId = req.params.id
            hotel = await req.storage.getHotelById(hotelId);
            await req.storage.removeHotelById(hotelId);
            res.redirect('/hotels');
        } catch (err) {
            const errorList = er(err);
            const isLog = req.user !== undefined
            res.render('booking_pages/details', {
                title: hotel.name,
                hotel,
                errors: errorList.split('\n'),
                isLog,
                hotels: {name: req.user.userName},
            })
        }
    }
}
