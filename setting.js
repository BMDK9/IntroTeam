// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc, collection, addDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Firebase 구성 정보 설정
const firebaseConfig = {
    apiKey: "AIzaSyAzXX5j6y95F5-w-aemZc--QymtiWT_UVM",
    authDomain: "intro-team-42d34.firebaseapp.com",
    projectId: "intro-team-42d34",
    storageBucket: "intro-team-42d34.appspot.com",
    messagingSenderId: "367458824490",
    appId: "1:367458824490:web:b05f0947f7149006206e53",
    measurementId: "G-0488K83Q4K"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);