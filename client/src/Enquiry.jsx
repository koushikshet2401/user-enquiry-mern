import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EnquiryList } from "./enquiry/EnquiryList";

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);

  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // handle input change
  const getValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // fetch all enquiries
  const getAllEnquiry = () => {
    axios
      .get("http://localhost:8000/api/website/enquiry/view")
      .then((res) => {
        if (res.data.status) {
          setEnquiryList(res.data.enquiryList);
        }
      })
      .catch((err) => console.log(err));
  };

  // ✅ SUBMIT (SAVE + UPDATE)
  const saveEnquiry = (e) => {
    e.preventDefault();

    if (formData._id) {
      // UPDATE
      axios
        .put(
          `http://localhost:8000/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then(() => {
          toast.success("Enquiry Updated Successfully");
          resetForm();
          getAllEnquiry();
        })
        .catch((err) => console.log(err));
    } else {
      // INSERT
      axios
        .post(
          "http://localhost:8000/api/website/enquiry/insert",
          formData
        )
        .then(() => {
          toast.success("Enquiry Saved Successfully");
          resetForm();
          getAllEnquiry();
        })
        .catch((err) => console.log(err));
    }
  };

  // reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      
    });
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="text-3xl font-bold text-center mb-10">
        User Enquiry
      </h1>

      <div className="grid grid-cols-[30%_70%] gap-8 items-start">
        
        {/* LEFT – FORM */}
        <div className="bg-white shadow-xl rounded-xl p-8 border border-sky-200">
          <h2 className="text-2xl font-bold text-sky-700 mb-6">
            Enquiry Form
          </h2>

          <form className="space-y-6" onSubmit={saveEnquiry}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={getValue}
              placeholder="Full Name"
              className="w-full px-4 py-3 border-2 border-sky-300 rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={getValue}
              placeholder="Email Address"
              className="w-full px-4 py-3 border-2 border-sky-300 rounded-lg"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={getValue}
              placeholder="Phone Number"
              className="w-full px-4 py-3 border-2 border-sky-300 rounded-lg"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={getValue}
              rows={4}
              placeholder="Message"
              className="w-full px-4 py-3 border-2 border-sky-300 rounded-lg"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-sky-500 text-white font-bold py-3 rounded-lg"
            >
              {formData._id ? "Update Enquiry" : "Submit Enquiry"}
            </button>
          </form>
        </div>

        {/* RIGHT – TABLE */}
        <EnquiryList
          data={enquiryList}
          getAllEnquiry={getAllEnquiry}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
