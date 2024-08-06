const audioEle = document.getElementById("audioFile");
const playBtnEle = document.getElementById("toolBar-playBtn");
const currentTimeEle = document.getElementById("currentTime");
const durationEle = document.getElementById("duration");
const progressBarEle = document.getElementById("progressBar");
const progressEle = document.getElementById("timeLine-progress");
const thumbEle = document.getElementById("timeLine-thumb")

const songs = [
    {
        title: "벌써 이렇게(Feat.Psy)",
        album: "Cool Best",
        artist: "Cool",
        albumCover: "/Media/Images/Project/Album/cool_best.jpg",
        src: "/Media/Audios/벌써 이렇게 (feat. Psy).mp3"
    },
    {
        title: "애상",
        album: "Cool Best",
        artist: "Cool",
        albumCover: "/Media/Images/Project/Album/cool_best.jpg",
        src: "/Media/Audios/애상.mp3"
    },
    {
        title: "슬퍼지려하기전에",
        album: "Cool Best",
        artist: "Cool",
        albumCover: "/Media/Images/Project/Album/cool_best.jpg",
        src: "/Media/Audios/슬퍼지려하기전에.mp3"
    },
    {
        title: "해변의 여인",
        album: "Cool Best",
        artist: "Cool",
        albumCover: "/Media/Images/Project/Album/cool_best.jpg",
        src: "/Media/Audios/Cool-해변의여인.mp3"
    },
    {
        title: "맥주와 땅콩",
        album: "Cool Best",
        artist: "Cool",
        albumCover: "/Media/Images/Project/Album/cool_best.jpg",
        src: "/Media/Audios/맥주와 땅콩.mp3"
    },
    {
        title: "너무 아픈 사랑은 사랑이 아니었음을",
        album: "김광석 네번째",
        artist: "김광석",
        albumCover: "/Media/Images/Project/Album/김광석 네번째.jpg",
        src: "/Media/Audios/너무 아픈 사랑은 사랑이 아니었음을.mp3"
    },
    {
        title: "Supernatural",
        album: "Supernatural",
        artist: "NewJeans",
        albumCover: "/Media/Images/Project/Album/Supernatural.jpg",
        src: "/Media/Audios/Supernatural.mp3"
    },
    {
        title: "Don't stop me now",
        album: "Jazz(2011Remaster)",
        artist: "Queen",
        albumCover: "/Media/Images/Project/Album/don't stop me now.jpg",
        src: "/Media/Audios/Don't Stop Me Now.mp3"
    },
]

/* 리스트에서 노래 재생하기 */

const toolBarAlbum = document.getElementById("toolBar-albumCover");
const toolBarTitle = document.getElementById("toolBar-title");
const toolBarArtist = document.getElementById("toolBar-artist");

let currentSongIndex = 0;
let playOrder = new Array(songs.length);
for(let i=0; i<songs.length; i++) {
    playOrder[i] = i;
}
loadSong(playOrder[currentSongIndex]);

// 노래 로드 함수
function loadSong(index) {
    const song = songs[index];
    audioEle.src = song.src;
    toolBarAlbum.src = song.albumCover;
    toolBarTitle.textContent = song.title;
    toolBarArtist.textContent = song.artist;
}

// 노래 재생 함수
let isPlaying = false;
function playSong() {
    if(!isPlaying) {
        isPlaying = true;
        playBtnEle.childNodes[1].style.display="none"; // play
        playBtnEle.childNodes[3].style.display="inline"; // pause
        audioEle.play();
    }
    else {
        isPlaying = false;
        playBtnEle.childNodes[1].style.display="inline"; // play
        playBtnEle.childNodes[3].style.display="none"; // pause
        audioEle.pause();
    }
}
// 다음 노래 재생
function playNextSong() {
    currentSongIndex += 1;
    if(currentSongIndex==songs.length) currentSongIndex = 0;
    loadSong(playOrder[currentSongIndex]);
    isPlaying=false;
    playSong();
}

