const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoute');
const cartRoutes=require('./routes/Cart');
const url = require('./urls'); // assuming this is the correct path

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(url, { dbName: "miniprj"})
    .then(() => {
        console.log('Connection success');
    })
    .catch((err) => {
        console.log('Connection Failed', err);
    });

app.use("/", productRoutes);
app.use("/login", userRoutes); // Remove the trailing slash
app.use("/cart", cartRoutes);
const port = 8080;
app.listen(port, () => {
    console.log('Server listening on port:', port);
});
