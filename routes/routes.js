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

router.get("/47dzEhPlfq/account/:accountId", (req, res) => {
    var id = req.params[`accountId`]
    // var objUser = JSON.parse(localStorage.getItem("user"))
    dataCollector.adminFindUsrById(res, id, controller.account_id)
})
router.get("/47dzEhPlfq/a_controls/:album", (req, res) => {
    var id = req.params[`album`]
    // var objUser = JSON.parse(localStorage.getItem("user"))
    dataCollector.getAlbumById(res, controller.playlist_Album_id, id)
})
router.get("/47dzEhPlfq/p_controls/:playlist", (req, res) => {
    var id = req.params[`playlist`]
    // var objUser = JSON.parse(localStorage.getItem("user"))
    dataCollector.getPlaylistById(res, controller.playlist_Album_id, id)
})
router.get("/47dzEhPlfq/s_controls/:songId", (req, res) => {
    var id = req.params[`songId`]
    // var objUser = JSON.parse(localStorage.getItem("user"))
    dataCollector.adminFindSongById(res, id, controller.songs_id)
})



// Post method
router.post('/updateUsingId', async (req, res) => {
    var id = await (req.body.thisId).trim()
    await console.log(id)

    var name = await req.body.name
    var image = await req.body.image
    dataCollector.adminUpdateAlbumOnClick(res, id, name, image)
})
router.post('/updateSongUsingId', async (req, res) => {
    var id = await (req.body.songId).trim()
    var name = await (req.body.songName).trim()
    var author = await (req.body.songAuthor).trim()
    var songLink = await (req.body.songLink).trim()
    var songImage = await (req.body.songImage).trim()

    dataCollector.adminUpdateSongOnClick(res, id, name, author, songLink, songImage)
})


router.post('/updateAccount', async (req, res) => {
    var userId = await req.body.userId.trim()
    console.log(userId)
    var userName = await req.body.userName
    var userImage = await req.body.userImage
    var userShownName = await req.body.userShownName
    dataCollector.adminUpdateUserOnClick(res, userId, userName, userShownName, userImage)
})

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

