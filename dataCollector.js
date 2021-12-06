const User = require('./Model/users')
const mongoose = require('mongoose');
// Getting the data from Mongo

module.exports.getPlaylist = (res, getData) => {
    User.playlists.find({}, (err, data) => {
        if (err) console.error
        getData(res, data)
    })
}

module.exports.getPlaylistByName = (res, getData, name) => {
    User.playlists.aggregate(
        [
            {
                $match: { name: name }
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
module.exports.getAlbumById = (res, getData, id) => {

    User.albums.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(`${id}`)
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
                else {

                    User.songs.find({}, (err, data2) => {
                        if (err) console.log(err)
                        getData(res, data, data2)
                    })
                }
            })
}

module.exports.getPlaylistById = (res, getData, id) => {

    User.playlists.aggregate(
        [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(`${id}`)
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
                else {
                    User.songs.find({}, (err, data2) => {
                        if (err) console.log(err)
                        getData(res, data, data2)
                    })
                }
            })
}
module.exports.getPlaylistAndAlbum = (res, getData) => {
    User.playlists.find({}, function (err, collection) {
        if (err) console.log(err);

        else {
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

module.exports.getSongbyAuthor = (res, getData, name) => {
    User.songs.find({ author: { $regex: name } }, (err, data) => {
        if (err) console.error
        getData(res, data)
    })
}


module.exports.getSongByAuthorAndAlbum = (res, getData, name) => {
    User.songs.find({ author: { $regex: name } }, function (err, collection) {
        if (err) console.log(err);
        else {
            User.albums.find({}, function (err, collection2) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(collection2)
                    getData(res, collection, collection2)
                }
            });
        }
    });
}

module.exports.getSongAndAlbum = (res, getData) => {
    User.songs.find({}, function (err, collection) {
        if (err) console.log(err);
        else {
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
    User.users.find({ name: name, pass: password }, function (err, data) {

        if (err) console.log(err)
        else getData(res, data)

    })
}


module.exports.getUserSongCollection = (res, name, getData) => {
    User.users.aggregate([
        {/**
         * query: The query in MQL.
         */
            $match: {
                name: name
            }
        },
        {/**
         * from: The target collection.
         * localField: The local join field.
         * foreignField: The target join field.
         * as: The name for the results.
         * pipeline: The pipeline to run on the joined collection.
         * let: Optional variables to use in the pipeline field stages.
         */
            $lookup: {
                from: 'songs',
                localField: 'songCollection',
                foreignField: '_id',
                as: 'songCollection'
            }
        }
    ], (err, data) => {
        if (err) console.log(err)
        else getData(res, data)
    })
}
function makeNewUser(username, password, shownName, image) {
    let newvalue = new User.users({
        // _id: getNextSequence(1),
        name: username,
        pass: password,
        showName: shownName,
        songCollection: [],
        images: `images/${image}`,
    });
    newvalue.save();

}

module.exports.addingUser = (username, password, shownName, res, image) => {
    try {

        if (username !== "" && password !== "" && shownName !== "") {
            User.users.find(
                { name: username }, (err, data) => {
                    if (err) console.err
                    console.log(data)
                    if (data.length == 0) {
                        makeNewUser(username, password, shownName, image)
                        this.send1ParmFile(res, 'thanh cong')
                    }
                    else {
                        this.send1ParmFile(res, 'da co tai khoan')

                    }
                }
            )
        }
        else {
            this.send1ParmFile(res, 'tai khoan khong hop le')

        }
    }

    catch (error) {
        console.log(error)
    }
}

module.exports.insertSongIntoPlaylist = (name, albumName, res) => {
    User.songs.find({
        name: name,
    }, (err, data) => {
        console.log(mongoose.Types.ObjectId(`${data[0]._id}`))
        if (err) console.log(err)
        else if (data.length !== 0) {

            User.playlists.updateOne(
                { _id: albumName },
                {
                    $push:
                    {
                        songList: mongoose.Types.ObjectId(`${data[0]._id}`)
                    }
                }, (err, data2) => {
                    if (err) console.log(err)
                    else {
                        console.log(JSON.stringify(data2))
                        this.send1ParmFile(res, JSON.stringify(data2))
                    }
                }
            )
        }
        else {
            this.send1ParmFile(res, 'khong co bai hat do trong du lieu')
        }
    })
}

module.exports.deleteSongFromPlaylist = (name, albumName, res) => {
    User.songs.find({
        _id: name,
    }, (err, data) => {
        if (err) console.log(err)
        else if (data.length !== 0) {
            User.playlists.updateOne(
                { _id: albumName },
                {
                    $pull:
                    {
                        songList: mongoose.Types.ObjectId(`${data[0]._id}`)
                    }
                }, (err, data2) => {
                    if (err) console.log(err)
                    else {
                        console.log(JSON.stringify(data2))
                        this.send1ParmFile(res, JSON.stringify(data2))
                    }
                }
            )
        }
        else {
            this.send1ParmFile(res, 'khong co bai hat do trong du lieu')
        }
    })
}
module.exports.insertSongIntoAlbum = (name, albumName, res) => {
    User.songs.find({
        name: name,
    }, (err, data) => {
        console.log(mongoose.Types.ObjectId(`${data[0]._id}`))
        if (err) console.log(err)
        else if (data.length !== 0) {

            User.albums.updateOne(
                { _id: albumName },
                {
                    $push:
                    {
                        songList: mongoose.Types.ObjectId(`${data[0]._id}`)
                    }
                }, (err, data2) => {
                    if (err) console.log(err)
                    else {
                        console.log(JSON.stringify(data2))
                        this.send1ParmFile(res, JSON.stringify(data2))
                    }
                }
            )
        }
        else {
            this.send1ParmFile(res, 'khong co bai hat do trong du lieu')
        }
    })
}


module.exports.deleteSongFromAlbum = (name, albumName, res) => {
    User.songs.find({
        _id: name,
    }, (err, data) => {
        if (err) console.log(err)
        else if (data.length !== 0) {
            User.albums.updateOne(
                { _id: albumName },
                {
                    $pull:
                    {
                        songList: mongoose.Types.ObjectId(`${data[0]._id}`)
                    }
                }, (err, data2) => {
                    if (err) console.log(err)
                    else {
                        console.log(JSON.stringify(data2))
                        this.send1ParmFile(res, JSON.stringify(data2))
                    }
                }
            )
        }
        else {
            this.send1ParmFile(res, 'khong co bai hat do trong du lieu')
        }
    })
}
// function for adding songs to database
module.exports.addSong = (name, author, path, image, res) => {
    try {
        let newSong = new User.songs({
            name: name,
            author: author,
            link: `/music/${path}`,
            image: `/images/${image}`
        });
        newSong.save();
        this.send1ParmFile(res, 'thanh cong')
    } catch (error) {
        console.log(error)
    }
}

// Function for adding album to database
module.exports.addAlbum = (name, image, res) => {
    try {
        let newAlbum = new User.albums({
            // _id: getNextSequence(1),
            name: name,
            image: image,
            songList: []
        });
        newAlbum.save();
        this.send1ParmFile(res, 'thanh cong')
    } catch (error) {
        console.log(error)
    }
}

// Function for adding playlist to database
module.exports.addPlaylist = (name, image, res) => {
    try {
        let newPlaylist = new User.playlists({
            // _id: getNextSequence(1),
            name: name,
            image: image,
            songList: []
        });
        newPlaylist.save();
        this.send1ParmFile(res, 'thanh cong')
    } catch (error) {
        console.log(error)
    }
}

module.exports.addSongToUserList = (name, songId, res) => {
    User.users.updateOne(
        { name: name },
        {
            $push:
                { songCollection: mongoose.Types.ObjectId(`${songId}`) }
        }, (err, data) => {
            if (err) console.log(err)
            this.send1ParmFile(res, data)
        }
    )
}

module.exports.removeSongToUserList = (name, songId, res) => {
    User.users.updateOne(
        { name: name },
        {
            $pull:
                { songCollection: mongoose.Types.ObjectId(`${songId}`) }
        }, (err, data) => {
            if (err) console.log(err)
            this.send1ParmFile(res, data)
        }
    )
}
module.exports.adminLoadPage = (res, callBack) => {

    User.albums.find({},
        (err, data) => {
            if (err) console.log(err)
            else {
                User.songs.find({}, (err, data2) => {
                    if (err) console.log(err)
                    else {
                        User.playlists.find({}, (err, data3) => {
                            if (err) console.log(err)
                            else {
                                User.users.find({}, (err, data4) => {
                                    if (err) console.log(err)
                                    callBack(res, data, data2, data3, data4)
                                })
                            }
                        })

                    }
                })

            }
        }
    )
}


module.exports.adminDelSongOnClick = (res, id) => {
    User.songs.deleteOne({ _id: mongoose.Types.ObjectId(`${id}`) },
        (err, data) => {
            if (err) console.log(err)
            console.log(mongoose.Types.ObjectId(`${id}`))
            this.send1ParmFile(res, data)

        })

}
module.exports.adminDelUserOnClick = (res, id) => {
    User.users.deleteOne({ _id: mongoose.Types.ObjectId(`${id}`) },
        (err, data) => {
            if (err) console.log(err)
            console.log(mongoose.Types.ObjectId(`${id}`))
            this.send1ParmFile(res, data)

        })

}
module.exports.adminDelAlbumOnClick = (res, id) => {
    User.albums.deleteOne({ _id: mongoose.Types.ObjectId(`${id}`) },
        (err, data) => {
            if (err) console.log(err)
            console.log(mongoose.Types.ObjectId(`${id}`))
            this.send1ParmFile(res, data)

        })

}
module.exports.adminDelPlaylistOnClick = (res, id) => {
    User.playlists.deleteOne({ _id: mongoose.Types.ObjectId(`${id}`) },
        (err, data) => {
            if (err) console.log(err)
            console.log(mongoose.Types.ObjectId(`${id}`))
            this.send1ParmFile(res, data)
        })

}

module.exports.adminUpdateSongOnClick = (res, id, name, author, link, image) => {
    User.songs.updateOne(
        { _id: mongoose.Types.ObjectId(`${id}`) },
        {
            $set: {
                name: name,
                author: author,
                link: `/music/${link}`,
                image: `/images/${image}`
            }
        }, (err, data) => {
            if (err) console.log(err)
            console.log(data)
            this.send1ParmFile(res, data)
        }
    )
}

module.exports.adminUpdateUserOnClick = (res, id, name, showName, image) => {
    User.users.updateOne(
        { _id: mongoose.Types.ObjectId(`${id}`) },
        {
            $set: {
                name: name,
                showName: showName,
                images: `images/${image}`
            }
        }, (err, data) => {
            if (err) console.log(err)
            console.log(data)
            this.send1ParmFile(res, data)
        }
    )
}



module.exports.adminUpdateAlbumOnClick = (res, id, name, image) => {
    User.albums.update(
        { _id: mongoose.Types.ObjectId(`${id}`) },
        {
            $set: {
                name: name,
                image: `images/${image}`
            }
        },
        { upsert: true }, (err, data) => {
            if (err) console.log(err)
            else {
                // User.playlists.updateOne(
                //     { _id: mongoose.Types.ObjectId(`${id}`) },
                //     {
                //         $set: {
                //             name: name,
                //             images: `images/${image}`
                //         }
                //     }, (err, data2) => {
                //         if (err) console.log(err)
                //         // console.log(data2)
                this.send1ParmFile(res, data)
                //     }
                // )
            }
        }
    )
}

module.exports.adminUpdatePlaylistOnClick = (res, id, name, image) => {
    User.playlists.update(
        { _id: mongoose.Types.ObjectId(`${id}`) },
        {
            $set: {
                name: name,
                image: `images/${image}`
            }
        },
        { upsert: true }, (err, data) => {
            if (err) console.log(err)
            else {

                this.send1ParmFile(res, data)

            }
        }
    )
}


module.exports.adminFindUsrById = (res, id, callback) => {
    User.users.find({
        _id: id
    }, (err, data) => {
        if (err) console.log(err)
        console.log(data)
        callback(res, data)

    })
}
module.exports.adminFindSongById = (res, id, callback) => {
    User.songs.find({
        _id: id
    }, (err, data) => {
        if (err) console.log(err)
        console.log(data)
        callback(res, data)

    })
}


function makeNewSong(name, author, path, image, res) {
    let newSong = new User.songs({
        name: name,
        author: author,
        link: `/music/${path}`,
        image: `/images/${image}`
    });
    newSong.save();

}
function makeNewAlbum(name, image, res) {
    let newList = new User.albums({
        name: name,
        image: `images/${image}`,
        songList: []
    });
    newList.save();

}
function makeNewPlaylist(name, image, res) {
    let newList = new User.playlists({
        name: name,
        image: `images/${image}`,
        songList: []
    });
    newList.save();

}
module.exports.addingPlaylist = (res, name, image) => {

    if (name !== "" && image !== "") {
        makeNewPlaylist(name, image, res)
        this.send1ParmFile(res, 'thanh cong')
    }
    else {
        this.send1ParmFile(res, 'tao khong thanh cong')

    }
}
module.exports.addingAlbum = (res, name, image) => {

    if (name !== "" && image !== "") {
        makeNewAlbum(name, image, res)
        this.send1ParmFile(res, 'thanh cong')
    }
    else {
        this.send1ParmFile(res, 'tao khong thanh cong')

    }
}

module.exports.addingSong = (res, name, author, link, image) => {

    if (name !== "" && author !== "" && link !== "" && image !== "") {
        makeNewSong(name, author, link, image, res)
        this.send1ParmFile(res, 'thanh cong')
    }
    else {
        this.send1ParmFile(res, 'tao khong thanh cong')

    }
}

module.exports.changeUsrImage = (res, path, currUsr) => {
    User.users.updateOne(
        { name: currUsr },
        {
            $set: {
                images: `/${path}`
            }
        }, (err, data) => {
            if (err) console.log(err)
            this.send1ParmFile(data)
        }
    )
}

module.exports.makeNewComment = (res, name, img, content) => {
    let newComment = new User.comments({
        name: name,
        image: img,
        content: content
    });
    newComment.save();
    return newComment
}

module.exports.addCommentToSong = (res, songName, callback, name, img, content) => {
    var newComment = callback(res, name, img, content)
    User.songs.updateOne(
        { name: songName },
        {
            $push:
                { comments: mongoose.Types.ObjectId(`${newComment._id}`) }
        }, (err, data) => {
            if (err) console.log(err)
            this.send1ParmFile(res, data)
        })
}


module.exports.changeUserShownName = (res, showName, id) => {
    User.users.updateOne(
        { _id: mongoose.Types.ObjectId(`${id}`) },
        {
            $set: {
                showName: showName,
            }
        }, (err, data) => {
            if (err) console.log(err)
            else {
                User.users.find({
                    _id: mongoose.Types.ObjectId(`${id}`)
                }, (err, data2) => {
                    console.log(data)
                    this.send1ParmFile(res, data2)
                })
            }
        }
    )
}
module.exports.changeUserAva = (res, image, id) => {
    User.users.updateOne(
        { _id: mongoose.Types.ObjectId(`${id}`) },
        {
            $set: {
                images: `images/${image}`,
            }
        }, (err, data) => {
            if (err) console.log(err)
            else {
                User.users.find({
                    _id: mongoose.Types.ObjectId(`${id}`)
                }, (err, data2) => {
                    console.log(data)
                    this.send1ParmFile(res, 'thanh cong')
                })
            }

        }
    )
}
module.exports.changeUserPassword = (res, pass, newPass, id) => {
    User.users.find(
        {
            $and: [
                { _id: mongoose.Types.ObjectId(`${id}`) },
                { pass: pass }
            ]
        }, (err, data) => {
            if (err) console.log(err)
            else {
                if (data.length != 0) {
                    User.users.updateOne(
                        { _id: mongoose.Types.ObjectId(`${id}`) },
                        {
                            $set: {
                                pass: newPass,
                            }
                        }, (err, data2) => {
                            console.log(data)
                            this.send1ParmFile(res, 'thay doi thanh cong')

                        })
                }
                else this.send1ParmFile(res, 'mat khau hien tai khong dung')

            }

        }
    )
}