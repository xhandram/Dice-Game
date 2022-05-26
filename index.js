// Create variables for the game state
let dieImgs = ["https://i.imgur.com/T2gzHCt.png","https://i.imgur.com/L7P2x7P.png","https://i.imgur.com/ZxfpefR.png","https://i.imgur.com/nz4oPyE.png","https://i.imgur.com/I5Soyxs.png","https://i.imgur.com/GxZmRYz.png"]
let player1Score = 0
let player2Score = 0
let player1Turn = true

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const extBtn = document.getElementById("extBtn")
const warBtn = document.getElementById("warBtn")
const resetBtn = document.getElementById("resetBtn")
let randomNumber = ""

//event listeners
rollBtn.addEventListener("click", getRandomNumber)
extBtn.addEventListener("click", getRandomNumber)
warBtn.addEventListener("click", getRandomNumber)
resetBtn.addEventListener("click", reset)


getfirstPlayer()

function flipCoin() {
    return (Math.floor(Math.random()*2))
}

function getRandomNumber(e) {
    if(e.target.id == "extBtn"){
        let num = flipCoin()
        if (num) {
            randomNumber = 6
        } else {
            randomNumber = 1
        }
        rollDice();
       
    } else if (e.target.id == "warBtn") {
        document.querySelector("#player1 .burn-emoji").classList.remove("animate")
        document.querySelector("#player2 .burn-emoji").classList.remove("animate")
        void document.querySelector("#player1 .burn-emoji").offsetWidth;
        void document.querySelector("#player2 .burn-emoji").offsetWidth;
        
        let num = flipCoin()  
        if (num) {
            player1Score = ((player1Score-3) < 0)? 0 :  player1Score - 3
            player1Scoreboard.textContent = player1Score
            document.querySelector("#player1 .burn-emoji").classList.add("animate")
        } else {
           player2Score = (player2Score-3 < 0)? 0 :  player2Score - 3
           player2Scoreboard.textContent = player2Score
           document.querySelector("#player2 .burn-emoji").classList.add("animate")
        }
         player1Turn = !player1Turn
         checkEndOfGame()

         if (player1Turn) {
             player1Dice.classList.add("active")        
             player2Dice.classList.remove("active")
             player1Dice.classList.remove("anim-rotate")
             player2Dice.classList.add("anim-rotate")
             message.textContent = "🦄 Player 1 Turn"
         } else {
             player2Dice.classList.add("active")
             player1Dice.classList.remove("active")
             player1Dice.classList.add("anim-rotate")
             player2Dice.classList.remove("anim-rotate")
             message.textContent = "Player 2 Turn 🐉"
         } 
         
         
        
    } else {
        randomNumber = Math.floor(Math.random() * 6) + 1
        rollDice();
    }
    
}

function getfirstPlayer() {
    let coin = flipCoin()
    if (coin) {
        player1Turn = false;
        message.textContent = "Player 2 Start 🐉"
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
    } else {
        message.textContent = "🦄 Player 1 Start"
    }
}
function showResetButton() {
    rollBtns.style.display = "none"
    resetBtn.style.display = "block"
}

function rollDice() {
    if (player1Turn) {
        player2Dice.classList.remove("anim-rotate")
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.classList.add("anim-rotate")
        player1Dice.textContent = ""
        player1Dice.style.backgroundImage = `url('${dieImgs[(randomNumber-1)]}')`;
        player1Dice.classList.remove("active")        
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn 🐉"
    } else {
        player1Dice.classList.remove("anim-rotate")
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = ""
        player2Dice.classList.add("anim-rotate")
        player2Dice.style.backgroundImage = `url('${dieImgs[randomNumber-1]}')`;
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "🦄 Player 1 Turn"
    }
    checkEndOfGame()
    
    player1Turn = !player1Turn
}

function checkEndOfGame(){
    if (player1Score >= 20) {
        message.textContent = "🦄 Player 1 Won 🥳"
        showResetButton()
    }  else if (player2Score >= 20) {
        message.textContent = "🐉 Player 2 Won 🎉"
        showResetButton()
    }
}

function reset() {
    player1Score = 0
    player2Score = 0
    getfirstPlayer()
    player1Scoreboard.textContent = 0
    player2Scoreboard.textContent = 0
    player1Dice.textContent = "🦄"
    player2Dice.textContent = "🐉"
    message.textContent = "Player 1 Turn"
    resetBtn.style.display = "none"
    rollBtns.style.display = "flex"
    player2Dice.classList.remove("active")
    player1Dice.classList.add("active")
    player1Dice.style.backgroundImage = ""
    player2Dice.style.backgroundImage = ""
    getfirstPlayer()
}
