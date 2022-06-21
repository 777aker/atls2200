const para = document.querySelector('p');
para.addEventListener('click', updateName);

function updateName() {
  const name = prompt('Enter a new name');
  para.textContent = `Player 1: ${name}`; // not a quote but a `` which is annoying
}

// Anonymous function
document.getElementById("mydiv").onmouseover = function() {
  this.style.backgroundColor = "blue";
}
