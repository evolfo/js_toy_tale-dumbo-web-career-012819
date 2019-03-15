const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const divTag = document.querySelector('#toy-collection');

let addToy = false


// YOUR CODE HERE

const getAllToys = () => {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(allToys => {
      allToys.forEach(function(toy){
        createToyListHTML(toy);
      })
    })
}

document.addEventListener('DOMContentLoaded', function(event){
  getAllToys();
})

toyForm.addEventListener('click', (event) => {
  if (event.target.classList.value === "submit") {
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({name: event.target.parentElement.name.value, image: event.target.parentElement.image.value, likes: 0})
    })
  }
})

  divTag.addEventListener('click', (event) => {
    const pTag = event.target.parentElement.children[2];
    if (event.target.tagName === "BUTTON") {
      fetch(`http://localhost:3000/toys/${event.target.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({likes: parseInt(pTag.innerText) + 1})
      })
      .then(anything => {
        pTag.innerText = (parseInt(pTag.innerText) + 1) + " Likes";
      })
    }
  })


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
const createToyListHTML = (toy) => {
  divTag.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar">
      <p>${toy.likes} Likes</p>
      <button id="${toy.id}" class="like-btn">Like <3</button>
    </div>
  `
}
