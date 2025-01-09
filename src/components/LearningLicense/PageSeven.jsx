import React from "react";

function PageSeven() {
  return (
    <div className="">
      {/* Header Section */}
      <div>
        <h4 className="text-lg font-medium text-gray-800 mb-4">
          Please fill the Self Declaration as to Physical Fitness Details:
        </h4>
        <div>
          <button className="bg-black text-white py-2 px-6 rounded-lg transition mb-5 hover:bg-gray-800">
            Self Declaration [Form 1]
          </button>
        </div>
        <div>
          <h5 className="text-lg font-bold text-gray-800 mb-3">
            Declarations: <span className="text-red-700">*</span>
          </h5>
        </div>
      </div>

      {/* Declarations Section */}
      <div className="space-y-4">
        <div className="flex items-start mb-3">
          <input
            type="radio"
            id="Authentication_yes_1"
            value="Authentication_yes"
            name="declaration"
            className="mt-1 mr-2"
          />
          <label
            htmlFor="Authentication_yes_1"
            className="text-base font-light text-gray-700"
          >
            I do hereby confirm that details mentioned in the application form
            are mine, correct and valid. I agree that my personal details on DL
            (Name, DOB, Relation Name) are matching as per the Aadhaar details.
            I understand that my application shall be rejected by the concerned
            RTO if any discrepancies are found in the application during Aadhaar
            scrutiny.
          </label>
        </div>

        <div className="flex items-start mb-3">
          <input
            type="radio"
            id="Authentication_yes_2"
            value="Authentication_yes"
            name="declaration"
            className="mt-1 mr-2"
          />
          <label
            htmlFor="Authentication_yes_2"
            className="text-base font-light text-gray-700"
          >
            I hereby declare that to the best of my knowledge and belief, the
            particulars given above are true.
          </label>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-6">
        <h5 className="text-lg font-bold text-red-500 mb-3">Note *</h5>
        <p className="text-base font-light text-gray-700 mb-4">
          DRINGO will manage all documentation processes on your behalf. Our
          team will contact you to verify essential details, and you will be
          required to provide the OTP for the continuation of the process. Once
          a slot is chosen, we will keep you informed about every step and
          assist you at the RTO office.
        </p>
      </div>
    </div>
  );
}

export default PageSeven;
