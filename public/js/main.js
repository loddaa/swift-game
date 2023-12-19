let buttons = document.getElementsByTagName('button')
let buttonsArray = Array.from(buttons)
let buttonsArrayCopy;

let LEVEL1 = 3
let LEVEL2 = 5
let LEVEL3 = 7
let LEVEL4 = 10

let random;
let buttonsToPush = [];
let buttonPushed = [];
let score = 0;

function randomButtons(level) {
    buttonsArrayCopy = buttonsArray.slice();
    buttonsToPush = [];

    for (let i = 0; i < level; i++) {
        random = Math.floor(Math.random() * buttonsArrayCopy.length)
        buttonsToPush.push(buttonsArrayCopy[random])
        buttonsArrayCopy.splice(random, 1)
    }
}

function playerLevel(score) {
    if (score <= 2) {
        return LEVEL1
    } else if (score > 2 && score <= 4) {
        return LEVEL2
    } else if (score > 4 && score <= 6) {
        return LEVEL3
    } else if (score > 6 && score <= 8) {
        return LEVEL4
    } else {
        return LEVEL1
    }
}


function game(level) {
    buttonsToPush = [];
    buttonPushed = [];

    console.log({score})
    console.log({level})
    
    randomButtons(level);
    buttonsArray.forEach((btn) => {
        btn.classList.remove('pushed')
        btn.classList.remove('to-push');
    })
    buttonsToPush.forEach((button) => {
        button.classList.add('to-push')
    })


    let randomButtonInterval = setInterval(() => {
        randomButtons(level);
        buttonsArray.forEach((btn) => {
            btn.classList.remove('pushed')
            btn.classList.remove('to-push');
        })
        buttonsToPush.forEach((button) => {
            button.classList.add('to-push')
        })
    }, 4000);

    document.addEventListener('click', function push(e) {
        if (e.target == buttonsToPush.find((el) => el == e.target)) {
            e.target.classList.add('pushed')
            buttonPushed.push(e.target)
            console.log('well done')
        } else {
            console.log('Loss')
            score = 0
            document.removeEventListener('click', push)
            clearInterval(randomButtonInterval)
            game(LEVEL1)
        }

        if (buttonPushed.length == buttonsToPush.length) {
            document.removeEventListener('click', push)
            clearInterval(randomButtonInterval)
            score++
            setTimeout(() => {
                game(playerLevel(score))
            }, 200);
        }
    })
}

game(LEVEL1)
