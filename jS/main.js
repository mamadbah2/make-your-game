import { grid } from "./component/grid.js";
import { Avatar } from "./component/avatar.js";

grid();

let actor = new Avatar(1,1)

actor.addAvatarInPosition();

grid();

document.addEventListener('keydown', (e) => {
    actor.move(e.key)

})

document.addEventListener('keyup', () => {
    actor.addAvatarInPosition()
    grid()
    // setTimeout(()=> {
    //     grid()
    // }, 1000)
})
