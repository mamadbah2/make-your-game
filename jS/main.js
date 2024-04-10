import { grid } from "./component/grid.js";
import { Avatar } from "./component/avatar.js";
import { Bomb } from "./component/bomb.js";


grid();

let actor = new Avatar()
let boom = new Bomb()
actor.addAvatarInGrid({i : 1, j : 1}, 'Actor');
const avatarActor = document.getElementById("avatarActor")
console.log(avatarActor);

document.addEventListener('keyup', (e) => {
    if (e.key == ' ') {
        let position = (((actor.posY+40) / 40) * 16) + (actor.posX / 40) - (actor.posY/40)
        console.log(position);
        boom.poserBomb(position)

    } else {
        actor.move(avatarActor, e.key)
    }
})

document.addEventListener('space', () => {

})
