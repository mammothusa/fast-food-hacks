
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Fast Food Hacks API is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
