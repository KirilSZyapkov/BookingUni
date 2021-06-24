const er = require('../../config/errors');

module.exports = {
    async openEdit(req, res) {
        const id = req.params.id;
        const hotel = await req.storage.getHotelById(id);
        const isLog = req.user !== undefined
        res.render('booking_pages/edit', {
            title: hotel.name,
            hotel,
            isLog,
            hotels: {name: req.user.userName},
        })
    },
    async editHotel(req, res) {
        const id = req.params.id;
        let creatorId = req.user._id;
        try {
            await req.storage.updateHotelById(id, req.body, creatorId)
            res.redirect('/hotels/details/' + id);
        } catch (err) {
            const errorList = er(err);
            const name = req.body.hotel;
            const city = req.body.city;
            const freeRooms = req.body.freeRooms;
            const imageUrl = req.body.imgUrl;
            const isLog = req.user !== undefined
            res.render('booking_pages/edit', {
                title: req.body.name,
                hotel:{
                    name,
                    city,
                    freeRooms,
                    imageUrl
                },
                errors: errorList.split('\n'),
                isLog,
                hotels: {name: req.user.userName},
            })
        }
    }
}
