const marioDefault = {
    x: 0,
    y: 100,
    width: 150,
    height: 150,
    lives: 3,
    immunity: false
};
let mario = {...marioDefault};
const marioImg = new Image();
marioImg.src = "./images/mario.png";

// marioImg.addEventListener("load", () => {
//   context.drawImage(marioImg, mario.x, mario.y, mario.width, mario.height);
// });

const bombDefault = {
    x: 800,
    y: 200,
    width: 70,
    height: 70
};

let bomb = {...bombDefault};

const bombImg = new Image();
bombImg.src = "./images/bomb.png";

// bombImg.addEventListener("load", () => {
//   context.drawImage(bombImg, bomb.x, bomb.y, bomb.width, bomb.height);
// });

let score = 0;

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
    };
  
    function startGame() {
        drawLoop();
        bomb = {...bombDefault};
        mario = {...marioDefault};
        score = 0;
    }}



const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");



// 1. set the background


const backgroundImage = new Image()
backgroundImage.src = './images/background.png';
//   context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

const drawBackground = () => {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    context.fillStyle = "yellow";
    context.fillRect(0, 0, canvas.width, canvas.height);
}


let firstImageX = canvas.width; //1200
let nextImageX = 0;
const width = backgroundImage.width
const height = backgroundImage.height
console.log(width, height)
console.log(backgroundImage)

const backgroundAnimation = () => {
    firstImageX--;
    if (firstImageX <= 0) {
        firstImageX = canvas.width;
    }
    nextImageX--;
    if (nextImageX < -canvas.width) {
        nextImageX = 0;
    }
    context.drawImage(backgroundImage, firstImageX, 0, 1920, 600);
    context.drawImage(backgroundImage, nextImageX, 0, 1920, 600);
}
//   let firstImageX = -canvas.height;
//   let nextImageX = 0;
//   const drawBackground = () => {
//     firstImageX++;
//     if (firstImageX >= canvas.height) {
//       firstImageX = -canvas.height;
//     }
//     nextImageX++;
//     if (nextImageX >= canvas.height) {
//       nextImageX = -canvas.height;
//     }
//     context.drawImage(backgroundImg, 0, firstImageX, canvasWidth, canvas.height);
//     context.drawImage(backgroundImg, 0, nextImageX, canvasWidth, canvas.height);
//   }

// 1.1 make score visible on the board
const drawScore = () => {

    context.fillStyle = "green";

    context.font = "25px Arial";

    context.fillText(`Score: ${score}`, 800, 50);
}




// 2. add images to canvas



const drawEverything = () => {
    backgroundAnimation()
    context.drawImage(marioImg, mario.x, mario.y, mario.width, mario.height);
    context.drawImage(bombImg, bomb.x, bomb.y, bomb.width, bomb.height);

    if (didCollide(mario, bomb)) {
        if (mario.lives === 0) {
            // alert("GAME OVER!");
            gameOver();
        }
    }
    // if (mario.lives > 0) {
    context.fillText(`Lives: ${mario.lives}`, 800, 80);
    drawScore();
    // }

};

const drawLoop = () => {
    //   console.log("hey");
    context.clearRect(0, 0, canvas.width, canvas.height);

    //   drawBackground();
    drawEverything();

    bomb.x -= 3;

    if (bomb.x < -bomb.width) {
        bomb.x = canvas.width;

        bomb.y = Math.random() * (canvas.height - bomb.height);
    }

    if (mario.lives > 0) {
        requestAnimationFrame(drawLoop);
    }
};

// player movements

document.addEventListener("keydown", (event) => {
    //   console.log(event.code);

    switch (event.code) {
        case "ArrowRight":
        case "KeyD":
            mario.x += 10;
            break;
        case "ArrowLeft":
        case "KeyA":
            if (mario.x > -2) mario.x -= 10;
            break;
        case "ArrowUp":
        case "KeyW":
            mario.y -= 10;
            break;
        case "ArrowDown":
        case "KeyX":
            mario.y += 10;
            break;
        default:
            console.log("Are you even moving?!?!");
    }
});

const didCollide = (mario, bomb) => {
    if (
        mario.x + mario.width - 50 < bomb.x ||
        mario.y > bomb.y + bomb.height ||
        bomb.x + bomb.width < mario.x ||
        mario.y + mario.height < bomb.y
    ) {
        if (bomb.x === 0) {
            score++;
        }
        return false;
    } else {
        if (mario.immunity === false) {
            mario.lives -= 1;
            switchImmunity();
        }
        return true;
    }
};

const switchImmunity = () => {
    mario.immunity = true;
    setTimeout(() => {
        mario.immunity = false;
    }, 1000);
};

const gameOver = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    const tiredCast = {
        x: 400,
        y: 250,
        width: 150,
        height: 150
    };

    const tiredCastImg = new Image();
    tiredCastImg.src = "./images/tired-cast.png";

    tiredCastImg.addEventListener("load", () => {
        context.drawImage(tiredCastImg, tiredCast.x, tiredCast.y, tiredCast.width, tiredCast.height);
    });

    context.fillStyle = "red";
    context.font = "70px Arial";

    context.fillText("GAME OVER!", 300, 200);
};

drawLoop();

