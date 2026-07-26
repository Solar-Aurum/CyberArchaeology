// =========================
// VICTORY SCREEN LOGIC
// =========================

function getRank(score){

    if(score >= 120) return "MASTER CYBER ARCHAEOLOGIST";
    if(score >= 90)  return "SENIOR CYBER ARCHAEOLOGIST";
    if(score >= 60)  return "FIELD ARCHAEOLOGIST";
    return "TRAINEE ARCHAEOLOGIST";

}

function formatTime(seconds){

    seconds = Math.max(0, parseInt(seconds, 10) || 0);

    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;

    return `${minutes.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;

}

function typewrite(element, text, speed, onDone){

    let i = 0;

    element.textContent = "";

    let interval = setInterval(() => {

        element.textContent += text.charAt(i);
        i++;

        if(i >= text.length){

            clearInterval(interval);
            element.classList.add("done");

            if(onDone) onDone();

        }

    }, speed);

}

window.onload = function(){

    let name = "Archaeologist";
    let score = 0;
    let timeRemaining = 0;

    try{

        name = localStorage.getItem("playerName") || "Archaeologist";
        score = parseInt(localStorage.getItem("finalScore"), 10) || 0;
        timeRemaining = parseInt(localStorage.getItem("timeRemaining"), 10) || 0;

    } catch(e){

        console.warn("Could not read mission results:", e);

    }

    document.getElementById("statName").textContent = name;
    document.getElementById("statScore").textContent = `${score} / 140 PTS`;
    document.getElementById("statTime").textContent = formatTime(timeRemaining) + " remaining";
    document.getElementById("statRank").textContent = getRank(score);
    document.getElementById("rankBanner").textContent = "RANK: " + getRank(score);

    let title = document.getElementById("victoryTitle");

    typewrite(title, "MISSION ACCOMPLISHED", 60);
};