const express = require("express");
const { data } = require("jquery");
const { personal } = require("../controllers/controller");
const router = express.Router();
controller = require("../controllers/controller")
dataCollector = require('../dataCollector')

// The center which get and send data
router.get('/login', (req, res) => {
    dataCollector.getData(res, controller.login)
})

router.get('/playlist/:PlayListName', (req, res) => {
    let playListName = req.params[`PlayListName`]
    console.log(playListName)
    dataCollector.getPlaylistByName(res, controller.sub, playListName)
})

router.get("/", (req, res) => {
    // dataCollector.getPlaylist(res, controller.main)
    dataCollector.getPlaylistAndAlbum(res, controller.main)

})

router.get("/Album/:AlbumName", (req, res) => {
    albumName = req.params[`AlbumName`]
    console.log(albumName)
    dataCollector.getAlbumByName(res, controller.sub, albumName)
})

router.get('/search/:songName', (req, res) => {
    let songName = req.params[`songName`]
    dataCollector.getSongByAuthorAndAlbum(res, controller.search, songName)

})

router.get("/personal/:userName", (req, res) => {
    var userName = req.params[`userName`]
    // var objUser = JSON.parse(localStorage.getItem("user"))
    dataCollector.getUserSongCollection(res, userName, controller.personal)
})

router.get("/register", (req, res) => {

    controller.register(res, null)
})

router.get('/47dzEhPlfq', (req, res) => {
    dataCollector.getAlbumAndAlbumSongAndPlaylistAndPlaylistSong(res, controller.admin)
})

// Post method
router.post('/getLogin', async (req, res) => {
    var userName = await req.body.name
    var password = await req.body.password
    console.log(userName, password)
    dataCollector.getUserAndPass(res, userName, password, dataCollector.send1ParmFile)
})


router.post('/addingUser', async (req, res) => {
    var userName = await req.body.username
    var password = await req.body.password
    var tenHienThi = await req.body.tenHienThi
    try {
        dataCollector.addingUser(userName, password, tenHienThi, res)

    } catch (error) {
        console.log(error)
    }
})

router.post('/getSongInfo', (req, res) => {
    dataCollector.getSong(res, controller.footer)
})

router.post('/deleteSong', async (req, res) => {
    var songName = await req.body.songName
    var albumName = await req.body.album
    dataCollector.deleteSongFromAlbum(songName, albumName, res)

})

router.post('/insertSong', async (req, res) => {
    var songName = await req.body.songName
    var albumName = await req.body.album
    dataCollector.insertSongIntoAlbum(songName, albumName, res)

})

router.post('/updateSong', (req, res) => {
    res.send('ok123')
})

module.exports = router

