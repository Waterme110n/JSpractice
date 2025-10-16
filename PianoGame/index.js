const body = document.querySelector('.body');
const buttons = ['a', 's', 'd', 'f', 'g', 'h', 'j'];
const pianino = document.querySelector('.pianino');
let charNumber = -1;
let Song = document.getElementById('dificulty');
let start = document.querySelector('.startgame');
let statusP = document.querySelector('.status')
let notes = [];
let playTimeouts = [];
let dropDowns;
const happybithday = [
    [0, 500], [0, 500], [1, 1000], [0, 1000], [3, 1000], [2, 1000],
    [0, 500], [0, 500], [1, 1000], [0, 1000], [4, 1000], [3, 1000],
    [0, 500], [0, 500], [0, 500], [5, 1000], [3, 1000], [2, 1000], [1, 1000],
    [6, 500], [6, 500], [5, 1000], [3, 1000], [4, 1000], [3, 1000]]



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

function PlaySong(songArr) {
    let totalDelay = 0;

    for (let i = 0; i < songArr.length; i++) {
        const noteIndex = songArr[i][0];
        const delay = songArr[i][1];

        totalDelay += delay;

        playTimeout = setTimeout(() => {
            let dropElement = document.createElement('div');
            dropElement.classList.add('dropElement');

            const notesPosition = notes[noteIndex].getBoundingClientRect();
            dropElement.style.left = notesPosition.left + 10 + 'px';
            dropElement.style.top = notesPosition.top + 'px';
            dropElement.style.width = notesPosition.width - 20 + 'px';
            dropElement.style.transform = 'translateY(-1000px)';

            body.appendChild(dropElement);
            getComputedStyle(dropElement).transform;

            dropElement.style.transform = 'translateY(1000px)';

            if (i == songArr.length - 1) {
                setTimeout(() => {
                    start.style.backgroundColor = '#dbe2ef';
                    start.textContent = 'Start';
                    statusP.textContent = 'Choоse your level';
                    dropDowns = document.querySelectorAll('.dropElement');
                    dropDowns.forEach(el => {
                        el.remove();
                    })
                }, 7000);
            }

        }, totalDelay);
        playTimeouts.push(playTimeout);

    }
}



function chooseSong() {

    switch (Song.value) {
        case 'free': {
            break;
        }
        case 'hb': {
            PlaySong(happybithday);
            break;
        }
    }
}

initButtons();
playNote();

start.addEventListener('click', e => {
    let button = document.querySelector('.startgame');
    if (button.textContent == 'Start') {
        button.style.backgroundColor = 'red';
        button.textContent = 'Stop';
        statusP.textContent = 'Playing...';
        chooseSong();
    } else {
        button.style.backgroundColor = '#dbe2ef';
        button.textContent = 'Start';
        statusP.textContent = 'Choоse your level';
        dropDowns = document.querySelectorAll('.dropElement');
        dropDowns.forEach(el => {
            el.remove();
        })
        playTimeouts.forEach(playTimeout => {
            clearTimeout(playTimeout);
        });
    }
});

//можно сделать чтобы ловились летящие кубики + pointы
//доделать меню на кнопку динамичную stop/start меняется text


