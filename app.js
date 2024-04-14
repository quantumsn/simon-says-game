let gameSequence = [];
let userSequence = [];

let gameStarted = false;
let level = 0;
let highScore = 0;

let body = document.querySelector("body");
let h1 = document.querySelector("h1");
let h4 = document.querySelector("h4");
let innerDivs = document.querySelectorAll(".inner-divs");

document.addEventListener("keypress", function() {
    if (gameStarted == false) {
        gameStarted = true;
        levelUp();
    }
});

function levelUp() {
    userSequence = [];
    level++;
    h4.innerText = (`Level : ${level}`);
    h1.innerText = "Simon Game";
    gameBlink();
}

function randomNum() {
    let index = Math.floor(Math.random() * 4);
    return index;
}

function gameBlink() {
    let num = randomNum();
    innerDivs[num].classList.add("blink");
    setTimeout(function() {
    innerDivs[num].classList.remove("blink");
    }, 300);

    let attr = innerDivs[num].getAttribute("id");
    gameSequence.push(attr);
    console.log(gameSequence);
}

function userBlink(btn) {
    btn.classList.add("user-blink");
    setTimeout(function() {
        btn.classList.remove("user-blink");
    },250);
}

for(btn of innerDivs) {
    btn.addEventListener("click", function() {
        let btn = this;
        let add = this.getAttribute("id");
        userSequence.push(add);
        userBlink(btn);
        checking(userSequence.length-1);
    });
}

function checking(idx) {
    if(gameSequence[idx] == userSequence[idx]) {
        if(gameSequence.length == userSequence.length) {
            setTimeout(levelUp(),5000);
        }
    } else {
        h1.innerText = "Game Over !";
        h4.innerHTML = `<b>YOUR SCORE : ${level}<br> Highest Score : ${highScore=level}</b><br>For start again to press any key on your keyboard.`;
        body.classList.add("game-over");
        setTimeout(function() {
            body.classList.remove("game-over");
        },500);
        resetGame();
    }
}

function resetGame() {
    level = 0;
    gameStarted = false;
    gameSequence = [];
    userSequence = [];
}