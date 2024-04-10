export class Bomb {
    constructor() {
        delay : 2000 //en millisecond
    }

    poserBomb(position) {
        const divs = document.querySelector('main').querySelectorAll('div')
        const iconBomb = document.createElement('img')
        iconBomb.src = "assets/bomb/bomb.png"
        iconBomb.className = "bomb"
        console.log(divs[position].innerHTML);
        if (divs[position].innerHTML == '' || divs[position].innerHTML.includes('avatar')) {
            divs[position].appendChild(iconBomb)
        }
    }
}