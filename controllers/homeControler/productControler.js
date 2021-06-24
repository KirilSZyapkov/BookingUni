const router = require('express').Router();
const {isGuest, isUser, isOwner} = require('../../middleWares/guards');

const { homePage } = require('./homePageControler');
const { creatNew, openCreat } = require('./creatControler');
const { openHotel, deleteHotel } = require('./detailsControler');
const { openEdit, editHotel} = require('./editControler');
const bookRoom = require('./bookRoomControler');

router.get('/', homePage);
router.get('/create', isUser(), openCreat);
router.get('/details/:id', isUser(), openHotel);
router.get('/details/book/:id', bookRoom);
router.get('/details/delete/:id', isOwner(), deleteHotel);
router.get('/details/edit/:id',isOwner(), openEdit)

router.post('/create',isGuest(), creatNew);
router.post('/details/edit/:id',isGuest(), editHotel);

module.exports = router;