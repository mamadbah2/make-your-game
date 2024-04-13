/* 
    Implementation de la logique du score dependant du temps
*/

export function updateLifeScore(actor) {
    setTimeout(()=> {
        actor.life--
        domLifeScore(actor)
    },100)
}

export function domLifeScore(actor) {
    document.querySelector('#life').innerHTML= `Life : <span>${actor.life}</span>` 

}

function ajusterADeuxChiffres(nombre) {
    return nombre < 10 ? '0' + nombre : nombre+'';
}

export function chronometre() {
    let secondes = 0;
    let minutes = 0;
    
    setInterval(()=> {
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
            `Time : <span> ${ajusterADeuxChiffres(minutes)}:${ajusterADeuxChiffres(secondes)} </span> `;
    }, 1000);
}