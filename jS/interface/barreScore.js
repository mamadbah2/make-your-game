/* 
    Implementation de la logique du score dependant du temps
*/

import { gameOver } from "./menuPause.js"

export let chronoId

export function updateLifeScore(actor) {
    gameOver(actor.life, "Vous n'avez plus de vie")
    setTimeout(() => {
        actor.life--
        domLifeScore(actor)
    }, 100)
}

export function updateScore() {
    const divScore = document.querySelector('#score span')
    let score = parseInt(divScore.textContent) 
    divScore.textContent = `${score+=10}`
}

export function domLifeScore(actor) {
    document.querySelector('#life').innerHTML = `Life : <span>${actor.life}</span>`

}

export function domNombreBombe(bomb) {
    document.querySelector('#nbBombe').innerHTML = `Bombes : <span>${bomb.max}</span>`
}

function ajusterADeuxChiffres(nombre) {
    return nombre < 10 ? '0' + nombre : nombre + '';
}

export function chronometre() {
    const span = document.querySelector("#chronometre span")
    let actualTime = span.textContent.split(':')
    let secondes = parseInt(actualTime[1]);
    let minutes = parseInt(actualTime[0]);

    chronoId = setInterval(() => {
        secondes++;

        if (secondes >= 60) {
            secondes = 0;
            minutes++;

            if (minutes >= 60) {
                minutes = 0;
                heures++;
            }
        }

        document.getElementById('chronometre').innerHTML =
            `Timer : <span> ${ajusterADeuxChiffres(minutes)}:${ajusterADeuxChiffres(secondes)} </span> `;
    }, 1000);
}
