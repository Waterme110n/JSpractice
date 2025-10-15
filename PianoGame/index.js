const body = document.querySelector('.body');
const buttons = ['a', 's', 'd', 'f', 'g', 'h', 'j'];
const pianino = document.querySelector('.pianino');
let charNumber = -1;
let notes = '';

function initButtons() {
    for (let i = 0; i < 7; i++) {
        let note = document.createElement('div');
        note.classList.add('note');
        note.innerText = buttons[i];
        pianino.appendChild(note);
    }
}

function playNote() {
    notes = document.querySelectorAll('.note')
    for (let j = 1; j < notes.length + 1; j++) {
        notes[j - 1].addEventListener('click', e => {
            let audio = new Audio(`notes/${j}.mp3`);
            audio.play();
        })
    }
}

document.addEventListener('keydown', e => {
    charNumber = buttons.indexOf(e.key);
    if (charNumber != -1) {
        notes[charNumber].classList.add('hover');
        let audio = new Audio(`notes/${charNumber + 1}.mp3`);
        audio.play();
    }
})

document.addEventListener('keyup', e => {
    charNumber = buttons.indexOf(e.key);
    if (charNumber !== -1) {
        notes[charNumber].classList.remove('hover');
    }
});

initButtons();
playNote();