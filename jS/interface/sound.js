
function launch() {
    window.location.href = 'game.html';
}
function showHelp() {
    alert("Contrôles : Utilisez les touches directionnelles (haut, bas, gauche, droite) pour déplacer le personnage Bomberman à travers le niveau.\n Appuyez sur la touche espace pour placer une bombe à l'emplacement actuel de Bomberman.\n Utilisez la touche eschape pour une pause");
}


function soundHome() {
    const playButton = document.querySelector('#playButton');
    const button1 = document.querySelector('.button1');

    playButton.addEventListener('click', launch);
    button1.addEventListener('click', showHelp);
}
if (window.location.href == 'http://127.0.0.1:5500/') {
    soundHome();
}
export function playSound(titleSound) {
    const audio = new Audio('../../assets/soundEffect/' + titleSound);
    audio.play();

}

