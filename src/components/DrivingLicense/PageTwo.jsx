import React from "react";

function PageTwo() {
  return (
    <div className="">
      <div className="">
        {/* Section Title */}
        <h2 className="text-lg font-bold text-black-700 mb-4">
          Choose Your Submission Method
        </h2>

        {/* Aadhaar Authentication Section */}
        <div className="mb-8">
          <div className="mb-4">
            <input
              type="radio"
              id="Authentication"
              value="Authentication"
              name="Authentication"
              className="mr-3"
            />
            <label
              className="text-lg font-bold text-black-700 cursor-pointer"
              htmlFor="Authentication"
            >
              Submit via Aadhaar Authentication
            </label>
          </div>
          <p className="text-base font-light text-gray-700 mb-4">
            (Applications using Aadhaar authentication do not need to visit the
            RTO.)
          </p>
          <p className="text-base font-light text-gray-700 mb-4">
            By choosing Aadhaar submission, you can skip the RTO visit for LLR.
            However, a visit is required for the Driving License test. The
            driving test is simple for skilled drivers, but failure may incur
            additional charges.
          </p>
        </div>

        {/* Note Section */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-600 mb-4">Notes *</h3>
          <ul className="list-disc space-y-3 pl-6 text-base font-light text-gray-700 mb-4">
            <li>
              You will need to provide 3 OTPs for Aadhaar authentication, the
              screen test, and LLR download.
            </li>
            <li>The user must set a password for the LL test.</li>
            <li>
              Your phone number must be linked to Aadhaar for contactless
              service.
            </li>
            <li>
              The address on your Aadhaar will appear on your Driving License.
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
              name="Authentication"
              className="mr-3"
            />
            <label
              className="text-lg font-bold text-black-700 cursor-pointer"
              htmlFor="nonAuthentication"
            >
              Submit without Aadhaar Authentication
            </label>
          </div>
          <p className="text-base font-light text-gray-700  mb-2">
            (Applications choosing this option must visit the RTO office for
            document verification.)
          </p>
          <p className="text-base font-light text-gray-700 mb-4">
            This option requires visiting the RTO for both the LLR and Driving
            License processes.
          </p>
        </div>

        {/* Already Have LLR Section */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Already Have an LLR? <span className="text-red-600">*</span>
          </h3>
          <p className="text-base font-light text-gray-700 mb-2">
            (Applications using Aadhaar authentication do not need to visit the
            RTO.)
          </p>
          <p className="text-base font-light text-gray-700 mb-4">
            If you choose the non-Aadhaar submission option, a visit to the RTO
            is required for both the LLR and Driving License processes.
          </p>
        </div>

        {/* Yes/No Options */}
        <div className="flex items-center space-x-6 mb-4">
          <div>
            <label className="flex items-center space-x-2">
              <input type="radio" value="Yes" className="form-radio" />
              <span>Yes</span>
            </label>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input type="radio" value="No" className="form-radio" />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageTwo;
