import { grid } from "./component/grid.js";
import { Avatar } from "./component/avatar.js";

grid();

let actor = new Avatar()
actor.addAvatarInGrid(16);

const avatar = document.querySelector('main div img')


document.addEventListener('keydown', (e) => {
    actor.move(avatar, e.key)
})

document.addEventListener('keyup', () => {

})
