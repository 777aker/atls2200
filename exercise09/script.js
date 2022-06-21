var count = 0;
const counter = document.getElementById('counter');
counter.addEventListener('click', addOne);

function addOne() {
  count += 1;
  counter.innerHTML = count;
}

const hover = document.getElementById('hover');
hover.addEventListener('mousemove', mousemoved);
hover.addEventListener('mouseover', mouseover);
hover.addEventListener('mouseleave', mouseexit);

function mousemoved() {
  hover.innerHTML = `${event.clientX}, ${event.clientY}`;
}

function mouseover() {
  event.target.style.background = "rgba(50, 25, 0, 1)";
}

function mouseexit() {
  event.target.style.background = "";
}
