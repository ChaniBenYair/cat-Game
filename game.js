// ===================הפעלת המשחק וחזרה על האנימציות=================

function start() {
    document.getElementById("rekaAudio").play();
    setInterval(createCloud, 8000);
    setInterval(moveCloud, 10);
    setInterval(createRock, 2000);
    setInterval(moveRock, 7);
    setInterval(createMouse, 1500);
    setInterval(moveMouse,5);
    
}
// ========================קפיצת החתולה ובדיקה אם היתה התנגשות באבן או בעכבר=====================
let catPosition = 0; // Initialize the cat position variable
let score = 0; // Initialize the score variable

document.addEventListener('keydown', function (event) {
    var keyCode=event.code;
    if (keyCode == "ArrowUp") { // If the up arrow key is pressed
        jump();
        setTimeout(() => {
            jumpd();
        }, 300);
    }
});
    
function jump() {
    catPosition = 250;
    let cat = document.getElementById("cat");
    cat.style.bottom = catPosition + "px";
    cat.style.transition="all 0.2s";
}

function jumpd() {
    catPosition = 55;
    let cat = document.getElementById("cat");
    cat.style.bottom = catPosition + "px";
    cat.style.transition="all 0.2s";
}      
// ===================יצירת והזזת האבנים=================
function createRock() {
    let rock = document.createElement("img");
    rock.setAttribute("src", "rock.png");
    rock.setAttribute("class", "rock");
    rock.style.left = "3000px";
    rock.style.top = "80%"; 
    document.body.appendChild(rock);
}

function moveRock() {
    let rocks = document.getElementsByClassName("rock");
    for (let i = 0; i < rocks.length; i++) {
        let rock = rocks[i];
        let rockPosition = parseInt(rock.style.left) || 0;
        rock.style.left = rockPosition - 5 + "px";
        if (rockPosition==470&&catPosition<=55) {
            document.getElementById("oops").play();
            setTimeout(() => {
            window.location.href="gameOver.html";
                
            }, 300);
        }
    }
}
// ========================יצירת והזזת העכברים=================
function createMouse() {
    let mouse = document.createElement("img");
    mouse.setAttribute("src", "mouse.png");
    mouse.setAttribute("class", "mouse");
    mouse.style.left = "2000px";
    document.body.appendChild(mouse);
    mouse.style.top = "77%";
}

function moveMouse() {
    let mice = document.getElementsByClassName("mouse");
    for (let i = 0; i < mice.length; i++) {
        let mouse = mice[i];
        let mousePosition = parseInt(mouse.style.left) || 0;
        mouse.style.left = mousePosition - 5 + "px";
        // mousePosition = parseInt(mouse.style.left) || 0;
        if (mousePosition==470&&catPosition<=55) {
            document.getElementById("food").play();
            incrementScore();
            mice[i].style.opacity = "0%";
            mice[i].classList.remove(); 
        }
    }
}


// ==================סוכם נקודות של אכילת עכברים==================
function incrementScore() {
    score++;
    let scoreElement = document.getElementById("score");
    scoreElement.innerHTML = ("Score: " + score);
}

// =================הזזת עננים=================
function createCloud() {
    var cloud = document.createElement("img");
    cloud.setAttribute("src", "cloud.png");
    cloud.setAttribute("class", "cloud");
    cloud.style.left = "2000px";
    cloud.style.top = "10%"; 
    document.body.appendChild(cloud);
}

function moveCloud() {
    var clouds = document.getElementsByClassName("cloud");
    for (var i = 0; i < clouds.length; i++) {
        var cloud = clouds[i];
        var cloudPosition = parseInt(cloud.style.left) || 0;
        cloud.style.left = cloudPosition - 1 + "px";
    }
}

function randomPosition() {
    return Math.floor(Math.random() * 400);
}
// =================טיימר====================
function timer(seconds) {
    let remainingTime = seconds;
    const intervalId = setInterval(() => {
        console.clear();
        console.log(`Remaining time: ${remainingTime} seconds`);
        document.querySelector("#timer").innerHTML = "00:"+remainingTime
        remainingTime--;
        if (remainingTime < 0) {
            window.location.href="gameOver.html";
        }
    }, 1000);
} timer(60);

