import { grid } from "./component/grid.js";
import { Avatar, ennemies } from "./component/avatar.js";
import { Bomb } from "./component/bomb.js";
import { lifeScore } from "./interface/barreScore.js";


grid();

let actor = new Avatar(1, 1)
let boom = new Bomb()
actor.addAvatarInGrid('Actor', 'actor');
const avatarActor = document.getElementById("avatarActor");
ennemies()

lifeScore(actor)

document.addEventListener('keyup', (e) => {
    if (e.key == ' ') { 
        let position = ((( (actor.initY*40) + actor.posY) / 40) * 16) + (((actor.initX*40) +actor.posX) / 40) - (( (actor.initY*40) + actor.posY)/40)
        console.log('nbre', position);
        boom.poserBomb(position, actor)
    } else {
        actor.move(avatarActor, e.key)
    }
})

document.addEventListener('space', () => {

})
