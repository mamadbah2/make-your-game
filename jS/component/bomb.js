import { originGrid } from "./grid.js"
import { lifeScore } from "../interface/barreScore.js"

export class Bomb {
    constructor() {
        this.max = 30
        this.delay = 2000 // en milliseconde
    }


    canCall = true
    poserBomb(position, actor) {
        if (!this.canCall) {
            console.log("Trop tot boy");
            return
        }

        if (this.max > 0) {
            const divs = document.querySelector('main').querySelectorAll('div')
            const iconBomb = document.createElement('img')
            iconBomb.src = "assets/bomb/bomb.png"
            iconBomb.className = "bomb"
            if (divs[position].innerHTML == '') {
                divs[position].appendChild(iconBomb)
            }
            setTimeout(() => {
                this.#exploserBomb(divs, position, actor)
    
            }, this.delay)
            this.max--;
        } else {
            alert("Stock de bombe épuisé")
        }
        /* Logique Debounce : est une technique utilisée pour limiter la
         fréquence à laquelle une fonction peut être appelée  */
        this.canCall = false
        setTimeout(()=>{
            this.canCall = true
        }, this.delay)
    }

    #exploserBomb(nodes, position, actor) {
        // On enleve d'abord la bombe
        nodes[position].removeChild(nodes[position].firstChild) 

        // On recupere tous les avatars et leur position
        const allAvatar = nodes[0].querySelectorAll('img')
        let avatarPos = []
        for (let i = 0; i < allAvatar.length; i++) {
            let xyAvatar = allAvatar[i].style.transform.match(/(-?\d+(?:\.\d+)?)/g)
            let xAvat = parseInt(xyAvatar[0]) , yAvat = parseInt(xyAvatar[1])
            avatarPos.push((((yAvat+40) / 40) * 16) + (xAvat / 40) - (yAvat/40) - 16)
        }

        // Cassage des murs etc
        this.#boom(nodes[position])
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
        // On diminue la vie du joueur s'il se trouve dans le champ de porté
        let actorPos = avatarPos[0]
        if (actorPos == position+1 || actorPos == position-1 || actorPos == position + 15 || actorPos == position - 15 || actorPos == position) {
            actor.life--
            lifeScore(actor)
        }

        // On kill l'ennemi s'il est dans les parages, à i=0 on l'acteur 
        for (let i = 1; i < avatarPos.length; i++) {
            if (avatarPos[i] == position+1 || avatarPos[i] == position-1 || avatarPos[i] == position + 15 || avatarPos[i] == position - 15 || avatarPos[i] == position ) {
                allAvatar[i].remove()
            }
        }
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