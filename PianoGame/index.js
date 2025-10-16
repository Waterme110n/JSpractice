const body = document.querySelector('.body');
const buttons = ['a', 's', 'd', 'f', 'g', 'h', 'j'];
const pianino = document.querySelector('.pianino');
let charNumber = -1;
let Song = document.getElementById('dificulty');
let start = document.querySelector('.startgame');
let statusP = document.querySelector('.status');
let pointP = document.querySelector('.points');
let notes = [];
let playTimeouts = [];
let dropDownQueue = []
let points = 0;
let dropDowns;
const happybithday = [
    [0, 500], [0, 500], [1, 1000], [0, 1000], [3, 1000], [2, 1000],
    [0, 500], [0, 500], [1, 1000], [0, 1000], [4, 1000], [3, 1000],
    [0, 500], [0, 500], [0, 500], [5, 1000], [3, 1000], [2, 1000], [1, 1000],
    [6, 500], [6, 500], [5, 1000], [3, 1000], [4, 1000], [3, 1000]];



function initButtons() {
    for (let i = 0; i < 7; i++) {
        let note = document.createElement('div');
        note.classList.add('note');
        note.innerText = buttons[i];
        pianino.appendChild(note);
        notes.push(note);
    }
}

function playNote() {
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

            pressButtonsThenDropDown(noteIndex, dropElement);

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



function pressButtonsThenDropDown(dropElementNote, dropElement) {
    dropDownQueue.unshift([dropElementNote, dropElement]);
    setTimeout(e => { //до области нажатия
        let everytic = setInterval(e => {
            const notesPos = notes[dropElementNote].getBoundingClientRect();
            let elPos = dropElement.getBoundingClientRect();

            if (notes[dropElementNote].classList.contains('hover')) {
                const sameNoteElements = dropDownQueue.filter(el => el[0] == dropElementNote);
                const lastEl = sameNoteElements[sameNoteElements.length - 1];
                if (notesPos.top + 10 < elPos.top && notesPos.bottom - 20 < elPos.bottom) {
                    points += 25;
                }
                if (lastEl && lastEl[1] == dropElement) {
                    let index = dropDownQueue.findIndex(el => el.dropElement === dropElement);
                    dropElement.remove();
                    setTimeout(() => {
                        dropDownQueue.splice(index, 1);
                    }, 40);
                    points += 25;
                    pointP.textContent = points;
                }
            }
        }, 50);
        setTimeout(e => { clearInterval(everytic) }, 950) // конец области нажатия
    }, 4600)
}

initButtons();
playNote();

start.addEventListener('click', e => {
    let button = document.querySelector('.startgame');
    if (button.textContent == 'Start') {
        pointP.textContent = 0;
        points = 0;
        button.style.backgroundColor = 'red';
        button.textContent = 'Stop';
        statusP.textContent = 'Playing...';
        chooseSong();
    } else {
        dropDownQueue = [];
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

