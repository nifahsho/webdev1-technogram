const express = require("express");
const bodyParser = require("body-parser");
//nanti disini require route
const beritaRoutes = require('./app/route/berita')

const app = express();

//nanti disini require model-model nya
const Berita = require("./app/model/berita");
const sequelize = require("./app/util/database");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//nanti disini app.use route
app.use("/news" , beritaRoutes);


/*
 @author 16 MN

Error Handler , ketika terjadi error pada salah satu middleware maka akan di catch 
oleh handler ini.(Untuk mengurang boilerplate) . Bisa dibuat route sendiri misal ErrorHandler.js 
*/
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const cause = error.cause || "Unknown";
  res.status(status).json({
    message: message,
    error: status,
    cause: cause,
  });
});


//nanti disini taro relasi

const init = async () => {
  try {
    await sequelize.sync();
    // set port, listen for requests
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
