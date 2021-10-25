//Render the page

exports.main = (res, playlistFile, albumFile) => {
    res.render("index", {
        dataAlbum: albumFile,
        dataPlaylist: playlistFile
    })
}

exports.sub = (res, File) => {
    res.render("sub", {
        data: File
    })
}

exports.search = (res, songFile, albumFile) => {
    res.render('search', {
        dataSong: songFile,
        dataAlbum: albumFile
    })
}

exports.login = (res, data) => {
    res.render("login")
}
exports.up = (req, res, data) => {
    console.log(req.body);

}
