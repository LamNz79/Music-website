const express = require("express");
const { data } = require("jquery");
const { personal } = require("../controllers/controller");
const router = express.Router();
controller = require("../controllers/controller")
dataCollector = require('../dataCollector')
const bodyParser = require('body-parser');
const { response } = require("express");

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
    dataCollector.getPlaylistById(res, controller.playlist_id, id)
})
router.get("/47dzEhPlfq/s_controls/:songId", (req, res) => {
    var id = req.params[`songId`]
    // var objUser = JSON.parse(localStorage.getItem("user"))
    dataCollector.adminFindSongById(res, id, controller.songs_id)
})
router.get("/47dzEhPlfq/add_user", (req, res) => {
    res.render('add_user')
})

router.get("/47dzEhPlfq/add_song", (req, res) => {
    res.render('add_song')
})
router.get("/47dzEhPlfq/add_album_playlist", (req, res) => {
    res.render('add_album_playlist')
})


// Post method  
router.post('/updatePlaylistUsingId', async (req, res) => {
    var id = await (req.body.thisId).trim()
    var name = await req.body.name
    var image = await req.body.image
    dataCollector.adminUpdatePlaylistOnClick(res, id, name, image)
})

router.post('/submitPlaylistAddSong', async (req, res) => {
    var songList = await req.body.songList
    var thisId = await req.body.thisId
    console.log(songList)
    console.log(`this id is ${thisId}`)

    dataCollector.insertSongIntoPlaylist(songList, thisId, res)
})
router.post('/submitAddSong', async (req, res) => {
    var songList = await req.body.songList
    var thisId = await req.body.thisId
    console.log(songList)
    console.log(`this id is ${thisId}`)

    dataCollector.insertSongIntoAlbum(songList, thisId, res)
})

router.post('/deleteSongFromPlaylistOnClick', async (req, res) => {
    var thisAlbumId = await req.body.thisAlbumId
    var thisID = await req.body.thisID
    console.log(thisAlbumId)
    console.log(thisID)
    dataCollector.deleteSongFromPlaylist(thisID, thisAlbumId, res)
})

router.post('/deleteSongFromListOnClick', async (req, res) => {
    var thisAlbumId = await req.body.thisAlbumId
    var thisID = await req.body.thisID
    console.log(thisAlbumId)
    console.log(thisID)
    dataCollector.deleteSongFromAlbum(thisID, thisAlbumId, res)
})

router.post('/changeUserShownName', async (req, res) => {
    var userName = await req.body.userName.trim()
    var userID = await req.body.currentUserID.trim()
    dataCollector.changeUserShownName(res, userName, userID)
})
router.post('/changeUserPassword', async (req, res) => {
    var userID = await req.body.currentUserID.trim()
    var password1 = await req.body.password1.trim()
    var newPassword1 = await req.body.newPassword1.trim()
    var newPassword2 = await req.body.newPassword2.trim()
    if (newPassword1 == newPassword2) {
        dataCollector.changeUserPassword(res, password1, newPassword1, userID)
    }
    else {
        res.send('mat khau khong trung')
    }
})
router.post('/createNewAlbum', async (req, res) => {
    var name = await req.body.name.trim()
    var image = await req.body.image.trim()

    dataCollector.addingAlbum(res, name, image)
})
router.post('/createNewPlaylist', async (req, res) => {
    var name = await req.body.name.trim()
    var image = await req.body.image.trim()

    dataCollector.addingPlaylist(res, name, image)
})

router.post('/createNewSong', async (req, res) => {
    var songName = await req.body.songName.trim()
    var songAuthor = await req.body.songAuthor.trim()
    var songLink = await req.body.songLink.trim()
    var songImage = await req.body.songImage.trim()
    dataCollector.addingSong(res, songName, songAuthor, songLink, songImage)
})
router.post('/createNewUser', async (req, res) => {
    var userName = await req.body.userName.trim()
    var userPass = await req.body.userPass.trim()
    var userImage = await req.body.userImage.trim()
    var userShowName = await req.body.userShowName.trim()

    if (userImage == '') {
        userImage = 'register-user.png'
    }
    dataCollector.addingUser(userName, userPass, userShowName, res, userImage)
})

router.post('/updateUsingId', async (req, res) => {
    var id = await (req.body.thisId).trim()
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
    var userName = await (req.body.username).trim()
    var password = await (req.body.password).trim()
    var tenHienThi = await (req.body.tenHienThi).trim()
    try {
        dataCollector.addingUser(userName, password, tenHienThi, res, 'register-user.png')
    } catch (error) {
        console.log(error)
    }
})

router.post('/getSongInfo', (req, res) => {
    dataCollector.getSong(res, controller.footer)
})


router.post('/changeUserAva', async (req, res) => {
    var avaFile = await req.body.avaFile
    var userID = await req.body.currentUserID.trim()
    console.log(avaFile)
    dataCollector.changeUserAva(res, avaFile, userID)
})

module.exports = router

