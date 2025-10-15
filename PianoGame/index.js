const body = document.querySelector('.body');
const buttons = ['a', 's', 'd', 'f', 'g', 'h', 'j'];
let char = -1;

function initButtons() {
    for (let i = 0; i < 7; i++) {
        let note = document.createElement('div');
        note.classList.add('note');
        body.appendChild(note);
    }
}

function playNote() {
    let notes = document.querySelectorAll('.note')
    for (let j = 1; j < notes.length + 1; j++) {
        notes[j - 1].addEventListener('click', e => {
            let audio = new Audio(`notes/${j}.mp3`);
            audio.play();
        })
    }
}

function PressNote() {
    document.addEventListener('keydown', e => {
        char = buttons.indexOf(e.key);
        if (char != -1) {
            let audio = new Audio(`notes/${char + 1}.mp3`);
            audio.play();
        }
    })
}

PressNote()
initButtons();
playNote();