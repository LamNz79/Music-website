const User = require('./Model/users')

// Getting the data from Mongo
module.exports.getSong = (res, callback) => {
    User.songs.find((err, data) => {
        if (err) console.error
        console.log(data)
        callback(res, data)
    })
}

module.exports.getPlaylist = (res, getData) => {
    User.playlists.find({}, (err, data) => {
        if (err) console.error
        getData(res, data)
    })
}

module.exports.getPlaylistByName = (res, getData, name) => {
    // User.playlists.find({ name: name }, (err, data) => {
    //     if (err) console.error
    //     getData(res, data)
    // })
    User.playlists.aggregate(
        [
            {
                $match: {
                    name: name
                }
            },
            {
                $lookup: {
                    from: 'songs',
                    localField: 'songList',
                    foreignField: '_id',
                    as: 'songList'
                }
            }], (err, data) => {
                if (err) console.error
                getData(res, data)
            })
}

module.exports.getAlbum = (res, getData) => {
    User.albums.find({}, (err, data) => {
        if (err) console.error
        getData(res, data)
    })
}

module.exports.getAlbumByName = (res, getData, name) => {
    // User.albums.find({ name: name }, (err, data) => {
    //     if (err) console.error
    //     getData(res, data)
    // })

    User.albums.aggregate(
        [
            {
                $match: {
                    name: name
                }
            },
            {
                $lookup: {
                    from: 'songs',
                    localField: 'songList',
                    foreignField: '_id',
                    as: 'songList'
                }
            }], (err, data) => {
                if (err) console.error
                getData(res, data)
            })
}


module.exports.getSongbyAuthor = (res, getData, name) => {
    User.songs.find({ author: { $regex: name } }, (err, data) => {
        if (err) console.error
        getData(res, data)
    })
}

module.exports.getPlaylistAndAlbum = (res, getData) => {
    User.playlists.find({}, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            User.albums.find({}, function (err, collection2) {
                if (err) {
                    console.log(err)
                } else {
                    getData(res, collection, collection2)
                }
            });
        }
    });
}

module.exports.getSongByAuthorAndAlbum = (res, getData, name) => {
    User.songs.find({ author: { $regex: name } }, function (err, collection) {
        if (err) {
            console.log(err);
        } else {
            User.albums.find({}, function (err, collection2) {
                if (err) {
                    console.log(err)
                } else {
                    getData(res, collection, collection2)
                }
            });
        }
    });
}

module.exports.getNameOfAlbums = (res, getData) => {
    User.albums.find({}, { name: 1, _id: 0 }, function (err, data) {
        if (err) console.error
        else getData(res, data)

    })
}

module.exports.getData = (res, getData) => {
    User.users.find((err, data) => {
        if (err) console.error
        getData(res, data)
    })
}

module.exports.getLogData = (res, getData) => {
    User.users.find((err, data) => {
        if (err) console.error
        getData(res, data)
    })
}

module.exports.send1ParmFile = (res, file) => {
    res.send(file)
}

module.exports.redirectUsingParmFile = (res, file) => {
    res.redirect(`/${file}`)
}


module.exports.getUserAndPass = (res, name, password, getData) => {
    console.log('ok')
    User.users.find({ name: name, pass: password }, function (err, data) {
        console.log('okk')

        if (err) console.log(err)
        else getData(res, data)

    })
}
