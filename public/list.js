
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
        for (i = 0; i < items.length; ++i)
        {
            var listInputString = '<li id = "' + items[i].item + '" > ' + items[i].item +  ' </li>';
            list.innerHTML += listInputString;

            itemToRemove = items[i].item;
            document.getElementById(items[i].item).addEventListener("click", removeFromList);
        }
    });
}

var textInput = document.getElementById("todoItemInput")
var list = document.getElementById("list")
document.getElementById("removeButton").addEventListener("click", removeFromList);

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

    var listInputString = '<li tag = "' + textInput.value + '" > ' + textInput.value +  ' </li>';
    list.innerHTML += listInputString;
    document.getElementsByTag(textInput.value).addEventListener("click", function(){
        removeFromList(textInput.value);
    });
  
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
    // list.removeChild(item);
}

textInput.addEventListener('keyup', (event) => {
    if(event.which === 13) {
        addToList(); 
    }
}); 
