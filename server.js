const express = require('express');
const app = express();

//usando o cors, que é um pacote que permite que qualquer domínio acesse a API
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

//fazendo o app usar o arquivo style.css
app.use(express.static('public'));

//fazendo o app usar o arquivo index.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.use(express.json());

app.get('/api/:date?', (req, res) => {
  console.log('Request params:', req.params);

  let date;
  const dateParam = req.params.date;

  if (!dateParam) {
    console.log('No date provided, using current date.');
    date = new Date();
  } else if (!isNaN(dateParam)) {
    console.log('Date is a timestamp:', req.params.date);
    date = new Date(parseInt(dateParam));
  } else {
    console.log('Date is a string:', req.params.date);
    date = new Date(dateParam);
  }

  console.log('Parsed date:', date);

  if (date.toString() === 'Invalid Date') {
    console.log('Invalid date provided.');
    res.json({ error: 'Invalid Date' });
  } else {
    console.log('Valid date provided.');
    res.json({ 
      unix: date.getTime(), 
      utc: date.toUTCString() 
    });
  }
});



//informando qual porta o app deve ouvir
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});