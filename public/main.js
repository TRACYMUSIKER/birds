let birdsDisplay = document.querySelector('.birds');
let addBirdForm = document.querySelector('.add-a-bird');
let input = document.querySelector('.new-birds');




let addBird = (event) => {
    event.preventDefault();
    input.value

}

addBirdForm.addEventListener('submit', addBird)


fetch('/test')
    .then(res => res.text())
    .then(data => console.log(data))
    .catch(err => console.log(err))

fetch('/colors')
    .then(res => res.json())
    .then(data => {
        // birds.textContent = data.bird + data[0].color;
        for (bird of data) {
            let birdDisplay = document.createElement('div');
            birdDisplay.textContent = bird.bird + " " + (bird.color || "");
            birdsDisplay.appendChild(birdDisplay);
        }
    });