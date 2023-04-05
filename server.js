
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
const fs = require("fs"); 

app.use(express.static('public'))
app.use(express.json());

app.use(cors({
  origin: '*'
}))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/todo.html');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get("/messages", (req, res) => {
  res.send("Hello");
});

app.post('/add', (req, res) => {
  var items;
  var dataHolder;
  var itemsAsf = {
    item : req.body.item
  };

  fs.readFile("database.json", (error, data) => {

    if(error) {
      console.error(error); 

      throw error;
    }

    items = JSON.parse(data).items;
    items.push(itemsAsf);

    dataHolder = {
      items: items
    }

    data = JSON.stringify(dataHolder)
    
    fs.writeFileSync("database.json", data, (error) => {
  
      if(error) {
        console.error(error); 
  
        throw error;
      }
    })
  })

  res.send();

})

app.get('/get', (req, res) => {
  var getData; 

  fs.readFile("database.json", (error, data) => {

    getData = JSON.parse(data); 

    if(error) {
      console.error(error); 

      throw error;
    }

    // res.send('Hello World');

    res.send(JSON.stringify(getData)); 

  })

})

app.delete('/delete', (req, res) => {
  var items;
  var dataHolder;
  var itemsAsf = {
    item : req.body.item
  };

  fs.readFile("database.json", (error, data) => {

    if(error) {
      console.error(error); 

      throw error;
    }

    items = JSON.parse(data).items;
    items = items.filter(i => i.item !== itemsAsf.item);
    console.log(itemsAsf);
    console.log(items);

    dataHolder = {
      items: items
    }

    data = JSON.stringify(dataHolder)
    
    fs.writeFileSync("database.json", data, (error) => {
  
      if(error) {
        console.error(error); 
  
        throw error;
      }
    })
  })

  res.send();
})

