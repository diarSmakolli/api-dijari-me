// const dotenv = require("dotenv").config();
// const { MongoClient } = require("mongodb");
// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const userRoute = require("./routes/userRoute");
// const errorHandler = require("./middleWare/errorMiddleware");
// const cookieParser = require("cookie-parser"); 
// const path = require("path");
// const app = express();


// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());
// app.use(
//     cors({
//       origin: ["http://localhost:3000"],
//       credentials: true,
//     })
//   );

// //Route Middleware
// app.use("/api/users/", userRoute);




// // Routes
// app.get("/", (req,res) => {
//     res.send("Home Page");
// });

// // Error Middleware
// app.use(errorHandler);


// Connect DB
// const PORT = process.env.PORT || 5000;
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     })
//     .catch((err) => console.log(err));




const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// const userRoute = require("./routes/userRoute");
// const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser"); 
const path = require("path");
const app = express();
// const userRoute = require("./routes/userRoute");
const authUser = require('./routes/auth');
const conndb = require('./config/db');

conndb();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(
    cors({
      origin: ["http://localhost:3000", "http://dijar.me/"],
      credentials: true,
    })
  );


// if(process.env.NODE_ENV == 'production') {
//   const path1 = require('path');

//   app.get('/', (req, res) => {
//     app.use(express.static(path.resolve(path.resolve(__dirname, 'client', 'build'))))
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }



app.use('/api/auth', require('./routes/auth'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));
