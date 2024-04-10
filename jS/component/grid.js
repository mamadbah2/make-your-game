export let originGrid = [
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
    ['b', 'c', 'c', 'c', 'c', 'm', 'm', 'c', 'm', 'c', 'c', 'c', 'c', 'c', 'b'],
    ['b', 'c', 'b', 'c', 'b', 'm', 'b', 'm', 'b', 'c', 'b', 'c', 'b', 'c', 'b'],
    ['b', 'c', 'c', 'c', 'm', 'c', 'm', 'm', 'm', 'm', 'c', 'c', 'c', 'c', 'b'],
    ['b', 'c', 'b', 'm', 'b', 'm', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b'],
    ['b', 'c', 'm', 'm', 'm', 'c', 'm', 'm', 'm', 'm', 'm', 'c', 'c', 'c', 'b'],
    ['b', 'm', 'b', 'm', 'b', 'm', 'b', 'm', 'b', 'c', 'b', 'c', 'b', 'c', 'b'],
    ['b', 'c', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'c', 'b'],
    ['b', 'm', 'b', 'c', 'b', 'm', 'b', 'm', 'b', 'm', 'b', 'c', 'b', 'c', 'b'],
    ['b', 'm', 'm', 'm', 'm', 'm', 'm', 'm', 'c', 'c', 'c', 'c', 'c', 'c', 'b'],
    ['b', 'm', 'b', 'm', 'b', 'm', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b'],
    ['b', 'c', 'c', 'c', 'm', 'c', 'm', 'm', 'c', 'c', 'c', 'c', 'c', 'c', 'b'],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'],
]

export function 
grid() {
    /* 
        b -> bloc, m -> mur, c -> chemin
    */

    const main = document.querySelector('main')
    // On enleve tout le contenu de main
    main.innerHTML = ''
    for (let i = 0; i < originGrid.length; i++) {
        for (let j = 0; j < originGrid[i].length; j++) {
            const div = document.createElement('div')
            div.className = originGrid[i][j]
            main.appendChild(div)
        }
    }
}