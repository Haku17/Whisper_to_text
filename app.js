const express = require('express');
const app = express();

const PORT = 4000;

app.listen(4000, () => {
  console.log(`app is live on port: ${PORT}`)
  console.log('reload test!')
});


app.use(express.static('public'));