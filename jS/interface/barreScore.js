/* 
    Implementation de la logique du score dependant du temps
*/

export function lifeScore(actor) {
    document.querySelector('#life').innerHTML= `Life : <span>${actor.life}</span>` 
}