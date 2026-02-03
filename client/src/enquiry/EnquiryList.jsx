import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EnquiryList({ data, refreshList, getAllEnquiry, setFormData }) {

  const handleConfirm = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:8000/api/website/enquiry/delete/${id}`)
        .then((res) => {
          toast.success(res.data.msg || "Deleted successfully");
          getAllEnquiry();   // fetch fresh data
          refreshList();     // optional (if same function)
        })
        .catch(() => {
          toast.error("Delete failed");
        });
    }
  };


let editRow = (id) => {
  axios
    .get(`http://localhost:8000/api/website/enquiry/single/${id}`)
    .then((res) => {
      if (res.data.status) {
        setFormData({
          _id: res.data.enquiry._id,   // 👈 IMPORTANT
          name: res.data.enquiry.name,
          email: res.data.enquiry.email,
          phone: res.data.enquiry.phone,
          message: res.data.enquiry.message,
        });
      }
    });
};



  return (
    <div className="bg-white shadow-xl rounded-xl p-6 border w-full">
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="text-2xl font-bold text-sky-700 mb-5">
        User Enquiries
      </h2>

      <table className="w-full text-sm border border-collapse">
        <thead className="bg-sky-100">
          <tr>
            <th className="border px-3 py-2">Sr</th>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Message</th>
            <th className="border px-3 py-2">Edit</th>
            <th className="border px-3 py-2">Delete</th>
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-3 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">{item.email}</td>
                <td className="border px-3 py-2">{item.phone}</td>
                <td className="border px-3 py-2">{item.message}</td>

                <td className="border px-3 py-2 text-center">
                  <button onClick={() => editRow(item._id)}
                  className="text-blue-600 cursor-pointer">
                    Edit
                  </button>
                </td>

                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => handleConfirm(item._id)}
                    className="text-red-600 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="border px-3 py-4 text-center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
