import { grid } from "./component/grid.js";
import { Avatar, ennemies, arrayOfGhost } from "./component/avatar.js";
import { Bomb } from "./component/bomb.js";
import { updateLifeScore, chronometre, domLifeScore } from "./interface/barreScore.js";

grid();
chronometre();

let actor = new Avatar(1, 1)
let boom = new Bomb()
actor.addAvatarInGrid('Actor', 'actor');
const avatarActor = document.getElementById("avatarActor");
domLifeScore(actor)

document.addEventListener('keydown', (e) => {
    if (e.key == ' ') { 
        console.log('nbre', actor.position());
        boom.poserBomb(actor.position(), actor)
    } else {
        actor.move(avatarActor, e.key)
        // On regarde tranquille si on a pas plongé sur un ennemi
        for (let i = 0; i < arrayOfGhost.length; i++) {
            if (arrayOfGhost[i].position() == actor.position() && arrayOfGhost[i].life != 0) {
                updateLifeScore(actor)
            }
        }
    }
}) 


ennemies(actor)