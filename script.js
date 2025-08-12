import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlI0S22vdMexvdUQjEFLr0I5bvFoiPwjo",
  authDomain: "escaperoom-53adb.firebaseapp.com",
  projectId: "escaperoom-53adb",
  storageBucket: "escaperoom-53adb.firebasestorage.app",
  messagingSenderId: "379297108835",
  appId: "1:379297108835:web:48a5c5ca71b091cc567956",
  databaseURL: "https://escaperoom-53adb-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elements
const ruleDisplay = document.getElementById("ruleDisplay");
const arrow = document.getElementById("arrow");
const avatar = document.getElementById("avatar");
const stages = document.querySelectorAll(".stage");
const finalMessage = document.getElementById("finalMessage");

// Listen for rule selection updates
onValue(ref(db, "rule"), (snapshot) => {
  const rule = snapshot.val();
  ruleDisplay.textContent = rule ? `Rule ${rule}` : "Waiting...";
  if (rule) {
    const angle = (rule - 1) * 72; // 5 rules = 72° per segment
    arrow.style.transform = `rotate(${angle}deg)`;
  }
});

// Listen for progress updates
onValue(ref(db, "level"), (snapshot) => {
  const level = snapshot.val();
  stages.forEach((stage, index) => {
    stage.classList.toggle("active", index < level);
  });
  const trackWidth = document.querySelector(".progress-track").offsetWidth;
  const step = trackWidth / (stages.length - 1);
  avatar.style.left = `${step * (level - 1)}px`;
});

// Listen for final message
onValue(ref(db, "finalMessage"), (snapshot) => {
  const msg = snapshot.val();
  finalMessage.textContent = msg || "";
});
