import { originGrid } from "./grid.js"
import { updateLifeScore, updateScore } from "../interface/barreScore.js"
import { arrayOfGhost, intervalIDs } from "./avatar.js"
import { gameOver, winner } from "../interface/menuPause.js"
import { playSound } from "../interface/sound.js"

let deathCounter = 0
export class Bomb {
    constructor() {
        this.max = 5
        this.delay = 2000 // en milliseconde
    }


    canCall = true
    poserBomb(divs, position, actor) {
        if (!this.canCall) {
            console.log("Trop tot boy");
            return
        }

        if (this.max > 0) {
            const iconBomb = document.createElement('img')
            iconBomb.src = "assets/bomb/bomb.png"
            iconBomb.className = "bomb"
            if (divs[position].innerHTML == '') {
                divs[position].appendChild(iconBomb)
            }
            setTimeout(() => {
                this.#exploserBomb(divs, position, actor, arrayOfGhost)

            }, this.delay)
            this.max--;
        } else {
            gameOver(1, "Vous n'avez plus de bombe !!!")
        }
        /* Logique Debounce : est une technique utilisée pour limiter la
         fréquence à laquelle une fonction peut être appelée  */
        this.canCall = false
        setTimeout(() => {
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
            let xAvat = parseInt(xyAvatar[0]), yAvat = parseInt(xyAvatar[1])
            avatarPos.push((((yAvat + 40) / 40) * 16) + (xAvat / 40) - (yAvat / 40) - 16)
        }

        // jouer le son de l'exposion
        playSound('sound_bomb.mp3')

        // Cassage des murs etc
        this.#boom(nodes[position])
        if (nodes[position + 1].className == 'c' || nodes[position + 1].className == 'm') {
            this.#boom(nodes[position + 1])
            originGrid[Math.floor((position + 1) / 15)][(position + 1) % 15] = 'c'
        }
        if (nodes[position - 1].className == 'c' || nodes[position - 1].className == 'm') {
            this.#boom(nodes[position - 1])
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
        if (actorPos == position + 1 || actorPos == position - 1 || actorPos == position + 15 || actorPos == position - 15 || actorPos == position) {
            updateLifeScore(actor)
        }

        // On kill l'ennemi s'il est dans les parages, à i=0 on a l'acteur
        console.log('Avatar lenght', avatarPos);
        for (let i = 1; i < avatarPos.length; i++) {
            if (avatarPos[i] == position + 1 || avatarPos[i] == position - 1 || avatarPos[i] == position + 15 || avatarPos[i] == position - 15 || avatarPos[i] == position) {
                allAvatar[i].style.display = 'none'
                arrayOfGhost[i - 1].life = 0
                clearInterval(intervalIDs[i - 1])
                if (deathCounter === arrayOfGhost.length ){
                    winner()
                }
                deathCounter++
            }
        }
    }

    #boom(node) {
        node.textContent = '💥'
        if (node.className === 'm') updateScore()
        requestAnimationFrame(() => {
            this.#animateExplo(node, 25)
        })
    }

    #animateExplo(node, taille) {
        taille += 5
        node.style.fontSize = `${taille}px`
        if (taille < 45) {
            requestAnimationFrame(() => {
                this.#animateExplo(node, taille)
            })
        } else {
            node.className = 'c'
            node.style.fontSize = '35px'
            if (node.dataset.powerUp == 'bombe') {
                node.textContent = '💣'
            } else {
                node.textContent = ''

            }
        }
    }
}
