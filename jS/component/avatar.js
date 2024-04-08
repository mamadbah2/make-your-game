/* Aller sur une logique Orientée Objet
    Class
        -propriete
        -methode
*/
import { originGrid } from "./grid.js"

export class Avatar {
    constructor(i, j) {
        this.posI = i
        this.posJ = j
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

    addAvatarInPosition() {
        // Recuperation de l'ancienne coordonnee de l'avatar avec coordinate
        let coordinate = this.#findValueCoordinates(originGrid, 'A')
        if (coordinate != null) {
            // if (coordinate.i != this.posI || coordinate.j != this.posJ) {
            originGrid[coordinate.i][coordinate.j] = 'c'

            originGrid[this.posI][this.posJ] += ' A '

            // }
        } else {
            originGrid[this.posI][this.posJ] += ' A '
        }
    }

    move(key) {
        switch (key) {
            case 'ArrowUp':
                this.#movingAnimation('move-up', { i: this.posI, j: this.posJ })
                this.posI -= 1
                break
            case 'ArrowDown':
                this.#movingAnimation('move-down', { i: this.posI, j: this.posJ })
                this.posI += 1
                break
            case 'ArrowRight':
                this.#movingAnimation('move-right', { i: this.posI, j: this.posJ })
                this.posJ += 1
                break
            case 'ArrowLeft':
                this.#movingAnimation('move-left', { i: this.posI, j: this.posJ })
                this.posJ -= 1
                break
        }
    }
}

