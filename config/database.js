const mongoose = require('mongoose');

const mongodb = async () => {
    await mongoose.connect("mongodb+srv://gsandeepreddy98:qYUOt91qlTprfvfo@namastedev.eo9vs.mongodb.net/devtinder")
}

module.exports = mongodb