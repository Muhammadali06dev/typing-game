const randomWord = document.querySelector("#random-word")
const inputEl = document.querySelector('#user-word')
const score = document.querySelector('.score span')
const timeEl = document.querySelector(".time span")
const gameOver = document.querySelector(".game-over")
const restart = document.querySelector("#restart-btn")
const overlay = document.querySelector(".overlay")
const score2 = document.querySelector("#game-over__score span")
const playEl = document.querySelector(".play")
const playBtn = document.querySelector("#play-btn")
const userName = document.querySelector("#user-name")
const countDownEl = document.querySelector(".count-down")
const userPointer = document.querySelector("#name-pointer")

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

      userPointer.textContent = userName.value
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
    score.textContent = counter
    score2.textContent = counter
    time += 4
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
      gameOver.classList.toggle('hidden');
      overlay.classList.toggle('hidden');
    }
  }, 1000)
}



function addGameOver() {
  gameOver.classList.toggle('hidden');
  overlay.classList.toggle('hidden');
  inputEl.focus()
  inputEl.value = ''
  counter = 0
  score.textContent = counter
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

