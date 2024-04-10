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

    #findValueCoordinates(array, value) {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j].includes(value)) {
                    return { i, j }; // Retourne les coordonnées de la cellule trouvée
                }
            }
        }
        return null; // Retourne null si la valeur n'est pas trouvée
    }

    #movingAnimation(animation, coordinate) {
        console.log(coordinate.i);
        originGrid[coordinate.i][coordinate.j] += ` ${animation} `
        // Retirez la classe après l'animation
        /* setTimeout(() => {
            element.classList.remove(animation);
        }, 1000); */ // Assurez-vous que ce délai correspond à la durée de l'animation CSS
    }

    addAvatarInGrid(nthDiv) {
        // Recuperation de l'ancienne coordonnee de l'avatar avec coordinate
        const divs = document.querySelector('main').querySelectorAll('div')
        const iconAvatar = document.createElement('img')
        iconAvatar.id = `avatar${nthDiv}`
        iconAvatar.src = "./assets/avatar/avatar.png"
        divs[nthDiv].appendChild(iconAvatar)
    }

    move(avatar, key) {
        switch (key) {
            case 'ArrowUp':
                avatar.style.transform = `translate(${this.posX}px, ${this.posY-40}px)`
                this.posY -= 40
                break
            case 'ArrowDown':
                avatar.style.transform = `translate(${this.posX}px, ${this.posY+40}px)`
                this.posY += 40
                break
            case 'ArrowRight':
                avatar.style.transform = `translate(${this.posX+40}px, ${this.posY}px)`
                this.posX += 40
                break
            case 'ArrowLeft':
                avatar.style.transform = `translate(${this.posX-40}px, ${this.posY}px)`
                this.posX -= 40
                break
        }
    }
}

