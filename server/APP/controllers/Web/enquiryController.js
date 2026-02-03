const enquiryModel = require("../../model/enquiry.model.js");


let enquiryInsert = async (req, res) => {
  const {name, email, phone, message} =req.body;

  try {
    // validation
    if (!name || !email || !phone || !message) {
      return res.status(400).send({ status: 0, msg: "All fields required" });
    }

    // check email exists
    const exists = await enquiryModel.findOne({ email });
    if (exists) {
      return res.send({ status: 0, msg: "Email already exists" });
    }

    // create enquiry
    await enquiryModel.create({
      name,
      email,
      phone,
      message,
    });

    res.send({ status: 1, msg: "Enquiry saved" });
  } catch (err) {
    res.status(500).send({
      status: 0,
      msg: err.message,
    });
  }
};



let enquiryList = async (req, res) => {
  try {
    const list = await enquiryModel.find();
    res.send({ status: 1, enquiryList: list });
  } catch (err) {
    res.status(500).send({ status: 0, msg: err.message });
  }
};

let enquiryDelete = async (req, res) => {
  try {
    let enid = req.params.id;

    let result = await enquiryModel.deleteOne({ _id: enid });

    if (result.deletedCount === 0) {
      return res.send({ status: 0, msg: "Enquiry not found" });
    }

    res.send({
      status: 1,
      msg: "Enquiry Deleted Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      msg: err.message,
    });
  }
};


let enquirySingleRow=async(req,res)=>{
    let enId=req.params.id;
    let enquiry=await enquiryModel.findOne({_id:enId});
    res.send({status:1, enquiry});

}

let enquiryupdate = async (req, res) => {
  try {
    let enId = req.params.id;
    let { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.send({ status: 0, msg: "All fields required" });
    }

    // check email exists except current record
    const emailExists = await enquiryModel.findOne({
      email,
      _id: { $ne: enId },
    });

    if (emailExists) {
      return res.send({
        status: 0,
        msg: "Email already exists",
      });
    }

    await enquiryModel.updateOne(
      { _id: enId },
      { $set: { name, email, phone, message } }
    );

    res.send({
      status: 1,
      msg: "Enquiry Updated Successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      msg: err.message,
    });
  }
};


module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquirySingleRow,
  enquiryupdate
};
