let birdsDisplay = document.querySelector('.birds');
let addBirdForm = document.querySelector('.bird-form');
let nameInput = document.querySelector('.name');
let colorAddInput = document.querySelector('.add-more-colors')


let displayBirds = (data) => {
    localStorage.setItem('birdInfo', JSON.stringify(data));
    console.log(data);
    for (bird in data) {
        console.log(bird);
        let birdDisplay = document.createElement('div');
        birdDisplay.textContent = bird + " " + (data[bird].color || 'colorless bird');
        birdsDisplay.appendChild(birdDisplay);
    }
}

let createColorInputs = () => {
    let colors = document.querySelector('.colors')
    let newColorInput = document.createElement('input');
    newColorInput.classList.add('color');
    newColorInput.setAttribute('type', 'text');
    newColorInput.setAttribute('placeholder', 'type color here');
    colors.appendChild(newColorInput);
}


colorAddInput.addEventListener('click', createColorInputs);


let addColor = (event) => {
    event.preventDefault();
    let colorInputs = document.querySelectorAll('.color')
    let colors = [];
    for (colorInput of colorInputs) {
        colors.push(colorInput.value);
    } 
    let data = {
        name: nameInput.value,
        color: colors
    }
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('/colors', {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(displayBirds)
    // input.value
}


addBirdForm.addEventListener('submit', addColor)


fetch('/test')
    .then(res => res.text())
    .then(data => console.log(data))
    .catch(err => console.log(err))

fetch('/colors')
    .then(res => res.json())
    .then(displayBirds);