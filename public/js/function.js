
// Make function here
loggedIn = false


function Find() {
    var searchBarInput = $('#searchBarInput').val()
    url_redirect(`http://localhost:3000/search/${capitalize(searchBarInput)}`)
}

function capitalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
}

function getLogin() {
    var name = String($('#username').val())
    var password = String($("#password").val())
    $.post('getLogin', {
        name: name,
        password: password

    }, (data, status) => {

        if (isAdmin(name, password)) url_redirect('http://localhost:3000/47dzEhPlfq/dashboard')
        else if (data.length != 0) {
            if (name === data[0].name && password == data[0].pass) userLogin(data)
            else alert('Sai tài khoản hoặc mật khẩu! Vui lòng thử lại')
        }
        else alert('Sai tài khoản hoặc mật khẩu! Vui lòng thử lại')
    })
}

function userLogin(data) {
    localStorage.setItem("user", JSON.stringify(data))
    var objUser = JSON.parse(localStorage.getItem("user"))
    $("#icon-settings").css(style = `text-align: center; background-image: url(${objUser[0]}); background-size: cover;`
    )
    $("#loginuser").css(style = `display: none;`)
    $("#profile").css(style = `display: block;`)
    $("#logOut").css(style = `display: block;`)
    url_redirect('http://localhost:3000/')
}

function logOutUser() {
    $.post('getLogin', {
    }, async (data, status) => {
        // alert(`${JSON.stringify(data)}`)
        await localStorage.removeItem("user", JSON.stringify(data))
        await url_redirect('http://localhost:3000/login')
    })
}

function addingUser() {
    var username = ($('#username').val())
    var password = ($('#password').val())
    var tenHienThi = ($('#tenHienThi').val())
    $.post('addingUser', {
        username: username,
        password: password,
        tenHienThi: tenHienThi
    }, (data, status) => {
        alert(data)
        if (data == 'da co tai khoan') resetRegisInputBox()
        else if (data == 'tai khoan khong hop le') resetRegisInputBox()
        else url_redirect('http://localhost:3000/login')

    })
}

function resetRegisInputBox() {
    document.getElementById('username').value = ''
    document.getElementById('password').value = ''
    document.getElementById('tenHienThi').value = ''

}

// being tested




function userOptions() {
    document.getElementById("myDropdown").classList.toggle("show");
}

onclick = function (event) {
    if (event.target.matches('.user-info')) return
    var dropdowns = document.getElementsByClassName("dropdown-content");

    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (!openDropdown.classList.contains('show')) return
        openDropdown.classList.remove('show');
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
    }
    else {
        if (window.location.href = url) {
            clearTimeout(X);
            return true;
        }
        else {
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

function nameChange(){

}
function passwordChange(){
    
}

function isAdmin(name, pass) {
    return (name == 'admin' && pass == '123') ? true : false
}

function findUsingSearchBar(inputName, ulName) {
    // // Declare variables
    // var input, filter, ul, li, a, i, txtValue;
    // input = document.getElementById(`${inputName}`);
    // filter = input.value.toUpperCase();
    // ul = document.getElementById(`${ulName}`);
    // li = ul.getElementsByTagName('td');
    // // Loop through all list items, and hide those who don't match the search query
    // for (i = 0; i < li.length; i++) {
    //     txtValue = li[i].textContent || li[i].innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //         li[i].style.display = "";
    //     } else {
    //         li[i].style.display = "none";
    //     }
    // }
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById(`${inputName}`);
    filter = input.value.toUpperCase();
    table = document.getElementById(`${ulName}`);
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function deleteOnClick(id, path) {
    var thisID = id.replace(/ /g, "")
    $.post(`${path}`, {
        thisID: thisID
    }, (data, status) => {
        alert(JSON.stringify(data))
        window.location.reload()
    })

}

function updateOnClick(id, path) {
    var thisID = id.replace(/ /g, "")
    $.post(`${path}`, {
        thisID: thisID
    }, (data, status) => {
        alert(data)
    })

}

function updateSongOnClick(id) {
    var thisID = id.replace(/ /g, "")
    $.post('updateSongOnClick', {
        thisID: thisID
    }, (data, status) => {
        alert(data)
    })

}

function table_edit(id){
    document.querySelector(".table-edit").style.cssText = `display: block`;
    document.querySelector("#black-bg").style.cssText = `display: block`;
}
function cancel_edit(id){
    document.querySelector(".table-edit").style.cssText = `display: none`;
    document.querySelector("#black-bg").style.cssText = `display: none`;
}