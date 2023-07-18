const randomWord = document.querySelector("#random-word")
const inputEl = document.querySelector('#user-word')
const scoreEl = document.querySelector('.score span')
const timeEl = document.querySelector(".time span")
const gameOver = document.querySelector(".game-over")
const restart = document.querySelector("#restart-btn")
const overlay = document.querySelector(".overlay")
const scoreEl2 = document.querySelector("#game-over__score span")
const playEl = document.querySelector(".play")
const playBtn = document.querySelector("#play-btn")
const userNameEl = document.querySelector("#user-name")
const countDownEl = document.querySelector(".count-down")
const userPointer = document.querySelector("#name-pointer")
const table = document.querySelector(".table__wrapper")
const tablePlayerEl = document.querySelectorAll(".table-player")
const tableRecordEl = document.querySelectorAll(".table-record")
const showTableBtn = document.querySelector("#show-table-btn")
const hideTableBtn = document.querySelector(".table-btn")
const recordPointer = document.querySelector(".record-pointer span")


let userName
let players = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : []
getPlayers()
// Set players to localStorage
function setPlayers() {
  localStorage.setItem("data", JSON.stringify(players))
}

// Get players from localStorage 
function getPlayers() {
  players.forEach((item, i) => {
    tablePlayerEl[i].textContent = item.player
    tableRecordEl[i].textContent = item.score
  })

}

// push player to players 
function pushPlayer() {
  let playerChanged = false
  if (players.length) {
    players.forEach((item) => {
      if (item.player == userName && item.score < counter) {
        item.score = counter
        playerChanged = true
      } else if (item.player == userName && item.score > counter) {
        playerChanged = true
      }
    })
  } else {
    players.push({
      player: userName,
      score: counter

    })
    playerChanged = true
  }

  if (playerChanged == false) {
    players.push({
      player: userName,
      score: counter
    })
  }

  players.sort((a, b) => b.score - a.score)

}

// record pointer 
function pointRecord() {
  let hasRecord = false

  players.forEach((item) => {
    if (item.player == userName && item.score > counter) {
      recordPointer.textContent = item.score
      hasRecord = true
    } else if (item == userName && item.score < counter) {
      recordPointer.textContent = counter
    }

    if (hasRecord = false) {
      recordPointer.textContent = counter
    }
  })

}

playBtn.addEventListener('click', () => {
  playEl.classList.toggle("hidden")
  countDownEl.classList.toggle("hidden")

  let countDown = 3
  const countDownInterval = setInterval(() => {
    if (countDown > 0) {
      countDown--
      countDownEl.textContent = countDown
    } else {
      clearInterval(countDownInterval)
      countDownEl.remove()
      overlay.classList.toggle('hidden')
      inputEl.focus()
      restartGame()
      removeGameOver()
      pointRecord()
      userName = userNameEl.value
      userPointer.textContent = userName
    }


  }, 1000)


})


let random
let counter = 0
let time = 10
function changeWord() {
  random = words[Math.floor(Math.random() * words.length)]
  randomWord.textContent = random
}
changeWord()


inputEl.addEventListener('input', e => {
  let userWord = e.target.value

  if (userWord == random) {
    inputEl.value = ''
    changeWord()
    counter++
    scoreEl.textContent = counter
    time += 3
    pointRecord()

  }
})


function restartGame() {
  time = 11
  const timeInterval = setInterval(() => {
    if (time > 0) {
      time--
      timeEl.textContent = `${time}s`
    } else {
      clearInterval(timeInterval)
      gameOver.classList.remove('hidden');
      overlay.classList.remove('hidden');
      scoreEl2.textContent = counter

      // add to localStorage 
      pushPlayer()
      setPlayers()
      getPlayers()


    }
  }, 1000)
}



function addGameOver() {
  gameOver.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  table.classList.add('hidden')
  inputEl.focus()
  inputEl.value = ''
  counter = 0
  scoreEl.textContent = counter
  restartGame()
}

function removeGameOver() {
  [restart, overlay].forEach((element) => {
    element.addEventListener('click', () => {
      addGameOver()
    })
  })

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape" || e.key == "Enter") {
      addGameOver()
    }
  })
}

showTableBtn.addEventListener('click', () => {
  table.classList.remove("hidden")
})


hideTableBtn.addEventListener("click", () => {
  table.classList.add('hidden')
})
