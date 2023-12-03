const currentTime = document.querySelector("#timer-input span:nth-child(2)");
let second = document.getElementById("sec");
let minute = document.getElementById("min");
let hour = document.getElementById("hr");
const start = document.querySelector("#timer-input button");
second.addEventListener("click", () => {
    second.setAttribute("contentEditable", true);
})
minute.addEventListener("click", () => {
    minute.setAttribute("contentEditable", true);
})
hour.addEventListener("click", () => {
    hour.setAttribute("contentEditable", true);
})
let initialsecond = 0;
let initialmin = 0;
let initialhr = 0;
let activearea = document.getElementById("Active-timers");
let each_id = 0;
start.addEventListener("click", () => {
    initialsecond = Number(second.innerText);
    initialmin = Number(minute.innerText);
    initialhr = Number(hour.innerText);
    if ((!initialhr && initialhr != 0) || (!initialmin && initialmin != 0) || (!initialsecond && initialsecond != 0)) {
        return;
    }
    let tempo=document.getElementById("tempo");
    tempo.remove();
    let activetimer = document.createElement("div");
    activetimer.classList.add("active");
    activetimer.id = `timer-${each_id++}`;
    activetimer.innerHTML = `<span>Time Left:</span>
    <span><span class="timer-hr">${initialhr}</span> : <span class="timer-min">${initialmin}</span> : <span class="timer-sec">${initialsecond}</span></span>
    <button class="delete" onclick="removetimer(this.parentNode.id)">Delete</button>`;
    activearea.appendChild(activetimer);
})

let timer = false;
let timerid;
function watch(i) {
    let active_hr = Number(i.getElementsByClassName("timer-hr")[0].innerText);
    let active_min = Number(i.getElementsByClassName("timer-min")[0].innerText);
    let active_sec = Number(i.getElementsByClassName("timer-sec")[0].innerText);
    if (active_hr == 0 && active_min == 0 && active_sec == 0) {
        let audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg");
        audio.play();
        i.classList.remove("active");
        i.classList.add("finish");
        i.innerHTML = `<span class="timesup">Timer Is Up !</span><button class="stop" onclick="removetimer(this.parentNode.id)">Stop</button>`
        return;
    }
    if (timer) {
        active_sec--;
        if (active_sec == -1) {
            active_sec = 59;
            active_min--;
        }
        if (active_min == -1) {
            active_min = 59;
            active_hr--;
        }
        if (active_hr <= 0 && active_min <= 0 && active_sec <= 0) {
            let audio = new Audio("http://commondatastorage.googleapis.com/codeskulptor-assets/jump.ogg");
            audio.play();
            i.classList.remove("active");
            i.classList.add("finish");
            i.innerHTML = `<span class="timesup">Timer Is Up !</span><button class="stop" onclick="removetimer(this.parentNode.id)">Stop</button>`
            return;
        }
    }
    i.getElementsByClassName("timer-hr")[0].innerText = `${active_hr}`;
    i.getElementsByClassName("timer-min")[0].innerText = `${active_min}`;
    i.getElementsByClassName("timer-sec")[0].innerText = `${active_sec}`;
}
let time = [];
const obj = {
    hr: "",
    min: "",
    sec: ""
}
let x = 0;
let current_id = 0;
setInterval(ready, 1000);
function ready() {
    if (document.getElementById(`timer-${current_id}`) != null && time[`timer-${current_id}`] == undefined) {
        time[`timer-${current_id}`] = {};
        time[`timer-${current_id}`]["hr"] = Number(document.querySelector(`#timer-${current_id} .timer-hr`).innerText);
        time[`timer-${current_id}`]["min"] = Number(document.querySelector(`#timer-${current_id} .timer-min`).innerText);
        time[`timer-${current_id}`]["sec"] = Number(document.querySelector(`#timer-${current_id} .timer-sec`).innerText);
        current_id++;
    }
    const active = document.getElementsByClassName("active");
    for (let i of active) {
        timer = true;
        watch(i);
    }
}
function removetimer(element) {
    delete time[`${element}`];
    let remove_id = `${element}`;
    let parent = document.getElementById(remove_id);
    parent.style.display = "none";
}

