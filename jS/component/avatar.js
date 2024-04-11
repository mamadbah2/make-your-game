/* Aller sur une logique Orientée Objet
    Class
        -propriete
        -methode
*/
import { originGrid } from "./grid.js"

export class Avatar {
    #blocSize = 40
    constructor(x, y) {
        this.initX = x
        this.initY = y
        this.posX = 0
        this.posY = 0
        this.life = 3
    }

    addAvatarInGrid(actorID) {
        // Recuperation de l'ancienne coordonnee de l'avatar avec coordinate
        const div = document.querySelector('main > div')
        const iconAvatar = document.createElement('img')
        iconAvatar.id = `avatar${actorID}`
        iconAvatar.src = "./assets/avatar/avatar.png"
        iconAvatar.style.transform = `translate(${this.initX * this.#blocSize}px, ${this.initY * 40}px)`
        iconAvatar.style.transition = "transform 100ms linear"
        div.appendChild(iconAvatar)
    }

    move(avatar, key) {
        // Erreur de calcul... Les x et y ont été intervertis
        let x0 = this.initX*this.#blocSize, y0 = this.initY*this.#blocSize
        switch (key) {
            case 'ArrowUp':
                console.log("y: ", this.posY/this.#blocSize, " x: ", (this.posX+this.#blocSize)/this.#blocSize)
                if (originGrid[this.posY/this.#blocSize][(this.posX+this.#blocSize)/this.#blocSize] === 'c' ) {
                    avatar.style.transform = `translate(${x0+this.posX}px, ${y0+this.posY-this.#blocSize}px)`
                    this.posY -= this.#blocSize
                }
                break
            case 'ArrowDown':
                console.log("y: ", (this.posY+80)/this.#blocSize, " x: ", (this.posX+this.#blocSize)/this.#blocSize)
                if (originGrid[(this.posY+80)/this.#blocSize][(this.posX+this.#blocSize)/this.#blocSize] === 'c') {
                    avatar.style.transform = `translate(${x0+this.posX}px, ${y0+this.posY+this.#blocSize}px)`
                    this.posY += this.#blocSize
                }
                break
            case 'ArrowRight':
                console.log("y: ", (this.posY+this.#blocSize)/this.#blocSize, " x: ", (this.posX+80)/this.#blocSize)
                if (originGrid[(this.posY+this.#blocSize)/this.#blocSize][(this.posX+80)/this.#blocSize] === 'c') {
                    avatar.style.transform = `translate(${x0+this.posX+this.#blocSize}px, ${y0+this.posY}px)`
                    this.posX += this.#blocSize
                }
                break
            case 'ArrowLeft':
                console.log("y: ", (this.posY+this.#blocSize)/this.#blocSize, " x: ", this.posX/this.#blocSize)
                if (originGrid[(this.posY+this.#blocSize)/this.#blocSize][this.posX/this.#blocSize] === 'c') {
                    avatar.style.transform = `translate(${x0+this.posX-this.#blocSize}px, ${y0+this.posY}px)`
                    this.posX -= this.#blocSize
                }
                break
        }
    }
}

