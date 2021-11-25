const express = require("express");
const { data } = require("jquery");
const { personal } = require("../controllers/controller");
const router = express.Router();
controller = require("../controllers/controller")
dataCollector = require('../dataCollector')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
// The center which get and send data
router.get('/login', (req, res) => {
    dataCollector.getData(res, controller.login)
})

router.get('/playlist/:PlayListName', (req, res) => {
    var playListName = req.params[`PlayListName`]
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
    var songName = req.params[`songName`]
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

router.get("/nameChange", (req, res) => {
    controller.nameChange(res, null)
})
router.get("/passwordChange", (req, res) => {
    controller.passwordChange(res, null)
})

router.route('/47dzEhPlfq')
    .get((req, res) => {
        dataCollector.adminLoadPage(res, controller.admin)
    })

router.route('/47dzEhPlfq/dashboard')
    .get((req, res) => {
        dataCollector.adminLoadPage(res, controller.dashboard)
    })

router.route('/47dzEhPlfq/account')
    .get((req, res) => {
        dataCollector.adminLoadPage(res, controller.account)
    })

router.route('/47dzEhPlfq/s_controls')
    .get((req, res) => {
        dataCollector.adminLoadPage(res, controller.s_controls)
    })

router.route('/47dzEhPlfq/a_controls')
    .get((req, res) => {
        dataCollector.adminLoadPage(res, controller.a_controls)
    })

router.route('/47dzEhPlfq/p_controls')
    .get((req, res) => {
        dataCollector.adminLoadPage(res, controller.p_controls)
    })



// Post method
router.post('/deleteSongOnClick', async (req, res) => {
    var thisID = req.body.thisID
    console.log(thisID)
    dataCollector.adminDelSongOnClick(res, thisID)
})
router.post('/deleteUserOnClick', async (req, res) => {
    var thisID = req.body.thisID
    console.log(thisID)
    dataCollector.adminDelUserOnClick(res, thisID)
})
router.post('/deleteAlbumOnClick', async (req, res) => {
    var thisID = req.body.thisID
    console.log(thisID)
    dataCollector.adminDelAlbumOnClick(res, thisID)
})
router.post('/deletePlaylistOnClick', async (req, res) => {
    var thisID = req.body.thisID
    console.log(thisID)
    dataCollector.adminDelPlaylistOnClick(res, thisID)
})

router.post('/updateOnClick', async (req, res) => {
    var thisID = req.body.thisID
    console.log(thisID)
    res.send(thisID)
})

router.post('/updateSongOnClick', async (req, res) => {
    var thisID = req.body.thisID
    console.log(thisID)
    res.send(thisID)
})

router.post('/addFavMusic', async (req, res) => {
    var songId = await req.body.songId
    var name = await req.body.name
    console.log(name)
    dataCollector.addSongToUserList(name, songId, res)
})

router.post('/delFavMusic', async (req, res) => {
    var songId = await req.body.songId
    var name = await req.body.name
    console.log(name)
    dataCollector.removeSongToUserList(name, songId, res)
})

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


router.post('/changeUserAva', (req, res) => {
    var avaFile = req.body.avaFile
    console.log(avaFile)
    res.send(avaFile.name)
})

module.exports = router

