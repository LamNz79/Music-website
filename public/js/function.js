
// Make function here
loggedIn = false

function Find() {
    let searchBarInput = $('#searchBarInput').val()
    // window.open(`/search/${capitalize(searchBarInput)}`)
    url_redirect(`http://localhost:3000/search/${capitalize(searchBarInput)}`)
}

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function getLogin() {
    var name = String($('#username').val())
    var password = String($("#password").val())

    $.post('getLogin', {
        name: name,
        password: password

    }, (data, status) => {

        if (data.length != 0) {
            if (name === data[0].name && password == data[0].pass) {

                localStorage.setItem("user", JSON.stringify(data))
                var objUser = JSON.parse(localStorage.getItem("user"))
                $("#icon-settings").css(style = `text-align: center; background-image: url(${objUser[0]}); background-size: cover;`
                )
                $("#loginuser").css(style = `display: none;`)
                $("#profile").css(style = `display: block;`)
                $("#logOut").css(style = `display: block;`)
                url_redirect('http://localhost:3000/')
                // window.location.href = 'http://localhost:3000/', true
            }
            else {
                alert('Sai tài khoản hoặc mật khẩu! Vui lòng thử lại')

            }
        }
        else {
            alert('Sai tài khoản hoặc mật khẩu! Vui lòng thử lại')
        }
    })
}

function logOutUser() {
    $.post('getLogin', {
    }, async (data, status) => {
        // alert(`${JSON.stringify(data)}`)
        await localStorage.removeItem("user", JSON.stringify(data))
        await url_redirect('http://localhost:3000/login')
    })
}


function userOptions() {
    document.getElementById("myDropdown").classList.toggle("show");
}

onclick = function (event) {
    if (!event.target.matches('.user-info')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function url_redirect(url) {
    var X = setTimeout(function () {
        window.location.replace(url);
        return true;
    }, 300);

    if (window.location = url) {
        clearTimeout(X);
        return true;
    } else {
        if (window.location.href = url) {
            clearTimeout(X);
            return true;
        } else {
            clearTimeout(X);
            window.location.replace(url);
            return true;
        }
    }
    return false;
};


function goBack() {
    window.history.back();
}
function goForward() {
    window.history.forward();
}



