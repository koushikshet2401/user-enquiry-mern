const express = require("express");
const enquiryRouter = express.Router();

const { enquiryInsert,enquiryList, enquiryDelete,enquirySingleRow ,enquiryupdate} = require("../../controllers/Web/enquiryController");

enquiryRouter.post("/insert", enquiryInsert);
enquiryRouter.get("/view", enquiryList);

enquiryRouter.delete("/delete/:id",enquiryDelete);
enquiryRouter.get("/single/:id",enquirySingleRow);
enquiryRouter.put("/update/:id",enquiryupdate)

module.exports = enquiryRouter;
