
var getHeaderElement = document.getElementById("headerThree");
var itemToRemove;

window.onload = async function() {
    var responseVar =  "";
    await fetch('http://localhost:3000/get')
    .then(response => {
        return response.json();
    })
    .then(resp => {
        var items = resp.items;
        for (let i = 0; i < items.length; ++i)
        {
            let listInputString = '<li id = "' + items[i].item + '" > ' + items[i].item +  ' </li>';
            list.innerHTML += listInputString;
            itemToRemove = items[i].item;
            // document.getElementById(items[i].item).addEventListener("click", function() {removeFromList(items[i].item)});
        }
        for (let i = 0; i < items.length; ++i)
        {
            itemToRemove = items[i].item;
            document.getElementById(items[i].item).addEventListener("click", function() {removeFromList(items[i].item)});
        }
    });
}
var textInput = document.getElementById("todoItemInput")
var list = document.getElementById("list")

function addToList() {
    console.log(textInput.value)
    fetch('http://localhost:3000/add', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "item": textInput.value})
})
    let input = textInput.value;
    let li = document.createElement("li");
    li.setAttribute("id", input);
    li.textContent = input;
    list.appendChild(li);
    let newLI = document.getElementById(input);
    newLI.addEventListener("click", function() {removeFromList(input)});
  textInput.value = "";
}

function removeFromList(param) {
    fetch('http://localhost:3000/delete', {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "item": param})
})
    var item = document.getElementById(param);
    list.removeChild(item);
}

textInput.addEventListener('keyup', (event) => {
    if(event.which === 13) {
        addToList();
    }
});