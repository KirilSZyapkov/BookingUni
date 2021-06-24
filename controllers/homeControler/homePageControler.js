module.exports = {
    async homePage(req, res) {
        const hotels = await req.storage.getAllHotels();
        if(req.user){
            hotels.name = req.user.userName;
        }
        const isLog = req.user !== undefined
        res.render('home_pages/home', {
            title: 'Home page',
            hotels,
            isLog
        })
    }
}