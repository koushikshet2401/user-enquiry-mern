let express=require('express')
let mongoose=require('mongoose');
const enquiryRouter = require('./APP/Routes/WEB/enquiryRoutes');
const cors = require("cors");

let app=express()
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/website/enquiry',enquiryRouter)




// connect mongodb
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

