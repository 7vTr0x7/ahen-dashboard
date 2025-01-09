import React from "react";

function PageTwo() {
  return (
    <div className="">
      <div className="">
        {/* Aadhaar Authentication Section */}
        <div className="mb-7">
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
          <p className="text-base font-light text-gray-700 mb-3">
            (Applications using Aadhaar authentication do not need to visit the
            RTO.)
          </p>
          <p className="text-base font-light text-gray-700 mb-3">
            Submitting through Aadhaar authentication eliminates the need for a
            visit to the Regional Transport Office (RTO).
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

        {/* Already Have LLR Section */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Phone number linked with Aadhaar number ?{" "}
            <span className="text-red-600">*</span>
          </h3>
          <div className="flex items-center space-x-6">
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

        {/* Yes/No Options */}

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
            (Applications choosing without Aadhaar authentication need to visit
            the RTO office for document verification and LL test in person)
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageTwo;
