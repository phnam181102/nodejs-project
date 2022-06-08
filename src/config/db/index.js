const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://phnam181102:namdeptrai123@cluster0.fwive.mongodb.net/CRUD?retryWrites=true&w=majority"
        );
        console.log("Connect successfully!!!");
    } catch (error) {
        console.log("Connect failure!!!");
    }
}

module.exports = { connect };
