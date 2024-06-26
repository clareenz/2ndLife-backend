const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    })
    .then((data) => {
      //console.log(`mongod connected with server: http://localhost:8000`);
      console.log(`mongod connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;