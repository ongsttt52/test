/* 마우스 오버시 재생버튼  */
var mouseover_btn_play = document.getElementsByClassName("mouseover_btn_play");
var btn_play = document.getElementsByClassName("btn_play");
for(let i=0; i<mouseover_btn_play.length; i++) {
    mouseover_btn_play[i].addEventListener("mouseover", function() {
        btn_play[i].style.color="white";
        btn_play[i].style.backgroundColor="black";
        btn_play[i].style.boxShadow="0px 10px 40px 1px black"
        btn_play[i].style.transitionDuration="0.1s";
    });
    mouseover_btn_play[i].addEventListener("mouseout", function() {
        btn_play[i].style.color="transparent";
        btn_play[i].style.backgroundColor="transparent";
        btn_play[i].style.boxShadow="none"
        btn_play[i].style.transitionDuration="0.1s";
    });
}  

/* 검색하기 클릭 애니메이션 */
const searchBtnEle = document.getElementById('searchBtn');
const searchInputEle = document.getElementById('searchBtnInput');
const searchSpanEle = searchBtnEle.childNodes[1]; // 엔터로 만든 줄바꿈도 자식요소이기 때문에 firstChild 사용시 Undifined를 얻게됨
function searchButtonFunc() {
    searchBtnEle.style.width="70%"
    searchBtnEle.style.textAlign="left";
    searchBtnEle.style.borderColor="white";
    searchBtnEle.style.cursor="default";
    searchSpanEle.style.display="none";
    searchInputEle.style.display="inline-block";
    searchInputEle.focus(); // 버튼을 눌렀을때 input창에 포커스 되도록 설정

}
searchBtnEle.addEventListener("click", searchButtonFunc);