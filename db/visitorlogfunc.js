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
            <span><img class="pfp" , src="./image/minsun/pfp/${object.pfp}.png" , alt="pfp"></span>
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
    let profiles = ['apeach','con','muzi','neo','prodo','ryan'];
    var random_index = Math.floor(Math.random() * profiles.length);
    var pfp = profiles[random_index]; 

    let doc = {
        'name': name,
        'pw': pw,
        'content': content,
        'date': date,
        'pfp': pfp
    }

    database.ref('logs').push(doc);

    window.location.reload();
});
//방명록 등록 끝



//방명록 삭제하는 부분
$(document).on("click", "#deleteLogBtn", function () {

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
