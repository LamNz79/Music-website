const mongoose = require('mongoose')

// Schema model
const song = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    author: String,
    link: String,
    image: String
})

const users = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    password: String
})

const playlist = new mongoose.Schema({
    name: String,
    songList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'songs'
        }
    ],
    image: String
})

const album = new mongoose.Schema({
    name: String,
    image: String,
    songList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'songs'
        }
    ]
})

module.exports.songs = mongoose.model('songs', song)
module.exports.users = mongoose.model('users', users)
module.exports.playlists = mongoose.model('playlists', playlist)
module.exports.albums = mongoose.model('albums', album)

