const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Route for the result page
app.post('/result', (req, res) => {
  const { num1, num2, operation } = req.body;
  let result;

  switch (operation) {
    case 'add':
      result = parseFloat(num1) + parseFloat(num2);
      break;
    case 'subtract':
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case 'multiply':
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case 'divide':
      result = parseFloat(num1) / parseFloat(num2);
      break;
    default:
      result = 'Invalid operation';
  }

  res.render('result', { num1, num2, result, operation });
});

app.listen(port, () => {
  console.log(`Calculator app listening at http://localhost:${port}`);
});
    