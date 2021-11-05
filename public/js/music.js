//Music
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let volume_slider = document.querySelector(".volume_slider");


let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "An Thần",
    artist: "(ft.Thắng), LOW G, Rap Nhà Làm",
    image: "/images/anthan.jpg",
    path: "/music/anthan.mp3"
  },
  {
    name: "1 Phút",
    artist: "Andiez",
    image: "/images/1phut.jpg",
    path: "/music/1phut.mp3"
  },
  {
    name: "Không Cần Cố",
    artist: "MCK",
    image: "/images/kcc.jpg",
    path: "https://cf-media.sndcdn.com/asMQJlIA4R5g.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vYXNNUUpsSUE0UjVnLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjM1MDg4ODYxfX19XX0_&Signature=dFK4qFgOGKZFWFdsrTfq64z170wPMju9wD5VdIw2zWxj39MMuTBIYgjY6mLlRWWx3QKHp6vP7nu-KhNM8~yvS45-tFsgEj3KN9unvFBcj4Bt0Ra3vbg67s48f-rIlePMh4iMdHWlz7UjvJslVl8sG~vStQV2inyUAVpbfJQoTDm~JHpBYHI1xiTpPZXiUUOw659iyYtpinL-AsjAfAOY4sfaicUaIsXF9ElX109dZvAtQUC9Fv76JsVkLwclXq7ep3ujzQ3g1RQyRkskSvBRT1rL7vQC1SDwsu~yOjggTNoGdFb~q-38hn5XpKJkmafBaxEGjcBlNkpE-TwB8BIiLg__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ"
  },
  {
    name: "Honey",
    artist: "Anh Vũ ft.UMIE",
    image: "/images/honey-umie.jpg",
    path: "https://cf-media.sndcdn.com/QRcVAn8F6koj.128.mp3?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL2NmLW1lZGlhLnNuZGNkbi5jb20vUVJjVkFuOEY2a29qLjEyOC5tcDMqIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjM1MDg4ODk5fX19XX0_&Signature=PR4MDggO4x2PcZ7RNGu1vQBuV71szNqGxRP4iVp9Pp0ZRf~~PBIDGIFUvP4JBGv8nxxTjeYGDrn2C59alZVKf~fpCu9i5-wQTBkVVajgP7xMaG3SAYZbfJUtqBECIUmiANKmlIzpT9128FWtQL4bmf~uJOoqeF5OLDdyBXoKhA9BwkMmAqt~nOVJhCipRTiaLnQa2gxGqek-2d2zQY6sIvVze3S-EvtGWkzvQqi9HLq6i3XDBCVO0yxjrNFeEN4XVuOvCye9UmWx8qFfBeGK48CP89knzJLkr-Pindw6fQ58uAoP1S6T87Kq8OYC~xxgfciorMABCscfSM1U~Hb2Xw__&Key-Pair-Id=APKAI6TU7MMXM5DG6EPQ"
  },
  {
    name: "Enthusiast",
    artist: "Tours",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  },
  {
    name: "Shipping Lanes",
    artist: "Chad Crouch",
    path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3",
  },
];


function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00.00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  document.querySelector(".playpause-track").innerHTML = '<i class="far fa-pause-circle fa-2x" style="opacity: 1; color: #7200a1;">';
  document.querySelector(".btn-play-all").innerHTML = '<i class="fas fa-pause" style="width: 100px; height: 23px;"></i><span>TẠM DỪNG</span>';
  document.querySelector(".is-50x50").style.animationPlayState = "running";
  document.querySelector("#songicon1").style.animationPlayState = "running";
  document.querySelector("#songicon1").style.cssText = `display: block;`;
  document.querySelector("#songicon2").style.cssText = `display: block;`;
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  document.querySelector(".playpause-track").innerHTML = '<i class="far fa-play-circle fa-2x" style="opacity: 1; color: #7200a1;">';
  document.querySelector(".btn-play-all").innerHTML = '<i class="fas fa-play"></i><span>TIẾP TỤC PHÁT</span>';
  document.querySelector(".is-50x50").style.animationPlayState = "paused";
  document.querySelector("#songicon1").style.animationPlayState = "paused";
  document.querySelector("#songicon2").style.animationPlayState = "paused";
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function showMV() {
  document.querySelector(".background-mv").style.cssText = `display: block;`;
}
function hiddenMV() {
  document.querySelector(".background-mv").style.cssText = `display: none;`;
  document.querySelector(".layer-middle").prop('disabled', true);
}
var curr_song = ""

function getData(data) {
  curr_song = data

  return data
}
function playSelectedSong(song) {
  songLink = song.link
  return songLink
}
function loadTrackTest(songLink) {


  clearInterval(updateTimer);
  resetValues();
  curr_track.src = songLink;
  curr_track.load();
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  playTrack();
  document.getElementById("footer_song_icon").src = getSelectedSongImage();
  document.getElementById("footer_song_author").innerHTML = `${getSelectedSongAuthor()}`;
  document.getElementById("footer_song_name").innerHTML = `${getSelectedSongName()}`;
}




function getSelectedSongImage() {

  return curr_song.image
}

function getSelectedSongName() {
  return curr_song.name
}


function getSelectedSongAuthor() {

  return curr_song.author
}