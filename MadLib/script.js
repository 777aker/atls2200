const madlib = 'https://madlibz.herokuapp.com/api/random?minlength=5&maxlength=20';

const submitbut = document.querySelector('#submit');
submitbut.addEventListener('click', submitbutfun);

const madlip = document.querySelector('#madlip');

function submitbutfun() {
  madlip.textContent = "";
  for(let i = 0; i < formguy.length; i++) {
    madlip.textContent += jsonresp.value[i] + formguy[i].value;
    //console.log(formguy[i].value);
  }
  madlip.textContent += jsonresp.value[formguy.length];

}

const newbut = document.querySelector('#new');
newbut.addEventListener('click', newlib);

var jsonresp = '';

async function newlib() {
  console.log('newlib');
  try {
    const response = await fetch(madlib);
    if(!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    handleresponse(json);
    jsonresp = json;

  } catch(err) {
    console.log(err);
    console.log('newlib failed');
  }
}

const formguy = document.querySelector('.form');

function handleresponse(json) {
  formguy.innerHTML = '';
  //console.log(json.blanks);
  for(let i = 0; i < json.blanks.length; i++) {
    //console.log(json.blanks[i]);
    var templabel = document.createElement("label");
    var tempinput = document.createElement("input");
    tempinput.setAttribute("type", "text");
    tempinput.setAttribute("name", `row[${i}]`);
    tempinput.setAttribute("value", "");
    templabel.setAttribute("for", `row[${i}]`);
    templabel.innerHTML = json.blanks[i];
    formguy.appendChild(templabel);
    formguy.appendChild(tempinput);
    formguy.appendChild(document.createElement("br"));
  }
}
