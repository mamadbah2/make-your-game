/* Aller sur une logique Orientée Objet
    Class
        -propriete
        -methode
*/
import { originGrid } from "./grid.js"

export class Avatar {
    constructor() {
        this.posX = 0
        this.posY = 0
        this.life = 3
    }

    addAvatarInGrid(coordinate, actorID) {
        // Recuperation de l'ancienne coordonnee de l'avatar avec coordinate
        /* this.posX = coordinate.i * 40
        this.posY = coordinate.j * 40 */
        const div = document.querySelector('main > div')
        const iconAvatar = document.createElement('img')
        iconAvatar.id = `avatar${actorID}`
        iconAvatar.src = "./assets/avatar/avatar.png"
        iconAvatar.style.transform = `translate(${coordinate.i * 40}px, ${coordinate.j * 40}px)`
        iconAvatar.style.transition = "transform 100ms linear"
        div.appendChild(iconAvatar)
    }

    move(avatar, key) {
        // Erreur de calcul... Les x et y ont été intervertis
        switch (key) {
            case 'ArrowUp':
                if (originGrid[this.posY/40][(this.posX+40)/40] === 'c' ) {
                    avatar.style.transform = `translate(${this.posX}px, ${this.posY-40}px)`
                    this.posY -= 40
                }
                break
            case 'ArrowDown':
                if (originGrid[(this.posY+80)/40][(this.posX+40)/40] === 'c') {
                    avatar.style.transform = `translate(${this.posX}px, ${this.posY+40}px)`
                    this.posY += 40
                }
                break
            case 'ArrowRight':
                if (originGrid[(this.posY+40)/40][(this.posX+80)/40] === 'c') {
                    avatar.style.transform = `translate(${this.posX+40}px, ${this.posY}px)`
                    this.posX += 40
                }
                break
            case 'ArrowLeft':
                if (originGrid[(this.posY+40)/40][this.posX/40] === 'c') {
                    avatar.style.transform = `translate(${this.posX-40}px, ${this.posY}px)`
                    this.posX -= 40
                }
                break
        }
    }
}

