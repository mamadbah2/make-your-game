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
        iconAvatar.style.transition = "transform 100ms linear"
        divs[nthDiv].appendChild(iconAvatar)
    }

    move(avatar, key) {
        // Erreur de calcul... Les x et y ont été intervertis
        switch (key) {
            case 'ArrowUp':
                console.log((this.posX+40)/40, this.posY/40, originGrid[this.posY/40][(this.posX+40)/40]);
                if (originGrid[this.posY/40][(this.posX+40)/40] === 'c' ) {
                    avatar.style.transform = `translate(${this.posX}px, ${this.posY-40}px)`
                    this.posY -= 40
                }
                break
            case 'ArrowDown':
                console.log((this.posX+40)/40, (this.posY+80)/40, originGrid[(this.posY+80)/40][(this.posX+40)/40]);
                if (originGrid[(this.posY+80)/40][(this.posX+40)/40] === 'c') {
                    avatar.style.transform = `translate(${this.posX}px, ${this.posY+40}px)`
                    this.posY += 40
                }
                break
            case 'ArrowRight':
                console.log((this.posX+80)/40, "x", (this.posY+40)/40,"y ", originGrid[(this.posY+40)/40][(this.posX+120)/40]);
                if (originGrid[(this.posY+40)/40][(this.posX+80)/40] === 'c') {
                    avatar.style.transform = `translate(${this.posX+40}px, ${this.posY}px)`
                    this.posX += 40
                }
                break
            case 'ArrowLeft':
                console.log((this.posX)/40, "x", this.posY+40/40,"y ", originGrid[(this.posY+40)/40][(this.posX)/40]);
                if (originGrid[(this.posY+40)/40][this.posX/40] === 'c') {
                    avatar.style.transform = `translate(${this.posX-40}px, ${this.posY}px)`
                    this.posX -= 40
                }
                break
        }
    }
}

