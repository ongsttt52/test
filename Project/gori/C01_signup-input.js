const emailEle = document.getElementById('email');
const pwdEle = document.getElementById('pwd');
const nameEle = document.getElementById('name');
const birthEle = document.getElementById('birth');
const genderEle = document.getElementsByClassName('gender');
const emailReg = /^[0-9a-zA-Z][0-9a-zA-Z]*@[0-9a-zA-z]*(\.com|\.co\.kr)$/;
const pwdReg= /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$])[A-Za-z0-9!@#$]{10,25}$/; 
const birthReg=/^[0-9]{8}/;
// 숫자, 소문자, 대문자, !@#$를 모두 포함해야 하는 정규식 (?=...)은 긍정적 전방 탐색, 괄호 안의 내용이 반드시 문자열 어딘가에 존재해야 함을 의미 
let toggle=true;
let formToggle1=true;
let formToggle2=false;

// 입력 필드와 그에 해당하는 정규식을 객체로 매핑, fields[name]의 key값이 일치하면 해당 객체를 반환하여 내용물에 접근 가능 const {element, regex} = fields[name]
const fields = {
    email: {
        element: emailEle,
        regex: emailReg
    },
    pwd: {
        element: pwdEle,
        regex: pwdReg
    },
    birth: {
        element: birthEle,
        regex: birthReg
    }
};

/* 테두리, 아웃라인에 스타일 적용 */
function setStyle_border(element, isValid) {
    if (!isValid) {
        element.style.borderColor = "red";
        element.style.outline = "1px solid #ff000081";
    } else {
        element.style.borderColor = "#7e7e7e";
        element.style.outline = ""; // outline을 기본상태로 되돌림
    }
}

/* 잘못된 정보 입력시 경고문구 생성 후 element의 부모(label)에 appendChild */
function alert(element, isValid) {
    let parent = element.parentNode
    if(!isValid) {
        // element가 emailEle 이면서 label의 마지막 자식일때
        if (element==emailEle && element==parent.lastChild) {
            let newP = document.createElement("p");
            let newText = document.createTextNode("잘못된 형식입니다. name@domain.com의 형식으로 입력해주세요.");
            newP.appendChild(newText);
            newP.style.color="red";
            newP.style.fontWeight="400"
            newP.style.fontSize="14px";
            parent.appendChild(newP);
        }
        // pwd
        else if (element==pwdEle) {
            if(element.value.length<10 && element==parent.lastChild) {
                let newP = document.createElement("p");
                var newText = document.createTextNode("10자 이상 입력해주세요.");
                newP.style.color="red";
                newP.style.fontWeight="400"
                newP.style.fontSize="14px";
                newP.style.marginBottom="5px"
                newP.appendChild(newText);
                parent.appendChild(newP);
            }
            else if(element.value.length==10) {
                parent.removeChild(parent.lastChild);
            }
        }
        // birth
        else if(element==birthEle && element==parent.lastChild) {
            let newP = document.createElement("p");
            let newText = document.createTextNode("잘못된 형식입니다. 8자리 숫자를 입력해주세요.");
            newP.appendChild(newText);
            newP.style.color="red";
            newP.style.fontWeight="400"
            newP.style.fontSize="14px";
            newP.style.marginBottom="10px"
            parent.appendChild(newP);
        }
    }
    // 정규식 검사에서 true가 나올경우 알림창 없애기
    else if(isValid && element!=parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
    // 비밀번호 유효성 체크박스
    if(element!=pwd) return;
    let regArr = [/(?=.*[0-9])/,/(?=.*[a-z])/,/(?=.*[A-Z])/,/(?=.*[!@#$])/];
    for(let i=0; i<regArr.length; i++) {
        if(regArr[i].test(element.value)) {
        document.querySelectorAll("#pwdCheckUl li button")[i].style.backgroundColor="transparent";
        document.querySelectorAll("#pwdCheckUl li button")[i].style.border="none";
        }
        else {
            document.querySelectorAll("#pwdCheckUl li button")[i].style.backgroundColor="#121212";
            document.querySelectorAll("#pwdCheckUl li button")[i].style.border="1px solid #7e7e7e";
        }
    }
}

/* onkeyup 이벤트로 정규식 검사 진행 */
function formCheck(name, value) {
    if (fields[name]) {
        const { element, regex } = fields[name];
        const isTrue = regex.test(value);
        setStyle_border(element, isTrue);
        alert(element, isTrue);

    }
}
/* onsubmit 최종 폼체크 */
function formCheckOnSubmit() {
    let allLabel = document.getElementsByClassName('label');
    for(let i=0; i<allLabel.length; i++) {
        if(allLabel[i].lastChild.tagName=="P") {
            return false;
        }
    }
    if(nameEle.value.length>0) {
        return true;
    }
    else {
        alert('모든 정보를 정확히 입력해주세요.');
        return false;
    }
}

/* 비밀번호 숨기기/표시하기 버튼 */
function pwdFunc() {
    let imgEle = document.querySelector("#pwd-btn-img");
    if(toggle) {
        toggle=false;
        let srcNode = document.createAttribute("src");
        srcNode.value = "/Media/Images/Project/Icon/eye-open.png"
        imgEle.setAttributeNode(srcNode);
        pwd.type="text"
    }
    else {
        toggle=true;
        let srcNode = document.createAttribute("src");
        srcNode.value = "/Media/Images/Project/Icon/eye-closed.png"
        imgEle.setAttributeNode(srcNode);
        pwd.type="password"
    }
}

/* 성별 버튼을 눌렀을때 배경색이 바뀌고 해당 radio를 checked로 만들기 */
function checkRadio(genderValue) {
    let buttons = document.querySelectorAll(".signup-btn-gender");
    for(let i=0; i<genderEle.length; i++) {
        if(genderValue==genderEle[i].value) {
            genderEle[i].checked=true;
        }
    }
    for(let i=0; i<genderEle.length; i++) {
        if(genderEle[i].checked) {
            buttons[i].style.backgroundColor="#FFDE7A"
            buttons[i].style.color="black"
            buttons[i].style.fontWeight=600;
        }
        else {
            buttons[i].style.backgroundColor="#121212"
            buttons[i].style.color="white"
            buttons[i].style.fontWeight=500;
        }
    }
}
