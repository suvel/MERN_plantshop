const mongoose = require("mongoose");

const connectDatabase = () => {
  return new Promise(async (resolve, reject) => {
    await mongoose
      .connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((con) => {
        console.log(
          `MongoDB is connected to the host: ${con.connection.host} `
        );
        resolve();
      })
      .catch((exception) => {
        reject(exception);
      });
  });
};

module.exports = connectDatabase;
