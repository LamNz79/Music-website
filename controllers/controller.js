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

exports.personal = (res, songFile) => {
    res.render("caNhan",
        {
            dataSong: songFile
        })
}

exports.register = (res, data) => {
    res.render("register")
}

exports.admin = (res, albumData, songData, playlistData, userData) => {
    res.render('admin', {
        albumData: albumData,
        songData: songData,
        playlistData: playlistData,
        userData: userData
    })
}
//   a = li[i].getElementsByTagName("a")[0];
exports.dashboard = (res, albumData, songData, playlistData, userData) => {
    res.render('dashboard', {
        albumData: albumData,
        songData: songData,
        playlistData: playlistData,
        userData: userData
    })
}
//   a = li[i].getElementsByTagName("a")[0];
exports.account = (res, albumData, songData, playlistData, userData) => {
    res.render('account', {
        albumData: albumData,
        songData: songData,
        playlistData: playlistData,
        userData: userData
    })
}
//   a = li[i].getElementsByTagName("a")[0];
exports.p_controls = (res, albumData, songData, playlistData, userData) => {
    res.render('p_controls', {
        albumData: albumData,
        songData: songData,
        playlistData: playlistData,
        userData: userData
    })
}
//   a = li[i].getElementsByTagName("a")[0];
exports.a_controls = (res, albumData, songData, playlistData, userData) => {
    res.render('a_controls', {
        albumData: albumData,
        songData: songData,
        playlistData: playlistData,
        userData: userData
    })
}
exports.s_controls = (res, albumData, songData, playlistData, userData) => {
    res.render('s_controls', {
        albumData: albumData,
        songData: songData,
        playlistData: playlistData,
        userData: userData
    })
}
//   a = li[i].getElementsByTagName("a")[0];
