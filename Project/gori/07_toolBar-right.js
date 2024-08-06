const volumeBtnEle = document.getElementById('volumeBtn');
const volumeDivOutter = document.getElementById('volumeDivOutter');
const volumeDivInner = document.getElementById('volumeDivInner');
const volumeGaugeEle = document.getElementById('volumeGauge');
const volumeThumbEle = document.getElementById('volumeThumb');

// volumeGauge width 설정 함수
function setVolumeGauge() {
    const currentGauge = audioEle.volume * volumeDivInner.offsetWidth;
    volumeGaugeEle.style.width = `${currentGauge}px`;
    volumeThumbEle.style.left = `${currentGauge-8}px`;
}
setVolumeGauge();

//volumeBtn click 이벤트
let isMuted = false;
let mutedVolume = 0;
volumeBtnEle.addEventListener('click', function() {
    console.log(mutedVolume);
    if(!isMuted) {
        isMuted = true;
        mutedVolume = audioEle.volume;
        audioEle.volume = 0;
    }
    else {
        isMuted = false;
        audioEle.volume = mutedVolume;
    }
    setVolumeGauge();
});

// VolumeDiv mouseover 이벤트
volumeDivOutter.addEventListener('mouseover', function() {
    volumeGaugeEle.style.backgroundColor = "#FFDE7A";
    volumeThumbEle.style.display = "block";
});
volumeDivOutter.addEventListener('mouseout', function() {
    if(!isVolDragging) {
        volumeGaugeEle.style.backgroundColor = "white";
        volumeThumbEle.style.display = "none";
    }
})

// volumeDiv mousedown, 드래그 이벤트
let isVolDragging = false;
volumeDivOutter.addEventListener('mousedown', function(event) {
    isVolDragging = true;
    volumeDivOutter.addEventListener('mousedown', onVolDragging)
    document.addEventListener('mousemove', onVolDragging);
    document.addEventListener('mouseup', onVolStopDragging);
}, true);

function onVolDragging(event) {
    if(!isVolDragging) return;
    const rect = volumeDivInner.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const currentVolume = Math.min(Math.max(0, offsetX), volumeDivInner.offsetWidth);
    audioEle.volume = currentVolume / volumeDivInner.offsetWidth;
    setVolumeGauge();
}

function onVolStopDragging() {
    isVolDragging = false;
    document.removeEventListener('mousemove', onVolDragging);
    document.removeEventListener('mouseup', onVolStopDragging);
}

// 재생목록 열기 (팝업)
//const toolBarPlayList = document.getElementById('toolBar-playList');
//toolBarPlayList.addEventListener('click', function() {
//    window.open(
//        "A_playListPopUp.html",  // URL
//        "popup",                 // 창의 이름
//        "width=400,height=600,scrollbars=yes,resizable=yes,top=100,left=100,menubar=no,status=no,toolbar=no,location=no"
//    );
//});

// 재생목록 열기 (모달)
const toolBarListBtn = document.getElementById('toolBar-playList'); // 버튼
const playListBoxEle = document.getElementById('playListBox'); // 모달
toolBarListBtn.addEventListener()

