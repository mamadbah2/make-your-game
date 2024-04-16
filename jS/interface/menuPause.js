/* 
    Mettre un petit menu 
        continue
        restart
    et afficher quelque information comme score etc
*/
import { intervalIDs } from "../component/avatar.js";
import { argBombe, detonationID } from "../component/bomb.js";
import { boom, keyHandler } from "../main.js";
import { chronoId, chronometre } from "./barreScore.js";
export let pause= false


export function gameOver(lifeScore, message = '') {
    const divPause = document.getElementById('Pause')
    // J'sais pas pourquoi c'est toussss
    if (lifeScore <= 1) {
        for (let i = 0; i < intervalIDs.length; i++) {
            cancelAnimationFrame(intervalIDs[i])
        }
        pause = true
        clearInterval(chronoId)
        document.removeEventListener('keydown', keyHandler)
        document.querySelector('#chronometre').innerHTML = 'Time : <span>00:00</span> '
        showGameOverWindow(divPause, message)
        divPause.querySelector('#Restart').addEventListener('click', ()=> {
            location.reload()
        })
    }
}

export function pauseGame(actor) {
    const divPause = document.getElementById('Pause')
    pause = true
    for (let i = 0; i < intervalIDs.length; i++) {
        cancelAnimationFrame(intervalIDs[i])
    }

    clearInterval(chronoId)
    showPauseWindow(divPause)
    document.removeEventListener('keydown', keyHandler)
    clearTimeout(detonationID)

    divPause.querySelector('#Resume').addEventListener('click', ()=> {
        hidePauseWindow(divPause);
        document.addEventListener('keydown', keyHandler)
        pause = false
        boom.max++
        boom.poserBomb(...argBombe, actor)
        chronometre()
    })

    divPause.querySelector('#Restart').addEventListener('click', ()=> {
        location.reload()
    })
}

export function winner() {
    const divPause = document.getElementById('Pause')
    const score = document.querySelector('#score span')
    let valueScore = parseInt(score.textContent) 
    for (let i = 0; i < intervalIDs.length; i++) {
        cancelAnimationFrame(intervalIDs[i])
    }
    pause = true
    clearInterval(chronoId)
    showWinnerWindow(divPause, valueScore)
    document.removeEventListener('keydown', keyHandler)
    divPause.querySelector('#Restart').addEventListener('click', ()=> {
        location.reload()
    })
}

function showPauseWindow(div) {
    div.innerHTML = `
    <div class="cards">
    <button id="Resume" class="card red">
        <div >
            <p class="tip">Resume</p>
            <p class="second-text"><strong>Astuce : </strong> Calm Down Bro</p>
        </div>
    </button>
    <button id="Restart" class="card blue">
        <div>
            <p class="tip">Restart</p>
            <p class="second-text">Why not ?</p>
        </div>
    </button>
</div>
    `;
    div.style.display = "block"
}

function showGameOverWindow(div, message) {
    div.innerHTML = `
    <div class="cards">
    <h1 class='lose'>GAME OVER !</h1>
    <p> ${message} </p>
    <button id="Restart" class="card blue">
        <div>
            <p class="tip">Restart</p>
            <p class="second-text">Why not ?</p>
        </div>
    </button>
</div>
    `;
    div.style.display = "block"
}

function showWinnerWindow(div, score) {
    div.innerHTML = `
    <div class="cards">
    <h1 class='win'>!! WINNER !!</h1>
    <p><strong>Score </strong> : ${score}</p>
    <button id="Restart" class="card blue">
        <div>
            <p class="tip">Restart</p>
            <p class="second-text">Why not ?</p>
        </div>
    </button>
</div>
    `;
    div.style.display = "block"
}

function hidePauseWindow(div) {
    div.innerHTML = ''
    div.style.display = "none"
}
