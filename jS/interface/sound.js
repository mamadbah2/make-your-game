let sound = false;

function launch() {
    window.location.href = 'game.html';
}
function showHelp() {
    alert("Contrôles : Utilisez les touches directionnelles (haut, bas, gauche, droite) pour déplacer le personnage Bomberman à travers le niveau. Appuyez sur la touche espace pour placer une bombe à l'emplacement actuel de Bomberman.");
}

const soundToggle = document.querySelector('#soundToggle');
const backgroundMusic = document.querySelector('#backgroundMusic');

window.onload = function() {
    const soundEnabled = localStorage.getItem("soundEnabled");
    if (soundEnabled === "true") {
        soundToggle.checked = true;
        backgroundMusic.play();
    } else {
        soundToggle.checked = false;
        backgroundMusic.pause();
    }
};

soundToggle.addEventListener('change', function() {
    if (this.checked) {
        backgroundMusic.play();
        localStorage.setItem("soundEnabled", "true");
    } else {
        backgroundMusic.pause();
        localStorage.setItem("soundEnabled", "false");
    }
});

// Vérifier le stockage local lors du chargement de la page


function soundHome() {
    const playButton = document.querySelector('#playButton');
    const button1 = document.querySelector('.button1');
    
    playButton.addEventListener('click', launch);
    button1.addEventListener('click', showHelp);

}
soundHome()
