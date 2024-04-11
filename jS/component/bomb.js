import { originGrid } from "./grid.js"

export class Bomb {
    constructor() {
        delay: 2000 //en millisecond
    }

    poserBomb(position) {
        const divs = document.querySelector('main').querySelectorAll('div')
        const iconBomb = document.createElement('img')
        iconBomb.src = "assets/bomb/bomb.png"
        iconBomb.className = "bomb"
        if (divs[position].innerHTML == '') {
            divs[position].appendChild(iconBomb)
        }
        setTimeout(() => {
            this.#exploserBomb(divs, position)

        }, 2000)
    }

    #boom(node) {
        node.textContent = '💥'
        requestAnimationFrame(() => {
            this.#animateExplo(node, 25)
        })
        setTimeout(() => {
            node.textContent = ''
            node.className = 'c'
        }, 100)
    }

    #exploserBomb(nodes, position) {
        nodes[position].removeChild(nodes[position].firstChild)
        // mis a jour des formes a droite
        console.log(nodes[position + 1].classList);
        if (nodes[position + 1].className == 'c' || nodes[position + 1].className == 'm') {
            this.#boom(nodes[position + 1])
            originGrid[Math.floor((position + 1) / 15)][(position + 1) % 15] = 'c'
        } 
        if (nodes[position - 1].className == 'c' || nodes[position - 1].className == 'm') {
            this.#boom(nodes[position-1])
            originGrid[Math.floor((position - 1) / 15)][(position - 1) % 15] = 'c'
        }
        if (nodes[position - 15].className == 'c' || nodes[position - 15].className == 'm') {
            console.log(Math.floor((position - 15) / 15), (position - 15) % 15, originGrid[Math.floor((position - 15) / 15)][(position - 15) % 15]);
            originGrid[Math.floor((position - 15) / 15)][(position - 15) % 15] = 'c'
            this.#boom(nodes[position - 15])
        } 
        if (nodes[position + 15].className == 'c' || nodes[position + 15].className == 'm') {
            console.log(Math.floor((position + 15) / 15), (position + 15) % 15, originGrid[Math.floor((position + 15) / 15)][(position + 15) % 15]);
            originGrid[Math.floor((position + 15) / 15)][(position + 15) % 15] = 'c'
            this.#boom(nodes[position + 15])
        }
    }

    #animateExplo(node, taille) {
        taille += 5
        node.style.fontSize = `${taille}px`
        if (taille < 40) {
            requestAnimationFrame(() => {
                this.#animateExplo(node, taille)
            })
        }
    }
}