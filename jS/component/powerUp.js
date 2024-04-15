export function ajoutPowersUp() {
    const murs = document.querySelectorAll('.m')
    murs[0].dataset.powerUp = 'bombe'
    for (let i = 0; i < 5; i++) {
        murs[Math.floor(Math.random()*(murs.length-1))+1].dataset.powerUp = 'bombe'
    }
}