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
        nodes[position].removeChild(nodes[position].firstChild) 
        
        const avatar = nodes[0].firstChild
        let xyActor = avatar.style.transform.match(/(-?\d+(?:\.\d+)?)/g)
        let xAct = parseInt(xyActor[0]) , yAct = parseInt(xyActor[1])
        console.log((((yAct+40) / 40) * 16) + (xAct / 40) - (yAct/40) - 16)
        let actorPos = (((yAct+40) / 40) * 16) + (xAct / 40) - (yAct/40) - 16
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
        if (actorPos == position+1 || actorPos == position-1 || actorPos == position + 15 || actorPos == position - 15 || actorPos == position) {
            actor.life--
            lifeScore(actor)
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