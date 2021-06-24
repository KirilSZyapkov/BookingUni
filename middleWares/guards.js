const Hotel = require('../model/Hotel');

function isGuest() {
    return (req, res, next) => {
        if (req.user === undefined) {
            res.redirect('/auth/login');
        } else {
            next();
        }
    };
};

function isUser() {
    return (req, res, next) => {
        if (req.user !== undefined) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
};

 function isOwner() {
    return async (req, res, next) => {
        if (req.user !== undefined) {
            
            const hotel = await Hotel.findById(req.params.id).lean();
            if (hotel.owner === req.user._id) {

                next();
            } else {
                res.redirect('/hotels');
            }

        } else {
            res.redirect('/hotels');
        }
    };
};

module.exports = {
    isGuest,
    isUser,
    isOwner
}