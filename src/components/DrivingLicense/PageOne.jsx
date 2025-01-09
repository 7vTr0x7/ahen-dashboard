import React, { useEffect, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import toast, { Toaster } from "react-hot-toast";

function PageOne() {
  const [isPayed, setIsPayed] = useState(false);

  const [step, setStep] = useState(1); // Track the current step
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ content: "", type: "" });
  const [sameAsPresentAddress, setSameAsPresentAddress] = useState(false);
  const [errors, setErrors] = useState({}); // Track the validation errors
  const vendor_id = localStorage.getItem("vendorId");

  const [formData, setFormData] = useState({
    // step - 2 Pages
    authenticationMethod: "", // To track radio button selection in step 2
    llrStatus: "",
    vendor_id: vendor_id,
    license_type: "driving",
    usertype: "customer",
    customerprice: "",
    //step-3 Page
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    gender: "",
    emergencyContact: "",
    dob: "",
    relationType: "",
    idMark1: "",
    idMark2: "",
    organDonation: "",
    // Fields for 4 pages
    Flat: "",
    Station: "",
    Mark: "",
    Town: "",
    State: "",
    District: "",
    Taluk: "",
    pinCode: "",
    code: "",
    RTO: "",
    // For Permanent Address
    permFlat: "",
    permStation: "",
    permMark: "",
    permTown: "",
    permState: "",
    permDistrict: "",
    permTaluk: "",
    permPinCode: "",
    permRTO: "",

    // step6 pages
    passportPhoto: null,
    bloodGroupProof: null,
    addressProof: null,
    ageProof: null,

    // Step 7 - Declaration
    declaration: "",

    // Other form data...
    declarationAnswers: new Array(6).fill(""),
  });

  const [price, setPrice] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");

    if (storedUserId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `https://driving.shellcode.cloud/api/users/users/${storedUserId}`
          );
          const data = await response.json();
          if (data?.user) {
            setUser(data.user);
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
          toast.error("Error fetching profile data.");
        }
      };

      fetchProfile();
    }
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          "https://driving.shellcode.cloud/license/licenses/price"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch price");
        }
        const result = await response.json();
        const drivingLicensePrice = result.data.find(
          (item) => item.price_type === "driving_license_customer_price"
        );
        setPrice(drivingLicensePrice?.price || null);
        console.log(drivingLicensePrice?.price);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice();
  }, []);

  // Content for each step
  const stepsContent = [
    { title: "Driving License Info" },
    { title: "Driving License Info" },
    { title: "Personal Details" },
    { title: "Address Details" },
    { title: "Class Of Vehicles" },
    { title: "Document Details" },
    { title: "Declaration Form" },
    {
      title:
        "Application-cum-Declaration as to Physical Fitness[See Rule 5(2)] ",
    },
    { title: "Confirm Details" },
  ];

  // Validate fields for the current step
  const validateFields = () => {
    let tempErrors = {};
    let isValid = true;

    // Step 2 validation (Submission Method)
    if (step === 2) {
      if (!formData.authenticationMethod) {
        tempErrors.authenticationMethod = "Please select a submission method.";
        isValid = false;
      }

      if (!formData.llrStatus) {
        tempErrors.llrStatus = "Please select if you already have an LLR.";
        isValid = false;
      }
    }

    // Step 3 validation example (Personal Details)
    if (step === 3) {
      if (!formData.firstName) {
        tempErrors.firstName = "First Name is required.";
        isValid = false;
      }
      if (!formData.middleName) {
        tempErrors.middleName = "Middle Name is required.";
        isValid = false;
      }
      if (!formData.lastName) {
        tempErrors.lastName = "Last Name is required.";
        isValid = false;
      }
      if (!formData.mobileNo) {
        tempErrors.mobileNo = "Mobile No is required.";
        isValid = false;
      }
      if (!formData.email) {
        tempErrors.email = "Email is required.";
        isValid = false;
      }
      if (!formData.gender) {
        tempErrors.gender = "Gender is required.";
        isValid = false;
      }
      if (!formData.emergencyContact) {
        tempErrors.emergencyContact = "Emergency Mobile No is required.";
        isValid = false;
      }
      if (!formData.dob) {
        tempErrors.dob = "Date of Birth is required.";
        isValid = false;
      }
      if (!formData.relationType) {
        tempErrors.relationType = "Relation Type is required.";
        isValid = false;
      }
      if (!formData.idMark1) {
        tempErrors.idMark1 = "Identification Mark 1 is required.";
        isValid = false;
      }
      if (!formData.idMark2) {
        tempErrors.idMark2 = "Identification Mark 2 is required.";
        isValid = false;
      }
      if (!formData.organDonation) {
        tempErrors.organDonation =
          "Please indicate your willingness for organ donation.";
        isValid = false;
      }
    }

    // Step 4 validation (Address Details)
    if (step === 4) {
      // Present Address Validation
      if (!formData.Flat) {
        tempErrors.Flat = "House/Door/Flat No is required.";
        isValid = false;
      }
      if (!formData.Station) {
        tempErrors.Station = "Street/Locality/Police Station is required.";
        isValid = false;
      }
      if (!formData.Mark) {
        tempErrors.Mark = "Location/Land Mark is required.";
        isValid = false;
      }
      if (!formData.Town) {
        tempErrors.Town = "Village/Town is required.";
        isValid = false;
      }
      if (!formData.State) {
        tempErrors.State = "State is required.";
        isValid = false;
      }
      if (!formData.District) {
        tempErrors.District = "District is required.";
        isValid = false;
      }
      if (!formData.Taluk) {
        tempErrors.Taluk = "Taluk is required.";
        isValid = false;
      }
      if (!formData.pinCode) {
        tempErrors.pinCode = "Pin code is required."; // Correct error key
        isValid = false;
      }
      if (!formData.RTO) {
        tempErrors.RTO = "RTO Office is required.";
        isValid = false;
      }
    }

    // Step 5 validation (Class Of Vehicles)
    if (step === 5) {
      if (!formData.vehicleType) {
        tempErrors.vehicleType = "Please select a vehicle type.";
        isValid = false;
      }
      if (!formData.fromDate) {
        tempErrors.fromDate = "Please select a 'From date'.";
        isValid = false;
      }
      if (!formData.toDate) {
        tempErrors.toDate = "Please select a 'To date'.";
        isValid = false;
      }
    }

    if (step === 6) {
      if (!formData.passportPhoto) {
        tempErrors.passportPhoto = "Please upload a passport size photo.";
        isValid = false;
      }

      if (!formData.bloodGroupProof) {
        tempErrors.bloodGroupProof = "Please upload blood group proof.";
        isValid = false;
      }

      if (!formData.addressProof) {
        tempErrors.addressProof = "Please upload address proof.";
        isValid = false;
      }

      if (!formData.ageProof) {
        tempErrors.ageProof = "Please upload age proof.";
        isValid = false;
      }
    }

    // Step 7 Validation (Declaration Form)
    if (step === 7) {
      if (!formData.declaration) {
        tempErrors.declaration = "Please select a declaration option."; // Error message for missing selection
        isValid = false;
      }
    }

    // Step 8 validation (Physical Fitness Questions)
    if (step === 8) {
      formData.declarationAnswers.forEach((answer, index) => {
        if (!answer) {
          tempErrors[`declarationAnswer${index}`] = `Please answer question ${
            index + 1
          }.`;
          isValid = false;
        }
      });
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: file,
    }));
  };

  const handleRadioChange = (index, value) => {
    setFormData((prevData) => {
      const newDeclarationAnswers = [...prevData.declarationAnswers];
      newDeclarationAnswers[index] = value;
      return {
        ...prevData,
        declarationAnswers: newDeclarationAnswers,
      };
    });
  };

  const handleCheckboxChange = () => {
    setSameAsPresentAddress((prev) => !prev);
    if (!sameAsPresentAddress) {
      // When checked, copy present address to permanent address
      setFormData((prevState) => ({
        ...prevState,
        permFlat: prevState.Flat,
        permStation: prevState.Station,
        permMark: prevState.Mark,
        permTown: prevState.Town,
        permState: prevState.State,
        permDistrict: prevState.District,
        permTaluk: prevState.Taluk,
        permPinCode: prevState.pinCode,
        permRTO: prevState.Rto,
      }));
    } else {
      // Clear permanent address when unchecked
      setFormData((prevState) => ({
        ...prevState,
        permFlat: "",
        permStation: "",
        permMark: "",
        permTown: "",
        permState: "",
        permDistrict: "",
        permTaluk: "",
        permPinCode: "",
        permRTO: "",
      }));
    }
  };
  // Move to the next step
  const handleNext = () => {
    if (validateFields()) {
      if (step < stepsContent.length) {
        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  // Move to the previous step
  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
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
        const response = await fetch(
          "https://driving.shellcode.cloud/api/payments/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenData}`,
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
            name: user?.name,
            email: user?.email,
            contact: user?.phone_number,
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

  const handleSubmit = async () => {
    // Prepare the data to be sent to the API

    const payload = {
      first_name: formData.firstName,
      middle_name: formData.middleName,
      last_name: formData.lastName,
      mobile_number: formData.mobileNo,
      gender: formData.gender,
      emergency_mobile_number: formData.emergencyContact,
      relation_type: formData.relationType,
      relation_name: formData.relationName,
      date_of_birth: formData.dob,
      country_of_birth: formData.countryOfBirth,
      qualification: formData.qualification,
      blood_group: formData.bloodGroup,
      identification_mark_1: formData.idMark1,
      identification_mark_2: formData.idMark2,
      organ_donation: formData.organDonation,
      address_house_flatno: formData.Flat,
      address_locality: formData.Station,
      address_location: formData.Mark,
      address_town: formData.Town,
      address_state: formData.State,
      address_district: formData.District,
      address_taluka: formData.Taluk,
      address_pincode: formData.pinCode,
      rto_office: formData.RTO,
      permanent_address_house: formData.permFlat,
      permanent_address_locality: formData.permStation,
      permanent_address_location: formData.permMark,
      permanent_address_state: formData.permState,
      permanent_address_district: formData.permDistrict,
      permanent_address_taluka: formData.permTaluk,
      permanent_address_pincode: formData.permPinCode,
      book_slot_from_date: formData.fromDate,
      book_slot_to_date: formData.toDate,
      license_type: formData.license_type,
      usertype: formData.usertype,
      vendor_id: formData.vendor_id,
      customerprice: price,
    };

    // Create FormData object to handle both files and data
    const formDataObj = new FormData();

    // Append regular fields to FormData
    for (const key in payload) {
      formDataObj.append(key, payload[key]);
    }

    // Append the file fields (if they exist)
    if (formData.passportPhoto)
      formDataObj.append("passport_size_photo", formData.passportPhoto);
    if (formData.bloodGroupProof)
      formDataObj.append("blood_group_photo", formData.bloodGroupProof);
    if (formData.addressProof)
      formDataObj.append("address_proof_photo", formData.addressProof);
    if (formData.ageProofPhoto)
      formDataObj.append("age_proof_photo", formData.ageProofPhoto);

    try {
      // Make the API call using fetch
      console.log(formData);
      const response = await fetch("https://driving.shellcode.cloud/license/create", {
        method: "POST",
        body: formDataObj, // Send FormData as body (multipart/form-data)
      });

      // Check if the response is successful
      if (response.ok) {
        const responseData = await response.json();
        console.log("Submission successful:", responseData);
        setMessage({
          content: "Data added successfully!",
          type: "success",
        });
      } else {
        console.log("Error in submission:", response.statusText);
        setMessage({
          content: "Failed to add data. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage({
        content: "Error updating order. Please try again.",
        type: "error",
      });
    } finally {
      setOpen(true); // Show success/error message in Snackbar
    }
  };

  const handleClose = () => {
    setOpen(false); // Close Snackbar after some time or on click
  };

  return (
    <>
      <div className="w-full p-8">
        {/* Header */}
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          {stepsContent[step - 1].title}
        </h1>

        {/* Steps Progress Bar */}
        <div className="mb-6 flex justify-between gap-1">
          {Array(stepsContent.length)
            .fill(null)
            .map((_, index) => (
              <span
                key={index}
                className={`h-2 w-full rounded-full ${
                  index < step ? "bg-blue-600" : "bg-gray-200"
                }`}
                style={{
                  flex: 1,
                  marginRight:
                    index !== stepsContent.length - 1 ? "0.25rem" : 0,
                }}
              ></span>
            ))}
        </div>
        {/* Content */}
        {(() => {
          if (step === 1) {
            return (
              <div>
                <p className="mb-4 text-gray-700">
                  An individual who wants to drive any type of motor vehicle in
                  India has to get his/her learner's license first. A learner's
                  license is issued for learning 
                </p>
                <p className="mb-4 text-gray-700">
                  A month after the issuance of the learner's license, the
                  person has to appear for the test in front of an RTO
                  authority, who upon proper examination, will declare if he/she
                  has passed the exam or not
                </p>

                <p className="mb-4 font-semibold text-red-600">
                  This Service include both LLR and DL.
                </p>
                <p className="mb-4 font-semibold text-red-600">
                  We will provide vechicles for Test Drive.
                </p>
              </div>
            );
          } else if (step === 2) {
            return (
              <div className="">
                <div className="">
                  {/* Section Title */}
                  <h2 className="text-black-700 mb-4 text-lg font-bold">
                    Choose Your Submission Method
                  </h2>
                  {errors.authenticationMethod && (
                    <p className="text-red-600 ">
                      {errors.authenticationMethod}
                    </p>
                  )}

                  {/* Aadhaar Authentication Section */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <input
                        type="radio"
                        id="Authentication"
                        value="Authentication"
                        name="authenticationMethod" // Use the same name for the group
                        // className="mr-3"
                        className={`mr-3 ${
                          errors.authenticationMethod ? "border-red-500" : ""
                        } border`}
                        checked={
                          formData.authenticationMethod === "Authentication"
                        } // Check the value correctly
                        onChange={(e) => handleInputChange(e)} // Handle input change
                      />
                      <label
                        className="text-black-700 cursor-pointer text-lg font-bold"
                        htmlFor="Authentication"
                      >
                        Submit via Aadhaar Authentication
                      </label>
                    </div>
                    <p className="mb-4 text-base font-light text-gray-700">
                      (Applications using Aadhaar authentication do not need to
                      visit the RTO.)
                    </p>
                  </div>

                  {/* Note Section */}
                  <div className="mb-8">
                    <h3 className="mb-4 text-lg font-bold text-red-600">
                      Notes *
                    </h3>
                    <ul className="mb-4 list-disc space-y-3 pl-6 text-base font-light text-gray-700">
                      <li>
                        You will need to provide 3 OTPs for Aadhaar
                        authentication, the screen test, and LLR download.
                      </li>
                      <li>The user must set a password for the LL test.</li>
                      <li>
                        Your phone number must be linked to Aadhaar for
                        contactless service.
                      </li>
                      <li>
                        The address on your Aadhaar will appear on your Driving
                        License.
                      </li>
                    </ul>
                  </div>

                  {/* Non-Aadhaar Authentication Section */}
                  <div className="mb-8">
                    <div className="mb-4">
                      <input
                        type="radio"
                        id="nonAuthentication"
                        value="nonAuthentication"
                        name="authenticationMethod" // Use the same name for the group
                        // className="mr-3"
                        className={`mr-3 ${
                          errors.authenticationMethod ? "border-red-500" : ""
                        } border`}
                        checked={
                          formData.authenticationMethod === "nonAuthentication"
                        } // Check the value correctly
                        onChange={(e) => handleInputChange(e)} // Handle input change
                      />
                      <label
                        className="text-black-700 cursor-pointer text-lg font-bold"
                        htmlFor="nonAuthentication"
                      >
                        Submit without Aadhaar Authentication
                      </label>
                    </div>
                    <p className="mb-2 text-base font-light  text-gray-700">
                      (Applications choosing this option must visit the RTO
                      office for document verification.)
                    </p>
                    <p className="mb-4 text-base font-light text-gray-700">
                      This option requires visiting the RTO for both the LLR and
                      Driving License processes.
                    </p>
                  </div>
                  {/* Display error message for validation */}

                  {/* Already Have LLR Section */}
                  <div className="mb-8">
                    {errors.llrStatus && (
                      <p className="text-red-600">{errors.llrStatus}</p>
                    )}
                    <h3 className="mb-4 text-lg font-bold text-gray-800">
                      Already Have an LLR?{" "}
                      <span className="text-red-600">*</span>
                    </h3>
                    <p className="mb-2 text-base font-light text-gray-700">
                      (Applications using Aadhaar authentication do not need to
                      visit the RTO.)
                    </p>
                    <p className="mb-4 text-base font-light text-gray-700">
                      If you choose the non-Aadhaar submission option, a visit
                      to the RTO is required for both the LLR and Driving
                      License processes.
                    </p>
                  </div>

                  {/* Yes/No Options */}
                  <div className="mb-4 flex items-center space-x-6">
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Yes"
                          name="llrStatus" // Same name for the LLR status radio buttons
                          checked={formData.llrStatus === "Yes"}
                          onChange={(e) => handleInputChange(e)} // Handle input change
                          className="form-radio"
                        />
                        <span>Yes</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="No"
                          name="llrStatus" // Same name for the LLR status radio buttons
                          checked={formData.llrStatus === "No"}
                          onChange={(e) => handleInputChange(e)} // Handle input change
                          className="form-radio"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else if (step === 3) {
            return (
              <div className="w-full">
                <h4 className="text-black-700 mb-4 text-lg font-medium">
                  Name Of the Applicant (As Per Records)
                  <span className="text-red-700">*</span>
                </h4>

                <form onSubmit={handleNext}>
                  {/* Personal Details Section */}
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.firstName ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="middleName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Middle Name <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="middleName"
                        name="middleName"
                        placeholder="Middle"
                        value={formData.middleName}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.middleName ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.middleName && (
                        <p className="text-sm text-red-500">
                          {errors.middleName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.lastName ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor="mobileNo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mobile No <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="tel"
                        id="mobileNo"
                        name="mobileNo"
                        placeholder="Number"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.mobileNo ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.mobileNo && (
                        <p className="text-sm text-red-500">
                          {errors.mobileNo}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.email ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender <span className="text-red-700">*</span>
                      </label>
                      <div className="mt-1 flex items-center space-x-4">
                        <div>
                          <input
                            type="radio"
                            id="male"
                            value="male"
                            name="gender"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="male" className="ml-2">
                            Male
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="female"
                            value="female"
                            name="gender"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="female" className="ml-2">
                            Female
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="transgender"
                            value="transgender"
                            name="gender"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="transgender" className="ml-2">
                            Transgender
                          </label>
                        </div>
                      </div>
                      {errors.gender && (
                        <p className="text-sm text-red-500">{errors.gender}</p>
                      )}
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor="emergencyContact"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Emergency Mobile No{" "}
                        <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="tel"
                        id="emergencyContact"
                        name="emergencyContact"
                        placeholder="Emergency Mobile No"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.emergencyContact
                            ? "border-red-500"
                            : "border-black"
                        }`}
                      />
                      {errors.emergencyContact && (
                        <p className="text-sm text-red-500">
                          {errors.emergencyContact}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date of Birth <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.dob ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.dob && (
                        <p className="text-sm text-red-500">{errors.dob}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="relationType"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Relation Type <span className="text-red-700">*</span>
                      </label>
                      <select
                        id="relationType"
                        name="relationType"
                        value={formData.relationType}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.relationType
                            ? "border-red-500"
                            : "border-black"
                        }`}
                      >
                        <option value="">Select</option>
                        <option value="father">Father</option>
                        <option value="mother">Mother</option>
                        <option value="spouse">Spouse</option>
                      </select>
                      {errors.relationType && (
                        <p className="text-sm text-red-500">
                          {errors.relationType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Identification Marks */}
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor="idMark1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Identification Mark 1{" "}
                        <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="idMark1"
                        name="idMark1"
                        placeholder="Mark 1"
                        value={formData.idMark1}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.idMark1 ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.idMark1 && (
                        <p className="text-sm text-red-500">{errors.idMark1}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="idMark2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Identification Mark 2{" "}
                        <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="idMark2"
                        name="idMark2"
                        placeholder="Mark 2"
                        value={formData.idMark2}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.idMark2 ? "border-red-500" : "border-black"
                        }`}
                      />
                      {errors.idMark2 && (
                        <p className="text-sm text-red-500">{errors.idMark2}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Organ Donation <span className="text-red-700">*</span>
                      </label>
                      <p className="text-sm text-gray-400">
                        I am willing to donate my organs, In case of accidental
                        death? (Please Tick if willing)
                      </p>
                      <div className="mt-1 flex items-center space-x-4">
                        <div>
                          <input
                            type="radio"
                            id="organYes"
                            value="yes"
                            name="organDonation"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="organYes" className="ml-2">
                            Yes
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="organNo"
                            value="no"
                            name="organDonation"
                            onChange={handleInputChange}
                          />
                          <label htmlFor="organNo" className="ml-2">
                            No
                          </label>
                        </div>
                      </div>
                      {errors.organDonation && (
                        <p className="text-sm text-red-500">
                          {errors.organDonation}
                        </p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            );
          } else if (step === 4) {
            return (
              <>
                <div>
                  <h4 className="text-black-700 mb-4 text-lg font-bold">
                    Present address{" "}
                    <span className="text-xs font-light text-red-400">
                      (The below green color text will be printed on Driving
                      License)
                    </span>
                  </h4>
                </div>
                {/* Personal Details Form */}
                <form>
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="Flat"
                        className="block text-base font-medium"
                      >
                        House/Door/Flat No{" "}
                        <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="Flat"
                        name="Flat"
                        placeholder="House/Door/Flat No"
                        value={formData.Flat}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.Flat ? "border-red-600" : "border-black"
                        }`}
                      />
                      {errors.Flat && (
                        <p className="text-sm text-red-600">{errors.Flat}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="Station"
                        className="block text-base font-medium"
                      >
                        Street/Locality/Police Station{" "}
                        <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="Station"
                        name="Station"
                        placeholder="Street/Locality/Police Station"
                        value={formData.Station}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.Station ? "border-red-600" : "border-black"
                        }`}
                      />
                      {errors.Station && (
                        <p className="text-sm text-red-600">{errors.Station}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="Mark"
                        className="block text-base font-medium"
                      >
                        Location/Land Mark{" "}
                        <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="Mark"
                        name="Mark"
                        placeholder="Location/Land Mark"
                        value={formData.Mark}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.Mark ? "border-red-600" : "border-black"
                        }`}
                      />
                      {errors.Mark && (
                        <p className="text-sm text-red-600">{errors.Mark}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="Town"
                        className="block text-base font-medium"
                      >
                        Village/Town <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="Town"
                        name="Town"
                        placeholder="Village/Town"
                        value={formData.Town}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.Town ? "border-red-600" : "border-black"
                        }`}
                      />
                      {errors.Town && (
                        <p className="text-sm text-red-600">{errors.Town}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="State"
                        className="block text-base font-medium"
                      >
                        State <span className="text-red-700">*</span>
                      </label>
                      <select
                        id="State"
                        name="State"
                        value={formData.State}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.State ? "border-red-600" : "border-black"
                        }`}
                      >
                        <option value="">Select State</option>
                        <option value="1">Gujarat</option>
                        <option value="2">Haryana</option>
                        <option value="3">Himachal Pradesh</option>
                      </select>
                      {errors.State && (
                        <p className="text-sm text-red-600">{errors.State}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="District"
                        className="block text-base font-medium"
                      >
                        District <span className="text-red-700">*</span>
                      </label>
                      <select
                        id="District"
                        name="District"
                        value={formData.District}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.District ? "border-red-600" : "border-black"
                        }`}
                      >
                        <option value="">Select District</option>
                        <option value="1">Bhavnagar</option>
                        <option value="2">Ahmedabad</option>
                        <option value="3">Jamnagar</option>
                      </select>
                      {errors.District && (
                        <p className="text-sm text-red-600">
                          {errors.District}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label
                        htmlFor="Taluk"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Taluk <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="Taluk"
                        name="Taluk"
                        placeholder="Taluk"
                        value={formData.Taluk}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.Taluk ? "border-red-600" : "border-black"
                        }`}
                      />
                      {errors.Taluk && (
                        <p className="text-sm text-red-600">{errors.Taluk}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="pinCode"
                        className="block text-base font-medium"
                      >
                        Pin code <span className="text-red-700">*</span>
                      </label>
                      <input
                        type="text"
                        id="pinCode"
                        name="pinCode" // Make sure the name matches the formData key
                        placeholder="Pin code"
                        value={formData.pinCode} // Use pinCode, not code
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.pinCode ? "border-red-600" : "border-black"
                        }`}
                      />
                      {errors.pinCode && (
                        <p className="text-sm text-red-600">{errors.pinCode}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="RTO"
                        className="block text-base font-medium"
                      >
                        RTO Office <span className="text-red-700">*</span>
                      </label>
                      <select
                        id="RTO"
                        name="RTO"
                        value={formData.RTO}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                          errors.RTO ? "border-red-600" : "border-black"
                        }`}
                      >
                        <option value="">Select RTO</option>
                        <option value="1">Bhavnagar</option>
                        <option value="2">Ahmedabad</option>
                        <option value="3">Jamnagar</option>
                      </select>
                      {errors.RTO && (
                        <p className="text-sm text-red-600">{errors.RTO}</p>
                      )}
                    </div>
                  </div>
                </form>

                <div>
                  {/* Checkbox for Same as Present Address */}
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      id="sameAsPresent"
                      checked={sameAsPresentAddress}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="sameAsPresent"
                      className="text-lg font-medium"
                    >
                      Same as present address
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-black-700 mb-4 text-lg font-bold">
                    Permanent Address
                  </h4>
                </div>

                <div>
                  <form>
                    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label
                          htmlFor="permFlat"
                          className="block text-base font-medium"
                        >
                          House/Door/Flat No{" "}
                          <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          id="permFlat"
                          name="permFlat"
                          value={formData.permFlat}
                          placeholder="House/Door/Flat No"
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permFlat ? "border-red-600" : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        />
                        {errors.permFlat && (
                          <p className="text-sm text-red-600">
                            {errors.permFlat}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="permStation"
                          className="block text-base font-medium"
                        >
                          Street/Locality/Police Station{" "}
                          <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          id="permStation"
                          name="permStation"
                          placeholder="Street/Locality/Police Station"
                          value={formData.permStation}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permStation
                              ? "border-red-600"
                              : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        />
                        {errors.permStation && (
                          <p className="text-sm text-red-600">
                            {errors.permStation}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="permMark"
                          className="block text-base font-medium"
                        >
                          Location/Land Mark{" "}
                          <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          id="permMark"
                          name="permMark"
                          placeholder="Location/Land Mark"
                          value={formData.permMark}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permMark ? "border-red-600" : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        />
                        {errors.permMark && (
                          <p className="text-sm text-red-600">
                            {errors.permMark}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label
                          htmlFor="permTown"
                          className="block text-base font-medium"
                        >
                          Village/Town <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          id="permTown"
                          name="permTown"
                          placeholder="Village/Town"
                          value={formData.permTown}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permTown ? "border-red-600" : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        />
                        {errors.permTown && (
                          <p className="text-sm text-red-600">
                            {errors.permTown}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="permState"
                          className="block text-base font-medium"
                        >
                          State <span className="text-red-700">*</span>
                        </label>
                        <select
                          id="permState"
                          name="permState"
                          value={formData.permState}
                          placeholder="State"
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permState ? "border-red-600" : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        >
                          <option value="">Select State</option>
                          <option value="1">Gujarat</option>
                          <option value="2">Haryana</option>
                          <option value="3">Himachal Pradesh</option>
                        </select>
                        {errors.permState && (
                          <p className="text-sm text-red-600">
                            {errors.permState}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="permDistrict"
                          className="block text-base font-medium"
                        >
                          District <span className="text-red-700">*</span>
                        </label>
                        <select
                          id="permDistrict"
                          name="permDistrict"
                          value={formData.permDistrict}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permDistrict
                              ? "border-red-600"
                              : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        >
                          <option value="">Select District</option>
                          <option value="1">Bhavnagar</option>
                          <option value="2">Ahmedabad</option>
                          <option value="3">Jamnagar</option>
                        </select>
                        {errors.permDistrict && (
                          <p className="text-sm text-red-600">
                            {errors.permDistrict}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label
                          htmlFor="permTaluk"
                          className="block text-base font-medium"
                        >
                          Taluk <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          id="permTaluk"
                          name="permTaluk"
                          placeholder="Taluk"
                          value={formData.permTaluk}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permTaluk ? "border-red-600" : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        />
                        {errors.permTaluk && (
                          <p className="text-sm text-red-600">
                            {errors.permTaluk}
                          </p>
                        )}
                      </div>

                      {/* Permanent PinCode */}
                      <div>
                        <label
                          htmlFor="permPinCode"
                          className="block text-base font-medium"
                        >
                          Pin code <span className="text-red-700">*</span>
                        </label>
                        <input
                          type="text"
                          id="permPinCode"
                          name="permPinCode"
                          placeholder="Pin code"
                          value={formData.permPinCode}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permPinCode
                              ? "border-red-600"
                              : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        />
                        {errors.permPinCode && (
                          <p className="text-sm text-red-600">
                            {errors.permPinCode}
                          </p>
                        )}
                      </div>

                      {/* Permanent RTO */}
                      <div>
                        <label
                          htmlFor="permRTO"
                          className="block text-base font-medium"
                        >
                          RTO Office <span className="text-red-700">*</span>
                        </label>
                        <select
                          id="permRTO"
                          name="permRTO"
                          value={formData.permRTO}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                            errors.permRTO ? "border-red-600" : "border-black"
                          }`}
                          disabled={sameAsPresentAddress}
                        >
                          <option value="">Select RTO</option>
                          <option value="1">Bhavnagar</option>
                          <option value="2">Ahmedabad</option>
                          <option value="3">Jamnagar</option>
                        </select>
                        {errors.permRTO && (
                          <p className="text-sm text-red-600">
                            {errors.permRTO}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </>
            );
          } else if (step === 5) {
            return (
              <div className="rounded-lg">
                {/* Vehicle Type Selection */}
                <div className="mb-4">
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    onChange={handleInputChange}
                    value={formData.vehicleType}
                    className={`mt-1 block w-full border px-3 py-2 ${
                      errors.vehicleType ? "border-red-500" : "border-black"
                    } rounded-md text-gray-700`}
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="lmv">
                      LMV (Light Motor Vehicle) - Eg: Cars
                    </option>
                    <option value="mcwog">
                      MCWOG (Motor Cycle Without Gear) - Eg: Activa, Jupiter
                    </option>
                    <option value="mcwg">
                      MCWG (Motor Cycle With Gear) - Eg: Hero Honda
                    </option>
                  </select>
                  {errors.vehicleType && (
                    <p className="text-sm text-red-500">{errors.vehicleType}</p>
                  )}
                </div>

                {/* Notes Section */}
                <div className="mb-4">
                  <label
                    htmlFor="vehicleType"
                    className="text-black-700 block text-sm font-bold"
                  >
                    Notes
                  </label>
                  <ul className="text-black-600 ml-5 mt-2 list-disc text-sm">
                    <li>LMV (Light Motor Vehicle) - Eg: Cars</li>
                    <li>
                      MCWOG (Motor Cycle Without Gear) - Eg: Activa, Jupiter
                    </li>
                    <li>MCWG (Motor Cycle With Gear) - Eg: Hero Honda</li>
                  </ul>
                </div>

                {/* Booking Slot Section */}
                <h2 className="mb-1 text-sm font-bold">
                  Book Slot with Date <span className="text-red-500">*</span>
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  (Skip this question if you chose to submit via Aadhar
                  authentication)
                </p>

                {/* Date Selection Section */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="mb-4">
                    <label
                      htmlFor="fromDate"
                      className="block text-sm font-bold text-gray-700"
                    >
                      From date<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      name="fromDate"
                      value={formData.fromDate}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border px-3 py-2 ${
                        errors.fromDate ? "border-red-500" : "border-black"
                      } rounded-md text-gray-700`}
                    />
                    {errors.fromDate && (
                      <p className="text-sm text-red-500">{errors.fromDate}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="toDate"
                      className="block text-sm font-bold text-gray-700"
                    >
                      To date<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      name="toDate"
                      value={formData.toDate}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full border px-3 py-2 ${
                        errors.toDate ? "border-red-500" : "border-black"
                      } rounded-md text-gray-700`}
                    />
                    {errors.toDate && (
                      <p className="text-sm text-red-500">{errors.toDate}</p>
                    )}
                  </div>
                </div>

                {/* Notes Section */}
                <div>
                  <p className="mb-3 text-sm font-bold text-red-500">Notes *</p>
                  <p className="mb-2 text-xs font-bold text-red-500">
                    (Only for without Aadhar authentication)
                  </p>
                  <p className="mb-7 text-sm text-gray-600">
                    Select a date from the initial 15-day window, and we'll book
                    your appointment based on slot availability at the Regional
                    Transport Office within that timeframe. If your chosen dates
                    aren't available, we'll secure the earliest slot after the
                    initial 15 days.
                  </p>
                </div>
              </div>
            );
          } else if (step === 6) {
            return (
              <div className="w-full rounded-md">
                {/* Form Header */}
                <form className="mb-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Address Proof Dropdown */}
                    <div>
                      <label
                        htmlFor="address-proof"
                        className="text-black-700 mb-2 block font-bold"
                      >
                        Address Proof
                      </label>
                      <select
                        id="address-proof"
                        onChange={handleInputChange}
                        value={formData.addressProof}
                        className={`w-full rounded-md border p-2 shadow-sm ${
                          errors.addressProof
                            ? "border-red-500"
                            : "border-black-300"
                        }`}
                      >
                        <option selected>Select Address Proof</option>
                        <option>Aadhar Card</option>
                        <option>Pan Card</option>
                        <option>Electricity Bill</option>
                      </select>
                      {errors.addressProof && (
                        <p className="text-sm text-red-500">
                          {errors.addressProof}
                        </p>
                      )}
                    </div>

                    {/* Age Proof Dropdown */}
                    <div>
                      <label
                        htmlFor="age-proof"
                        className="mb-2 block font-bold text-gray-700"
                      >
                        Age Proof
                      </label>
                      <select
                        id="age-proof"
                        onChange={handleInputChange}
                        value={formData.ageProof}
                        className={`w-full rounded-md border p-2 shadow-sm ${
                          errors.ageProof
                            ? "border-red-500"
                            : "border-black-300"
                        }`}
                      >
                        <option selected>Select Age Proof</option>
                        <option>Aadhar Card</option>
                        <option>Birth Certificate</option>
                        <option>Pan Card</option>
                      </select>
                      {errors.ageProof && (
                        <p className="text-sm text-red-500">
                          {errors.ageProof}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Instruction Section */}
                  <div>
                    <div className="mb-3 mt-4">
                      <span className="text-black-200 text-lg font-semibold">
                        Documents:
                      </span>{" "}
                      (Add self-signed documents)
                    </div>
                    <div>(Allowed File Type: jpeg/jpg/pdf)</div>
                  </div>

                  {/* File Uploads */}
                  <div className="w-full">
                    <form>
                      {/* File Uploads with Buttons */}
                      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Passport Size Photo */}
                        <div>
                          <label
                            htmlFor="passport-photo"
                            className="mb-2 block font-bold text-gray-700"
                          >
                            Upload Passport Size Photo
                          </label>
                          <input
                            type="file"
                            id="passport-photo"
                            // className="hidden"
                            className={` hidden w-full rounded-md border p-2 shadow-sm ${
                              errors.passportPhoto
                                ? "border-red-500"
                                : "border-black-300"
                            }`}
                            onChange={(e) =>
                              handleFileChange(e, "passportPhoto")
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              document.getElementById("passport-photo").click()
                            }
                            className="border-black block w-full rounded-md border px-4 py-2 shadow-sm"
                          >
                            Upload
                          </button>
                          {errors.passportPhoto && (
                            <div className="text-sm text-red-500">
                              {errors.passportPhoto}
                            </div>
                          )}
                        </div>

                        {/* Blood Group Proof */}
                        <div>
                          <label
                            htmlFor="blood-group-proof"
                            className="mb-2 block font-bold text-gray-700"
                          >
                            Upload Blood Group Proof
                          </label>
                          <input
                            type="file"
                            id="blood-group-proof"
                            // className="hidden"
                            className={` hidden w-full rounded-md border p-2 shadow-sm ${
                              errors.bloodGroupProof
                                ? "border-red-500"
                                : "border-black-300"
                            }`}
                            onChange={(e) =>
                              handleFileChange(e, "bloodGroupProof")
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("blood-group-proof")
                                .click()
                            }
                            className="border-black block w-full rounded-md border px-4 py-2 shadow-sm"
                          >
                            Upload
                          </button>
                          {errors.bloodGroupProof && (
                            <div className="text-sm text-red-500">
                              {errors.bloodGroupProof}
                            </div>
                          )}
                        </div>

                        {/* Address Proof Upload */}
                        <div>
                          <label
                            htmlFor="address-proof-upload"
                            className="mb-2 block font-bold text-gray-700"
                          >
                            Upload Address Proof
                          </label>
                          <input
                            type="file"
                            id="address-proof-upload"
                            // className="hidden"
                            className={` hidden w-full rounded-md border p-2 shadow-sm ${
                              errors.addressProof
                                ? "border-red-500"
                                : "border-black-300"
                            }`}
                            onChange={(e) =>
                              handleFileChange(e, "addressProof")
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("address-proof-upload")
                                .click()
                            }
                            className="border-black block w-full rounded-md border px-4 py-2 shadow-sm"
                          >
                            Upload
                          </button>
                          {errors.addressProof && (
                            <div className="text-sm text-red-500">
                              {errors.addressProof}
                            </div>
                          )}
                        </div>

                        {/* Age Proof Upload */}
                        <div>
                          <label
                            htmlFor="age-proof-upload"
                            className="mb-2 block font-bold text-gray-700"
                          >
                            Upload Age Proof
                          </label>
                          <input
                            type="file"
                            id="age-proof-upload"
                            // className="hidden"
                            className={` hidden w-full rounded-md border p-2 shadow-sm ${
                              errors.ageProof
                                ? "border-red-500"
                                : "border-black-300"
                            }`}
                            onChange={(e) => handleFileChange(e, "ageProof")}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("age-proof-upload")
                                .click()
                            }
                            className="border-black block w-full rounded-md border px-4 py-2 shadow-sm"
                          >
                            Upload
                          </button>
                          {errors.ageProof && (
                            <div className="text-sm text-red-500">
                              {errors.ageProof}
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </form>
              </div>
            );
          } else if (step === 7) {
            return (
              <div className="">
                {/* Header Section */}
                <div>
                  <h4 className="mb-4 text-lg font-medium text-gray-800">
                    Please fill the Self Declaration as to Physical Fitness
                    Details:
                  </h4>
                  <div>
                    <button className="mb-5 rounded-lg bg-blue-400 px-6 py-2 text-white transition hover:bg-gray-800">
                      Self Declaration [Form 1]
                    </button>
                  </div>
                  {/* Error Message for Radio Button */}
                  {errors.declaration && (
                    <div className="mt-2 text-sm text-red-600">
                      {errors.declaration}
                    </div>
                  )}
                  <div>
                    <h5 className="mb-3 text-lg font-bold text-gray-800">
                      Declarations: <span className="text-red-700">*</span>
                    </h5>
                  </div>
                </div>

                {/* Declarations Section */}
                <div className="space-y-4">
                  <div className="mb-3 flex items-start">
                    <input
                      type="radio"
                      id="Authentication_yes_1"
                      value="Authentication_yes"
                      name="declaration"
                      className="mr-2 mt-1"
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="Authentication_yes_1"
                      className="text-base font-light text-gray-700"
                    >
                      I do hereby confirm that details mentioned in the
                      application form are mine, correct and valid. I agree that
                      my personal details on DL (Name, DOB, Relation Name) are
                      matching as per the Aadhaar details. I understand that my
                      application shall be rejected by the concerned RTO if any
                      discrepancies are found in the application during Aadhaar
                      scrutiny.
                    </label>
                  </div>

                  <div className="mb-3 flex items-start">
                    <input
                      type="radio"
                      id="Authentication_yes_2"
                      value="Authentication_yes"
                      name="declaration"
                      className="mr-2 mt-1"
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="Authentication_yes_2"
                      className="text-base font-light text-gray-700"
                    >
                      I hereby declare that to the best of my knowledge and
                      belief, the particulars given above are true.
                    </label>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6">
                  <h5 className="mb-3 text-lg font-bold text-red-500">
                    Note *
                  </h5>
                  <p className="mb-4 text-base font-light text-gray-700">
                    DRINGO will manage all documentation processes on your
                    behalf. Our team will contact you to verify essential
                    details, and you will be required to provide the OTP for the
                    continuation of the process. Once a slot is chosen, we will
                    keep you informed about every step and assist you at the RTO
                    office.
                  </p>
                </div>
              </div>
            );
          } else if (step === 8) {
            return (
              <div className="">
                <h5 className="text-black-700 mb-4 text-lg font-bold">
                  Declarations:
                </h5>

                {[
                  {
                    question:
                      "a) Do you suffer from Epilepsy or from sudden attacks of loss of consciousness or giddiness from any cause?",
                  },
                  {
                    question:
                      "b) Are you able to distinguish with each eye (or if you have held a driving license to drive a motor vehicle for a period of less than five years and if you have lost the sight of one eye after the said period of five years and if the application is for driving a light motor vehicle other than a transport vehicle fitted with an outside mirror on the steering wheel side) or with one eye, at a distance of 25 metres in good daylight with glasses, if worn, a motor car number plate?",
                  },
                  {
                    question:
                      "c) Have you lost either hand or foot or are you suffering from any defects of muscular control or muscular power of either arm or leg?",
                  },
                  {
                    question: "d) Do you suffer from night blindness?",
                  },
                  {
                    question:
                      "e) Are you so deaf as to be unable to hear (and if the application is for driving a light motor vehicle, with or without a hearing aid)?",
                  },
                  {
                    question:
                      "f) Do you suffer from any other disease or disability likely to cause your driving of a motor vehicle to be a source of danger to the public? If so, give details.",
                  },
                ].map((item, index) => (
                  <div className="mb-5" key={index}>
                    <p className="text-black-600 mb-2 text-sm font-semibold">
                      {item.question}
                    </p>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="Yes"
                          name={`question-${index}`}
                          checked={formData.declarationAnswers[index] === "Yes"}
                          onChange={() => handleRadioChange(index, "Yes")}
                          className="form-radio"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          value="No"
                          name={`question-${index}`}
                          checked={formData.declarationAnswers[index] === "No"}
                          onChange={() => handleRadioChange(index, "No")}
                          className="form-radio"
                        />
                        <span>No</span>
                      </label>
                    </div>
                    {errors[`declarationAnswer${index}`] && (
                      <p className="text-sm text-red-500">
                        {errors[`declarationAnswer${index}`]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            );
          } else {
            return (
              <div className="">
                {/* <div className="rounded-lg w-full">
                  <div>
                    <h1 className="text-xl font-bold mb-2">Aadhar Authentication</h1>
                    <p className="mb-2">
                      Mobile No attached with Aadhaar:{" "}
                      <span className="font-semibold">No</span>
                    </p>
                  </div>
                  <div className="border-y border-gray-300 w-full mb-4"></div>
          
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h2 className="font-semibold mb-2">Personal Details:</h2>
                      <p>
                        Name: <span className="font-semibold">{formData.firstName}</span>
                      </p>
                      <p>
                        Mobile No: <span className="font-semibold">{formData.mobileNo}</span>
                      </p>
                      <p>
                        Email:{" "}
                        <span className="font-semibold">{formData.firstName}</span>
                      </p>
                      <p>
                        Gender: <span className="font-semibold">Male</span>
                      </p>
                      <p>
                        Relation Type: <span className="font-semibold">-</span>
                      </p>
                      <p>
                        Relation Name: <span className="font-semibold">-</span>
                      </p>
                      <p>
                        Emergency Mobile No: <span className="font-semibold">-</span>
                      </p>
                    </div>
          
                    <div className="mt-5 md:mt-0">
                      <p>
                        Date of Birth: <span className="font-semibold">24-02-2003</span>
                      </p>
                      <p>
                        Country of Birth: <span className="font-semibold">India</span>
                      </p>
                      <p>
                        Qualification:{" "}
                        <span className="font-semibold">
                          Graduate in Non Medical Science
                        </span>
                      </p>
                      <p>
                        Blood Group: <span className="font-semibold">B+</span>
                      </p>
                      <p>
                        Identification Mark 1: <span className="font-semibold">No</span>
                      </p>
                      <p>
                        Identification Mark 2: <span className="font-semibold">No</span>
                      </p>
                      <p>
                        Organ Donation: <span className="font-semibold">No</span>
                      </p>
                    </div>
                  </div>
                  <div className="border-y border-gray-300 w-full mb-4 mt-3"></div>
          
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h2 className="font-semibold mb-2">Present Address:</h2>
                      <p>
                        House/Door/Flat No:{" "}
                        <span className="font-semibold">Thane vartak nagar</span>
                      </p>
                      <p>
                        Street/Locality/Police Station:{" "}
                        <span className="font-semibold">
                          vartak nagar dharmaveer society
                        </span>
                      </p>
                      <p>
                        Location/Land Mark:{" "}
                        <span className="font-semibold">work and grill hotel</span>
                      </p>
                      <p>
                        Village/Town: <span className="font-semibold">Thane</span>
                      </p>
                      <p>
                        Sub District: <span className="font-semibold">asxas</span>
                      </p>
                      <p>
                        District: <span className="font-semibold">Thane</span>
                      </p>
                      <p>
                        State: <span className="font-semibold">Maharashtra</span>
                      </p>
                      <p>
                        Pin Code: <span className="font-semibold">400606</span>
                      </p>
                      <p>
                        RTO Office: <span className="font-semibold">Others</span>
                      </p>
                    </div>
          
                    <div className="mt-5 md:mt-0">
                      <p>
                        House/Door/Flat No:{" "}
                        <span className="font-semibold">Thane vartak nagar</span>
                      </p>
                      <p>
                        Street/Locality/Police Station:{" "}
                        <span className="font-semibold">
                          vartak nagar dharmaveer society
                        </span>
                      </p>
                      <p>
                        Location/Land Mark:{" "}
                        <span className="font-semibold">work and grill hotel</span>
                      </p>
                      <p>
                        Village/Town: <span className="font-semibold">Thane</span>
                      </p>
                      <p>
                        Sub District: <span className="font-semibold">asxas</span>
                      </p>
                      <p>
                        District: <span className="font-semibold">Thane</span>
                      </p>
                      <p>
                        State: <span className="font-semibold">Maharashtra</span>
                      </p>
                      <p>
                        Pin Code: <span className="font-semibold">400606</span>
                      </p>
                    </div>
                  </div>
                  <div className="border-y border-gray-300 w-full mb-4 mt-3"></div>
          
                  <div className="mt-6">
                    <h2 className="font-semibold mb-2">Book Slot With Date</h2>
                    <p>
                      Vehicle Type:{" "}
                      <span className="font-semibold">LMV (Light Motor Vehicle)</span>
                    </p>
                    <p>
                      Book Slot With Date:{" "}
                      <span className="font-semibold">10-10-2024, 24-10-2024</span>
                    </p>
                  </div>
                  <div className="border-y border-gray-300 w-full mb-4 mt-3"></div>
          
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h2 className="font-semibold mb-2">Document Details:</h2>
                      <p>Passport Size Photo: -</p>
                      <p>Blood Group Proof: -</p>
                    </div>
                    <div>
                      <p>Address Photo: -</p>
                      <p>Age Photo: -</p>
                    </div>
                  </div>
                  <div className="border-y border-gray-300 w-full mb-4 mt-3"></div>
          
                  <div className="mt-6 flex flex-wrap gap-5 items-center">
                    <h2 className="font-semibold m-0">Service Charge:</h2>
                    <p className="text-2xl font-bold p-0">2749.00</p>
                  </div>
          
                  <div className="mt-4 flex flex-wrap gap-4">
                    <button className="bg-black text-white py-2 px-9 rounded hover:bg-gray-800 transition">
                      Pay Now
                    </button>
                    <button className="bg-black text-white py-2 px-9 rounded hover:bg-gray-800 transition">
                      Use Promo
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-red-500 mb-3 mt-4">Notes *</p>
                  </div>
                  <p className="mt-6 mb-4 text-sm text-gray-600">
                    DRINO will manage all documentation processes on your behalf. Our team
                    will contact you to verify essential details, and you will be required
                    to provide the OTP for the continuation of the process. Once a slot is
                    chosen, we will keep you informed about every step and assist you at
                    the RTO office.
                  </p>
                </div> */}
                <div className="w-full rounded-lg">
                  <div>
                    <h1 className="mb-2 text-xl font-bold">
                      Aadhar Authentication
                    </h1>
                    <p className="mb-2">
                      Mobile No attached with Aadhaar:{" "}
                      <span className="font-semibold">No</span>
                    </p>
                  </div>
                  <div className="mb-4 w-full border-y border-gray-300"></div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h2 className="mb-2 font-semibold">Personal Details:</h2>
                      <p>
                        Name:{" "}
                        <span className="font-semibold">
                          {formData.firstName} {formData.middleName}{" "}
                          {formData.lastName}
                        </span>
                      </p>
                      <p>
                        Mobile No:{" "}
                        <span className="font-semibold">
                          {formData.mobileNo}
                        </span>
                      </p>
                      <p>
                        Email:{" "}
                        <span className="font-semibold">{formData.email}</span>
                      </p>
                      <p>
                        Gender:{" "}
                        <span className="font-semibold">{formData.gender}</span>
                      </p>
                      <p>
                        Relation Type:{" "}
                        <span className="font-semibold">
                          {formData.relationType || "-"}
                        </span>
                      </p>
                      <p>
                        Relation Name: <span className="font-semibold">-</span>
                      </p>
                      <p>
                        Emergency Mobile No:{" "}
                        <span className="font-semibold">
                          {formData.emergencyContact || "-"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 md:mt-0">
                      <p>
                        Date of Birth:{" "}
                        <span className="font-semibold">{formData.dob}</span>
                      </p>
                      <p>
                        Country of Birth:{" "}
                        <span className="font-semibold">India</span>
                      </p>
                      <p>
                        Qualification:{" "}
                        <span className="font-semibold">
                          Graduate in Non Medical Science
                        </span>
                      </p>
                      <p>
                        Blood Group: <span className="font-semibold">B+</span>
                      </p>
                      <p>
                        Identification Mark 1:{" "}
                        <span className="font-semibold">
                          {formData.idMark1 || "No"}
                        </span>
                      </p>
                      <p>
                        Identification Mark 2:{" "}
                        <span className="font-semibold">
                          {formData.idMark2 || "No"}
                        </span>
                      </p>
                      <p>
                        Organ Donation:{" "}
                        <span className="font-semibold">
                          {formData.organDonation || "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 mt-3 w-full border-y border-gray-300"></div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h2 className="mb-2 font-semibold">Present Address:</h2>
                      <p>
                        House/Door/Flat No:{" "}
                        <span className="font-semibold">{formData.Flat}</span>
                      </p>
                      <p>
                        Street/Locality/Police Station:{" "}
                        <span className="font-semibold">
                          {formData.Station}
                        </span>
                      </p>
                      <p>
                        Location/Land Mark:{" "}
                        <span className="font-semibold">{formData.Mark}</span>
                      </p>
                      <p>
                        Village/Town:{" "}
                        <span className="font-semibold">{formData.Town}</span>
                      </p>
                      <p>
                        Sub District:{" "}
                        <span className="font-semibold">{formData.Taluk}</span>
                      </p>
                      <p>
                        District:{" "}
                        <span className="font-semibold">
                          {formData.District}
                        </span>
                      </p>
                      <p>
                        State:{" "}
                        <span className="font-semibold">{formData.State}</span>
                      </p>
                      <p>
                        Pin Code:{" "}
                        <span className="font-semibold">
                          {formData.pinCode}
                        </span>
                      </p>
                      <p>
                        RTO Office:{" "}
                        <span className="font-semibold">
                          {formData.RTO || "Others"}
                        </span>
                      </p>
                    </div>

                    <div className="mt-5 md:mt-0">
                      <p>
                        House/Door/Flat No:{" "}
                        <span className="font-semibold">
                          {formData.permFlat}
                        </span>
                      </p>
                      <p>
                        Street/Locality/Police Station:{" "}
                        <span className="font-semibold">
                          {formData.permStation}
                        </span>
                      </p>
                      <p>
                        Location/Land Mark:{" "}
                        <span className="font-semibold">
                          {formData.permMark}
                        </span>
                      </p>
                      <p>
                        Village/Town:{" "}
                        <span className="font-semibold">
                          {formData.permTown}
                        </span>
                      </p>
                      <p>
                        Sub District:{" "}
                        <span className="font-semibold">
                          {formData.permTaluk}
                        </span>
                      </p>
                      <p>
                        District:{" "}
                        <span className="font-semibold">
                          {formData.permDistrict}
                        </span>
                      </p>
                      <p>
                        State:{" "}
                        <span className="font-semibold">
                          {formData.permState}
                        </span>
                      </p>
                      <p>
                        Pin Code:{" "}
                        <span className="font-semibold">
                          {formData.permPinCode}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 mt-3 w-full border-y border-gray-300"></div>

                  <div className="mt-6">
                    <h2 className="mb-2 font-semibold">Book Slot With Date</h2>
                    <p>
                      Vehicle Type:{" "}
                      <span className="font-semibold">
                        LMV (Light Motor Vehicle)
                      </span>
                    </p>
                    <p>
                      Book Slot With Date:{" "}
                      <span className="font-semibold">
                        10-10-2024, 24-10-2024
                      </span>
                    </p>
                  </div>
                  <div className="mb-4 mt-3 w-full border-y border-gray-300"></div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h2 className="mb-2 font-semibold">Document Details:</h2>
                      <p>
                        {" "}
                        Passport Size Photo:{" "}
                        <span className="font-semibold">
                          {formData.passportPhoto
                            ? formData.passportPhoto.name
                            : "-"}
                        </span>
                      </p>
                      <p>
                        {" "}
                        Blood Group Proof:{" "}
                        <span className="font-semibold">
                          {formData.bloodGroupProof
                            ? formData.bloodGroupProof.name
                            : "-"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        {" "}
                        Address Proof:{" "}
                        <span className="font-semibold">
                          {formData.addressProof
                            ? formData.addressProof.name
                            : "-"}
                        </span>
                      </p>
                      <p>
                        {" "}
                        Age Proof:{" "}
                        <span className="font-semibold">
                          {formData.ageProof ? formData.ageProof.name : "-"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 mt-3 w-full border-y border-gray-300"></div>

                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <h2 className="m-0 font-semibold">Service Charge:</h2>
                    <p className="p-0 text-2xl font-bold">₹{price}</p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-4">
                    {
                      <button
                        className="bg-black rounded px-9 py-2 text-white transition hover:bg-gray-800"
                        onClick={() =>
                          initializeRazorpay(Number(price), "Driving License")
                        }
                      >
                        Pay Now
                      </button>
                    }
                  </div>
                  <div>
                    <p className="mb-3 mt-4 text-sm font-bold text-red-500">
                      Notes *
                    </p>
                  </div>
                  <p className="mb-4 mt-6 text-sm text-gray-600">
                    DRINO will manage all documentation processes on your
                    behalf. Our team will contact you to verify essential
                    details, and you will be required to provide the OTP for the
                    continuation of the process. Once a slot is chosen, we will
                    keep you informed about every step and assist you at the RTO
                    office.
                  </p>
                </div>
              </div>
            );
          }
        })()}

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {/* Conditionally render Back button */}
          {step > 1 && (
            <button
              onClick={handleBack}
              className="rounded border border-gray-300 bg-gray-100 px-6 py-2 text-gray-700 transition hover:bg-gray-200"
            >
              Back
            </button>
          )}

          {/* Render Next or Submit button */}
          {step < stepsContent.length ? (
            <button
              onClick={handleNext}
              className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
              >
              Next
            </button>
          ) : (
            <>
              {isPayed && (
                <button
                  onClick={handleSubmit}
                  
            className="rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                >
                  Submit
                </button>
              )}
            </>
          )}
        </div>
        {/* Snackbar for success/error messages */}
        <Snackbar
          open={open}
          autoHideDuration={3000} // Close the Snackbar after 3 seconds
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={message.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message.content}
          </Alert>
        </Snackbar>
      </div>
      <Toaster />
    </>
  );
}

export default PageOne;
