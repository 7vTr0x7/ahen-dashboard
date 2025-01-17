import React, { useState } from "react";
import { FaIdCard, FaSignature, FaFileAlt } from "react-icons/fa";
import { toast } from "react-hot-toast"; // Importing react-hot-toast

const PageOne = () => {
  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [qualification, setQualification] = useState("");
  const [uploads, setUploads] = useState({
    aadhaarFront: null,
    aadhaarBack: null,
    signature: null,
    llPhoto: null, // New state for Learning License photo
  });
  const [isPayed, setIsPayed] = useState(false);

  const handleFileUpload = (e, key) => {
    if (e.target.files && e.target.files[0]) {
      setUploads((prev) => ({ ...prev, [key]: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !vehicleType ||
      !mobileNumber ||
      !uploads.aadhaarFront ||
      !uploads.aadhaarBack ||
      !uploads.signature ||
      !uploads.llPhoto
    ) {
      toast.error(
        "Please fill in all required fields and upload necessary files."
      );
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("vehicleType", vehicleType);
    formDataObj.append("mobileNumber", mobileNumber);
    formDataObj.append("qualification", qualification);
    formDataObj.append("aadhaarFront", uploads.aadhaarFront);
    formDataObj.append("aadhaarBack", uploads.aadhaarBack);
    formDataObj.append("signature", uploads.signature);
    formDataObj.append("llPhoto", uploads.llPhoto); // Appending LL photo to FormData

    try {
      const response = await fetch(
        "https://driving.shellcode.cloud/license/create",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Submission successful:", responseData);
        toast.success("Data added successfully!");
        setIsPayed(true); // Display submit button after successful payment
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const initializeRazorpay = async (amount, description) => {
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = async () => {
        const tokenData = localStorage.getItem("token");
        const { value } = JSON.parse(tokenData);
        const response = await fetch(
          "https://driving.shellcode.cloud/api/payments/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${value}`,
            },
            body: JSON.stringify({
              amount,
              currency: "INR",
              receipt: "receipt#1",
            }),
            credentials: "include",
          }
        );

        const data = await response.json();
        if (!data.success) {
          toast.error("Failed to create order. Please try again.");
          return;
        }

        const options = {
          key: "rzp_test_3sEAtEoClhTs62",
          amount: data.order.amount,
          currency: "INR",
          name: "Ahen",
          description,
          order_id: data.order.id,
          handler: async () => {
            toast.success("Payment successful! 🎉");
            setIsPayed(true);
          },
          prefill: {
            name: "User Name", // Replace with actual user data
            email: "user@example.com", // Replace with actual user data
            contact: "1234567890", // Replace with actual user data
          },
          theme: { color: "#3399cc" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", () =>
          toast.error("Payment failed. Please try again.")
        );
        razorpay.open();
      };
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
        {step === 1 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:justify-center  lg:grid-cols-2">
            {["2 Wheeler", "4 Wheeler", "T-Permit", "2 & 4 Wheeler"].map(
              (type) => (
                <button
                  key={type}
                  className="transform rounded-lg border border-gray-300 bg-white p-6 text-center shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-100"
                  onClick={() => {
                    setVehicleType(type);
                    setStep(2);
                  }}
                >
                  {type}
                </button>
              )
            )}
          </div>
        )}

        {step === 2 && !isPayed && (
          <form
            className="mt-8 w-full max-w-lg space-y-6 rounded-lg bg-white p-6 shadow-lg"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="mobile"
                className="mb-2 block text-lg font-medium text-gray-700"
              >
                Mobile Number (Aadhaar linked){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="mobile"
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="qualification"
                className="mb-2 block text-lg font-medium text-gray-700"
              >
                Qualification
              </label>
              <select
                id="qualification"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              >
                <option value="">Select Qualification</option>
                {["10th", "12th", "Graduate", "Post Graduate"].map((qual) => (
                  <option key={qual} value={qual}>
                    {qual}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Aadhaar Card Front",
                  key: "aadhaarFront",
                  icon: FaIdCard,
                },
                {
                  label: "Aadhaar Card Back",
                  key: "aadhaarBack",
                  icon: FaFileAlt,
                },
                { label: "Signature", key: "signature", icon: FaSignature },
                {
                  label: "Learning License Photo (LL)",
                  key: "llPhoto",
                  icon: FaIdCard,
                }, // New field for LL photo
              ].map(({ label, key, icon: Icon }) => (
                <div key={key} className="flex items-center space-x-4">
                  <Icon size={24} className="text-gray-500" />
                  <label htmlFor={key} className="flex-1 text-lg text-gray-700">
                    {label}
                  </label>
                  <input
                    id={key}
                    type="file"
                    className="w-40 rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => handleFileUpload(e, key)}
                    accept=".jpg,.png,.pdf"
                    required={key !== "qualification"} // Make all fields required except qualification
                  />
                </div>
              ))}
            </div>

            {/* Display the price */}
            <div className="mt-4 text-center text-lg font-semibold text-gray-800">
              <p>
                Total Price: <span className="text-blue-500">₹1000</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-3 text-white transition duration-300 ease-in-out hover:bg-blue-600"
              onClick={() => initializeRazorpay(1000, "Driving License")}
            >
              Proceed to Payment
            </button>
          </form>
        )}

        {isPayed && (
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-green-500 py-3 text-white transition duration-300 ease-in-out hover:bg-green-600"
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default PageOne;
