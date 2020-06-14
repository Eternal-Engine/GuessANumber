const msgEl = document.getElementById('msg');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();


//The Game started
recognition.start();

//Generate Random Number
const getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
}

const randomNum = getRandomNumber();

//Capturing User Voice
const onSpeak = (e) => {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

//Write Message
const writeMessage = (msg) => {
    msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
    `;
}

//Check Number
const checkNumber = (msg) => {
    const num = +msg;

    //Checking if the guess is a valid number
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div> That is not a valid number</div>';
        return;
    }

    //check in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 - 100!</div>';
        return;
    }

    //Check number
    if(num === randomNum) {
        document.body.innerHTML = `<h2>
        JACKPOT!!! You got the number right!! 
        <br>
        <br>
        It was ${num}
        </h2>
        <button class="play-again" id="play-again">Play again?</button>
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER, you guessed too high!!</div>';
    } else {
        msgEl.innerHTML += '<div>GO HIGHER buddy! Your number is too low!!</div>';
    }
}


console.log(`Number: ${randomNum}`);
//Speak Result
recognition.addEventListener('result', onSpeak);

//Play again
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});