/* toolBar 가운데 버튼 click 이벤트 */
const toolBarShuffle = document.getElementById('toolBar-shuffle');
const toolBarPrev = document.getElementById('toolBar-prev');
const toolBarNext = document.getElementById('toolBar-next');
const toolBarRepeat = document.getElementById('toolBar-repeat');
let isShuffled = false;
let isRepeating = 0;

// Shuffle
toolBarShuffle.addEventListener('click', function(event) {
    if(!isShuffled) {
        isShuffled = true;
        for(let i1=0; i1<songs.length; i1++) {
            playOrder[i1] = parseInt(Math.random()*songs.length);
            for(let i2=0; i2<i1; i2++) {
                if(playOrder[i1] == playOrder[i2]) {
                    playOrder[i1] = parseInt(Math.random()*songs.length);
                    i2=-1;
                }
            }
        }
        event.target.style.color = "#FFDE7A";
    }
    else {
        isShuffled = false;
        for(let i=0; i<songs.length; i++) {
            playOrder[i] = i;
        }
        event.target.style.color = "#adadad";
    }
});
// Prev
toolBarPrev.addEventListener('click', function() {
    currentSongIndex -= 1;
    if(currentSongIndex==-1) currentSongIndex = songs.length - 1;
    loadSong(playOrder[currentSongIndex]);
    isPlaying = false;
    playSong();
});
// Next
toolBarNext.addEventListener('click', playNextSong);

// Repeat
toolBarRepeat.addEventListener('click', function(event) {
    if(isRepeating == 0 ) {
        isRepeating = 1;
        event.target.style.color = "#FFDE7A";
    }
    else if(isRepeating == 1) {
        isRepeating = 2;
        event.target.style.color = "red";
    }
    else {
        isRepeating = 0;
        event.target.style.color = "#adadad";
    }
});


/* 재생버튼 이벤트*/


playBtnEle.addEventListener("click", function() {
    playSong()
});

/* 재생바 이벤트 */

/* 
    <총 재생시간 표시>
    loadedmetadate 이벤트는 미디어 요소의 메타데이터(길이,크기, 트랙목록 등)가 완전히 로드되었을 때 발생함\
    미디어 파일이 로드되었음을 나타내며, 오디오 요소에 적용하면 총 길이와 같은 정보를 활용할 수 있게 됨
*/
audioEle.addEventListener('loadedmetadata', function() {
    durationEle.innerText = formatTime(audioEle.duration);
    // textContent, innerText 모두 요소에 텍스트 노드를 추가한다는 공통점이 있고, 둘 다 해당 엘리먼트의 텍스트를 반환한다
    // 다수의 공백이 존재하는 경우, innerText는 하나만 남기고 전부 제거하는 반면, textContent는 전부 가져옴 / textContent가 호환성이 더 높고 가볍다는 특징이 있다
});

/*  
    <현재 재생시간 표시, 재생바 이동 효과>
    timeupdate 이벤트는 미디어 요소의 재생위치가 변경될 때 주기적으로 발생함
    미디어 파일이 재생될 때 현재 재생 위치를 업데이트 하는 것에 사용됨
    브라우저에 따라 다르지만, 일반적으로 미디어 재생동안 1초에 몇번 발생할 수 있기 때문에 거의 실시간으로 적용됨
*/
audioEle.addEventListener('timeupdate', function() {
    currentTimeEle.textContent = formatTime(audioEle.currentTime);
    const progressPercentage = (audioEle.currentTime / audioEle.duration) * 100;
    if(!isDragging) {
        progressEle.style.width = progressPercentage + '%';
        thumbEle.style.left = progressPercentage - 2.5 + '%';
    }
    // currentTime을 duration으로 나누어 현재 진행시간을 백분율로 나타낸 후, 재생바와 thumb의 너비,위치를 해당 %만큼 설정

    // <노래가 끝났을 때 다음 곡으로 넘어갈 것인지 한 곡 반복할 것인지 결정>
    if(audioEle.currentTime == audioEle.duration) {
        switch(isRepeating) {
            case 0: playNextSong(); break;
            case 1: currentSongIndex -= 1; playNextSong(); break;
            case 2: playNextSong();
        }
    }
});

