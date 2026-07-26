let score = 0;

let time = 3600;

let completedRounds = [];

let archiveOrder = [];

let timer;






// =========================
// TIMER SYSTEM
// =========================


window.onload = function(){


    let timerElement =
    document.getElementById("timer");



    if(timerElement){


        timer=setInterval(()=>{


            if(time<=0){


                clearInterval(timer);


                timerElement.innerText=
                "SYSTEM COLLAPSED";


                return;


            }



            time--;



            let minutes=
            Math.floor(time/60);



            let seconds=
            time%60;



            timerElement.innerText =
            `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;



        },1000);


    }


};








// =========================
// SCORE SYSTEM
// =========================


function updateScoreDisplay(){


    score=Math.max(-200,Math.min(score,140));


    let display=
    document.getElementById("score-display");



    if(display){


        display.innerText=
        `${score} / 140 PTS`;


    }


}







function feedback(id,message,success){


    let box=
    document.getElementById(id);



    if(box){


        box.style.display="block";


        box.innerHTML=message;


        box.style.color=
        success?
        "#00c3ff":
        "#ff4655";


    }


}







// =========================
// ROUND UNLOCK SYSTEM
// =========================


function unlockRound(number){


    let round=
    document.getElementById(
    "round"+number
    );



    if(round){


        round.classList.remove("locked");


        document
        .getElementById(
        "status"+number
        )
        .innerText="ACTIVE";


    }


}








function completeRound(number,points){


    if(completedRounds.includes(number))
    return;



    completedRounds.push(number);



    score+=points;


    updateScoreDisplay();



    let status=
    document.getElementById(
    "status"+number
    );



    if(status)
    status.innerText="COMPLETED";




    let round=
    document.getElementById(
    "round"+number
    );



    if(round)
    round.classList.add("completed");





    if(number===7){


        document
        .getElementById("finalRound")
        .classList.remove("locked");



        document
        .getElementById("statusFinal")
        .innerText="ACTIVE";


    }


    else{


        unlockRound(number+1);


    }



}









// ===============================
// ROUND 1 LOGIC
// ===============================


function selectArchive(card){


    let id = card.dataset.id;


    if(archiveOrder.includes(id)){
        return;
    }


    archiveOrder.push(id);


    card.classList.add("selected");


    document.getElementById("archive-order").innerHTML =
    archiveOrder.join(" ➜ ");

}




function resetArchive(){


    archiveOrder=[];


    document.getElementById("archive-order").innerHTML =
    "NONE";


    document
    .querySelectorAll(".archive-card")
    .forEach(card=>{

        card.classList.remove("selected");

    });


}





function checkRound1(){


    if(
    archiveOrder.join("") === "CBAD"
    ){


        feedback(
            "feedback1",
            "Archive timeline restored. Recovery digit: 7",
            true
        );


        completeRound(
            1,
            10
        );


    }


    else{


        score-=5;


        updateScoreDisplay();


        feedback(
            "feedback1",
            "Timeline mismatch. Integrity lost (-5 PTS).",
            false
        );


    }


}



// =========================
// ROUND 2
// HTML INVESTIGATION
// =========================


function checkRound2(){


    let ans=
    document
    .getElementById("round2Input")
    .value
    .trim();



    if(ans==="4"){


        feedback(
        "feedback2",
        "Bugs eliminated! Markup structural integrity verified. Recovery digit: 9",
        true
        );


        completeRound(2,10);



    }


    else{


        score-=5;


        updateScoreDisplay();



        feedback(
        "feedback2",
        "Incorrect HTML tree analysis (-5 PTS).",
        false
        );


    }


}








// =========================
// ROUND 5
// CAESAR CIPHER
// =========================


function revealHint5(){


    document
    .getElementById("hint5Box")
    .style.display="block";



    document
    .getElementById("hint5Btn")
    .disabled=true;



    score-=10;


    updateScoreDisplay();



}








function checkRound5(){


    let ans=
    document
    .getElementById("round5Input")
    .value
    .toUpperCase()
    .trim()
    .replace(/\s+/g," ");



    if(ans==="CYBER CRIME"){



        feedback(
        "feedback5",
        "Transmission decrypted. Recovery digit: 3",
        true
        );



        completeRound(5,25);



    }


    else{


        score-=5;


        updateScoreDisplay();



        feedback(
        "feedback5",
        "Incorrect Caesar cipher translation (-5 PTS).",
        false
        );


    }


}


// =========================
// ROUND 3
// LOGIC MATRIX
// =========================


function checkRound3(){


    let ans =
    document
    .getElementById("round3Input")
    .value
    .toUpperCase()
    .trim();



    if(ans==="ALEX"){


        feedback(
        "feedback3",
        "Logic matrix solved. Server owner identified: Alex. Recovery digit: 8",
        true
        );



        completeRound(3,20);



    }


    else{


        score-=5;


        updateScoreDisplay();



        feedback(
        "feedback3",
        "Logic contradiction detected (-5 PTS).",
        false
        );


    }


}









// =========================
// ROUND 6
// BINARY TRANSMISSION
// =========================


function revealHint6a(){


    document
    .getElementById("hint6aBox")
    .style.display="block";



    document
    .getElementById("hint6aBtn")
    .disabled=true;



    score-=0;


    updateScoreDisplay();


}







function revealHint6b(){


    document
    .getElementById("hint6bBox")
    .style.display="block";



    document
    .getElementById("hint6bBtn")
    .disabled=true;



    score-=10;


    updateScoreDisplay();


}









function checkRound6(){


    let ans =
    document
    .getElementById("round6Input")
    .value
    .toUpperCase()
    .trim()
    .replace(/\s+/g," ");



    if(ans==="BACK TO THE FUTURE"){



        feedback(
        "feedback6",
        "Binary archive reconstructed successfully. Recovery digit: 5",
        true
        );



        completeRound(6,25);



        initPipeGame();



    }


    else{


        score-=5;


        updateScoreDisplay();



        feedback(
        "feedback6",
        "ASCII conversion mismatch (-5 PTS).",
        false
        );


    }


}









// =========================
// ROUND 4
// SCRAMBLED MEMORY STRINGS
// =========================


function checkRound4(){


    let ans =
    document
    .getElementById("round4Input")
    .value
    .toUpperCase()
    .trim();



    if(ans==="COMPUTER ENGINEERING"){


        feedback(
        "feedback4",
        "Memory strings restored. Recovery digit: 2",
        true
        );



        completeRound(4,20);



    }


    else{


        score-=5;


        updateScoreDisplay();



        feedback(
        "feedback4",
        "Fragment reconstruction failed (-5 PTS).",
        false
        );


    }


}

// ===============================
// ROUND 7 : DATA PIPE CONNECTION
// ===============================


const PIPE_DIRS = [
    "N",
    "E",
    "S",
    "W"
];


const PIPE_VECT = {

    N:{dx:0,dy:-1},
    E:{dx:1,dy:0},
    S:{dx:0,dy:1},
    W:{dx:-1,dy:0}

};


const PIPE_OPP = {

    N:"S",
    E:"W",
    S:"N",
    W:"E"

};



let pipeState = {};







// -------------------------------
// Pipe Rotation
// -------------------------------


function rotatePipeDirection(dir,steps){


    let index =
    PIPE_DIRS.indexOf(dir);


    return PIPE_DIRS[
        (index+steps)%4
    ];

}





function getPipeConnections(tile){


    let connections=[];



    if(tile.shape==="straight"){


        connections=[
            "N",
            "S"
        ];


    }


    else if(tile.shape==="elbow"){


        connections=[
            "N",
            "E"
        ];


    }


    else if(tile.shape==="cap"){


        connections=[
            "N"
        ];


    }



    return connections.map(direction=>

        rotatePipeDirection(
            direction,
            tile.rotation
        )

    );


}









// ===============================
// 5 x 5 PIPE LEVEL
// ===============================


const PIPE_LEVEL_5 = [


[
{shape:"cap",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0}
],


[
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1}
],


[
{shape:"straight",rotation:1},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:0}
],


[
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1}
],


[
{shape:"elbow",rotation:3},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"cap",rotation:3}
]

];



const PIPE_LEVEL_5_START=[0,0];

const PIPE_LEVEL_5_END=[4,4];









// ===============================
// 10 x 10 PIPE LEVEL
// ===============================











// ===============================
// CREATE PIPE BOARD
// ===============================


function loadPipeLevel(
containerId,
levelName,
layout,
start,
end
){
    let container = document.getElementById(containerId);
    container.innerHTML = "";

    // Scrambles the rotation (0, 1, 2, or 3) on load
    let grid = layout.map(row =>
        row.map(tile => ({
            shape: tile.shape,
            rotation: Math.floor(Math.random() * 4)
        }))
    );

    pipeState[levelName] = {
        size: grid.length,
        grid: grid,
        start: start,
        end: end
    };

    for(let r = 0; r < grid.length; r++){
        for(let c = 0; c < grid[r].length; c++){
            let tile = grid[r][c];
            let pipe = document.createElement("div");

            pipe.className = "pipe-tile " + tile.shape + "-pipe";

            if(r === start[0] && c === start[1]) pipe.classList.add("start-pipe");
            if(r === end[0] && c === end[1]) pipe.classList.add("end-pipe");

            pipe.style.transform = `rotate(${tile.rotation * 90}deg)`;

            pipe.onclick = function(){
                tile.rotation = (tile.rotation + 1) % 4;
                pipe.style.transform = `rotate(${tile.rotation * 90}deg)`;
            };

            container.appendChild(pipe);
        }
    }
}








// ===============================
// CHECK CONNECTION
// ===============================


function pipeConnected(levelName){


    let level =
    pipeState[levelName];


    if(!level){

        console.warn("pipeConnected called before level '"+levelName+"' was loaded.");

        return false;

    }



    let visited =
    Array.from(
        {
            length:level.size
        },
        ()=>Array(level.size).fill(false)
    );



    let queue=[
        level.start
    ];



    visited
    [level.start[0]]
    [level.start[1]]
    =true;



    while(queue.length){


        let current =
        queue.shift();



        let r=current[0];

        let c=current[1];



        if(
        r===level.end[0] &&
        c===level.end[1]
        )

        return true;



        let directions =
        getPipeConnections(
            level.grid[r][c]
        );



        for(let d of directions){


            let nr =
            r+PIPE_VECT[d].dy;


            let nc =
            c+PIPE_VECT[d].dx;



            if(
            nr<0 ||
            nc<0 ||
            nr>=level.size ||
            nc>=level.size
            )

            continue;




            if(
            visited[nr][nc]
            )

            continue;



            let neighbour =
            getPipeConnections(
                level.grid[nr][nc]
            );



            if(
            neighbour.includes(
                PIPE_OPP[d]
            )
            ){


                visited[nr][nc]=true;


                queue.push(
                    [
                        nr,
                        nc
                    ]
                );


            }



        }


    }



    return false;


}


// ===============================
// 10 x 10 HARD PIPE GRID
// ===============================


const PIPE_LEVEL_10 = [

[
{shape:"cap",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:3}
],


[
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:0}
],


[
{shape:"straight",rotation:1},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:2}
],


[
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:0}
],


[
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0}
],


[
{shape:"elbow",rotation:3},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1}
],


[
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2}
],


[
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:1}
],


[
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:0},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1}
],


[
{shape:"elbow",rotation:2},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:1},
{shape:"straight",rotation:1},
{shape:"elbow",rotation:3},
{shape:"straight",rotation:0},
{shape:"elbow",rotation:2},
{shape:"straight",rotation:1},
{shape:"straight",rotation:0},
{shape:"cap",rotation:3}
]

];



const PIPE_LEVEL_10_START=[0,0];

const PIPE_LEVEL_10_END=[9,9];









// ===============================
// START ROUND 7
// ===============================


function initPipeGame(){


    loadPipeLevel(

        "pipeGrid5",

        "level5",

        PIPE_LEVEL_5,

        PIPE_LEVEL_5_START,

        PIPE_LEVEL_5_END

    );


}









// ===============================
// CHECK 5x5
// ===============================


function checkPipeLevel1(){


    if(
    pipeConnected("level5")
    ){


        feedback(
        "feedback7",
        "✓ System Sub-Junction restored. Deep Core Network unlocked. (+10 PTS)",
        true
        );



        score+=10;

        updateScoreDisplay();



        document
        .getElementById("pipe-level-1")
        .style.display="none";



        document
        .getElementById("pipe-level-2")
        .style.display="block";



        loadPipeLevel(

            "pipeGrid10",

            "level10",

            PIPE_LEVEL_10,

            PIPE_LEVEL_10_START,

            PIPE_LEVEL_10_END

        );



    }

    else{


        score-=5;

        updateScoreDisplay();



        feedback(
        "feedback7",
        "Pipeline break detected (-5 PTS).",
        false
        );


    }


}









// ===============================
// CHECK 10x10
// ===============================


function checkPipeLevel2(){


    if(
    pipeConnected("level10")
    ){


        feedback(
        "feedback7",
        "✓ All data pipelines restored. Recovery digit: 4",
        true
        );



        completeRound(
            7,
            20
        );



    }

    else{


        score-=5;


        updateScoreDisplay();



        feedback(
        "feedback7",
        "Deep Core routing incomplete (-5 PTS).",
        false
        );


    }


}


// =========================
// ROUND 8
// WAYBACK TIME MACHINE (DIFF ANALYSIS)
// =========================
function checkRound8(){

    let ans = document.getElementById("round8Input").value.trim();

    if(ans === "8090"){

        feedback(
            "feedback8",
            "✓ Time machine snapshot validated! Original backup port 8090 restored. Recovery digit: 1",
            true
        );

        completeRound(8, 20);

    }
    else{

        score -= 5;

        updateScoreDisplay();

        feedback(
            "feedback8",
            "Incorrect port number. Look at the red '-' line from the 2008 snapshot (-5 PTS).",
            false
        );

    }

}


// ===============================
// FINAL CIVILIZATION RESTORATION
// ===============================


function checkFinal(){


    let answer =
    document
    .getElementById("finalInput")
    .value
    .trim();


    if(answer==="79823541"){



        feedback(

            "finalFeedback",

            "MASTER KEY ACCEPTED.<br>GLOBAL CIVILIZATION REBOOT INITIATED.",

            true

        );



        clearInterval(timer);



        try{

            localStorage.setItem("finalScore", score);
            localStorage.setItem("timeRemaining", time);

        } catch(e){

            console.warn("Could not save mission results:", e);

        }



        setTimeout(()=>{


            window.location.href = "victory.html";


        },1500);



    }


    else{


        score-=5;


        updateScoreDisplay();



        feedback(

            "finalFeedback",

            "INVALID RESTORATION KEY (-5 PTS).",

            false

        );


    }


}

