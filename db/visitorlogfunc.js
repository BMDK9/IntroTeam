src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"
src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-database.js"
src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-analytics.js"
src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js"


const firebaseConfig = {
    apiKey: "AIzaSyAzXX5j6y95F5-w-aemZc--QymtiWT_UVM",
    authDomain: "intro-team-42d34.firebaseapp.com",
    databaseURL: "https://intro-team-42d34-default-rtdb.firebaseio.com",
    projectId: "intro-team-42d34",
    storageBucket: "intro-team-42d34.appspot.com",
    messagingSenderId: "367458824490",
    appId: "1:367458824490:web:cfeed0e953eab5a2206e53",
    measurementId: "G-Y60R200KGX"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

//방명록 불러오는 부분
const dbRef = database.ref('logs');
dbRef.on("value", (snapshot) => {
    snapshot.forEach((child) => {

        const object = child.val();
        let temp = `
    <div class="log">
        <div class="input-group mb-3">
            <span class="input-group-text">${object.date}</span>
            <span class="input-group-text">${object.name}</span>
            <span><input type="text" id="deleteLogPw" placeholder="Password" aria-label="Password" class="form-control"></span>
            <button class="btn btn-secondary" type="button" id="deleteLogBtn">삭제</button>
            <div class="logText" id = ${child.ref.key}>
                ${object.content}
            </div>
        </div>
    </div>
    `

        $('#logBox').append(temp)

    });
});
//방명록 불러오는 부분 끝남


//방명록 등록하는 부분
$(document).on("click", "#logPushBtn", function () {

    let name = $('#logName').val();
    let pw = $('#logPassword').val();
    let content = $('#logContent').val();
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    let date = `${year}-${month}-${day}`;

    let doc = {
        'name': name,
        'pw': pw,
        'content': content,
        'date': date
    }

    database.ref('logs').push(doc);

    //메인페이지에 보이게 하기 위해 저장
    // let doc2 = {
    //     'flag':0
    // }
    // await database.ref('flags').push(doc2)

    //3개의 방명록을 메인페이지에 보여주기 위해 키 저장하기
    // let doc3 = {
    //     'key1':'',
    //     'key2':'',
    //     'key3':''
    // }
    // await database.ref('keys').push(doc3);



    //메인페이지 저장 부분 시작
    localStorage.setItem('visitcommentFlag', true);//메인페이지에서 db를 업데이트 해야할지 알려줌

    let content1 = localStorage.getItem('content1');
    let name1 = localStorage.getItem('name1');
    let content2 = localStorage.getItem('content2');
    let name2 = localStorage.getItem('name2');

    localStorage.setItem('content2', content1);
    localStorage.setItem('name2', name1);
    localStorage.setItem('content3', content2);
    localStorage.setItem('name3', name2);

    localStorage.setItem('content1', content);
    localStorage.setItem('name1', name);
    //메인페이지 저장 부분 끝

    window.location.reload();
});
//방명록 등록 끝



//방명록 삭제하는 부분
$(document).on("click", "#deleteLogBtn", function () {

    //alert("click");

    let parentDiv = $(this).closest('div');
    let textDiv = parentDiv.children('.logText');
    let pwInput = parentDiv.find('input');


    let id = textDiv.attr('id');
    let password = pwInput.val();

    const dbRef = database.ref('logs');

    dbRef.on("value", (snapshot) => {
        snapshot.forEach((child) => {
            const object = child.val();

            if (id == child.ref.key) {
                if (object.pw == password) {
                    dbRef.child(id).remove();
                }
                else {
                    alert("잘못된 비밀번호");

                }
            }
        });
    });
    window.location.reload();
});
//방명록 삭제 끝남
