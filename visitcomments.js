src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js"
src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-database.js"
src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-analytics.js"
src = "https://www.gstatic.com/firebasejs/8.8.1/firebase-auth.js"

$(document).ready(async function () {
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

    //방명록 불러오는 부분//3개 불러오는걸로 수정해야함!!
    const dbRef = database.ref('logs').orderByChild('ups').limitToLast(3);
    dbRef.on("value", (snapshot) => {
        snapshot.forEach((child) => {

            const object = child.val();
            let temp = `
            <p><span><img class="pfp" , src="./image/minsun/pfp/${object.pfp}.png" , alt="pfp"></span>${object.content} (${object.name})</p>
            `

            $('#visit-comment').append(temp);

        });
    });
    //방명록 불러오는 부분 끝남
});