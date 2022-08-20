const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI , { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("ERR : " + err.message);
    } else {
        console.log('Connected to MongoDB');
    }
});
module.exports = mongoose;