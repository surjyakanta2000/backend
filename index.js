const experss = require('express');
const app = experss();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;
dotenv.config();

//connect mongoose & db
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser: true,useUnifiedTopology: true},
()=>console.log("connected to db"));

//imorts routes
const listingRoutes = require("./routes/listing");
const userRoutes = require("./routes/user");

//Middlewaares
app.use(experss.json());
app.use(cors());

//routes MiddleWare
app.use("/api/listings",listingRoutes);
app.use("/api/user",userRoutes);

app.listen(port,()=> {
    console.log(`listining to the port at ${port}`);
});