/*
    <초 시간을 0:00 형식으로 포맷하여 반환>
    formatTime 함수는 audio 요소의 총 / 현재 재생시간을 매개변수로 받아서
    분,초를 따로 계산하고 템플릿 리터럴*을 사용하여 0:00 형식의 문자열으로 리턴함
*/
function formatTime(seconds) {
    const min = Math.floor(seconds / 60); // 재생시간(초) / 60 을 내림-> 분
    const sec = Math.floor(seconds % 60); // 초
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    // 템플릿 리터럴 : 문자열 생성시, 따옴표 대신 백틱 (` `)을 사용함, 줄바꿈을 이스케이프 문자 없이 할 수 있고,  ${ } 사이에 변수나 연산 등을 삽입할 수 있다 (printf)
}

/*
    <재생바 드래그 효과>
    mousedown은 마우스를 눌렀을 때 이벤트가 발생함, 마우스를 눌렀을 때 isDragging을 true, 뗐을 때 isDragging을 false로 하면 드래그 도중에 원하는 효과를 발생시킬 수 있음
    mousemove 이벤트에는 드래그 도중 일어날 효과를 걸고, mouseup에 isDragging=false 와 removeEventListener를 넣어서 드래그 효과를 중지시킬 수 있다
    누른다 -> 움직인다 -> 뗀다의 드래그 과정을 세분화 시킨것
*/
let isDragging = false;

progressBarEle.addEventListener('mousedown', function(event) {
    isDragging = true;
    document.addEventListener('mousedown', onDrag, false); // event 타깃인 progressBar까지 mousedown이 전달된 후, 버블링이 일어나 다시 document로 mousedown이 전달되므로 이벤트가 정상적으로 작동함
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onStopDrag);
});

function onDrag(event) {
    if (!isDragging) return;
    const rect = progressBarEle.getBoundingClientRect();
    const offsetX = Math.min(Math.max(0, event.clientX - rect.left), rect.width);
    progressEle.style.width = `${offsetX}px`
    thumbEle.style.left = `${offsetX-15}px`
}
/* 
    Math.max(0, event.clientX - rect.left) : event.clientX - rect.left는 재생바의 왼쪽 꼭지점에서부터 mousemove 이벤트가 발생한 마우스 위치 사이의 x축 거리를 의미함
    따라서 마우스가 재생바의 너비 사이에 있다면 양수값이 max가 되어 그 위치가 반환되고, 너비 왼쪽에 있다면 0이 반환되어 재생바가 0초로 설정되는 것
    Math.min도 마찬가지로 max에서 반환된 값과 재생바 너비를 비교하여 마우스가 너비를 오른쪽으로 벗어났다면 rect.width값이 min이 되어 재생바의 오른쪽 꼭지점 위치가 반환되는 것이다
    위에서 나온 드래그 한 위치의 x값을 전체 너비로 나눈 후 전체 재생시간과 곱하면 진행 정도가 백분율로 계산됨, 그것을 currentTime으로 설정하여 재생 시간을 이동시키는 것
*/
// math.min(, , , ...) math.max(, , , ...) 는 괄호 안의 숫자중 최대 혹은 최소값을 반환하는 함수

function onStopDrag(event) {
    isDragging = false;
    const rect = progressBarEle.getBoundingClientRect();
    const offsetX = Math.min(Math.max(0, event.clientX - rect.left), rect.width);
    const newTime = (offsetX / rect.width) * audioEle.duration;
    audioEle.currentTime = newTime;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onStopDrag);
}
// removeEventListener로 document에 걸려있는 mousemove, mouseup 이벤트를 모두 제거시킴


/* 재생바 mouseover 배경색 변경 */
progressBarEle.addEventListener('mouseover', function() {
    thumbEle.style.display = "block";
    progressEle.style.backgroundColor = "#FFDE7A";
    document.addEventListener('mouseup', function() {
        thumbEle.style.display = "none";
        progressEle.style.backgroundColor = "white";
    })
});

progressBarEle.addEventListener('mouseout', function() {
    if (!isDragging) {
        thumbEle.style.display = "none";
        progressEle.style.backgroundColor = "white";
    }
    // 드래그 중이면 mouseout 되더라도 색이 돌아오지 않음
});




