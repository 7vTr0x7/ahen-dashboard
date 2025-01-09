import React from "react";

function PageThree() {
  return (
    <div className="w-full">
      <h4 className="text-lg font-medium text-black-700 mb-4">
        Name Of the Applicant (As Per Records)
        <span className="text-red-700">*</span>
      </h4>
      <form>
        {/* Personal Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
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
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
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
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
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
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender <span className="text-red-700">*</span>
            </label>
            <div className="flex items-center space-x-4 mt-1">
              <div>
                <input type="radio" id="male" value="male" name="gender" />
                <label htmlFor="male" className="ml-2">
                  Male
                </label>
              </div>
              <div>
                <input type="radio" id="female" value="female" name="gender" />
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
                />
                <label htmlFor="transgender" className="ml-2">
                  Transgender
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="emergencyContact"
              className="block text-sm font-medium text-gray-700"
            >
              Emergency Mobile No <span className="text-red-700">*</span>
            </label>
            <input
              type="tel"
              id="emergencyContact"
              name="emergencyContact"
              placeholder="Number"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
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
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
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
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
            >
              <option value="">Select</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="spouse">Spouse</option>
            </select>
          </div>
        </div>

        {/* Identification Marks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="idMark1"
              className="block text-sm font-medium text-gray-700"
            >
              Identification Mark 1 <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="idMark1"
              name="idMark1"
              placeholder="Mark 1"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="idMark2"
              className="block text-sm font-medium text-gray-700"
            >
              Identification Mark 2 <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="idMark2"
              name="idMark2"
              placeholder="Mark 2"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organ Donation <span className="text-red-700">*</span>
            </label>
            <p className="text-sm  text-gray-400">
              I am willing to donate my organs, In case of accidental death?
              (Please Tick if willing)
            </p>
            <div className="mt-1 flex items-center space-x-4">
              <div>
                <input
                  type="radio"
                  id="organYes"
                  value="yes"
                  name="organDonation"
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
                />
                <label htmlFor="organNo" className="ml-2">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PageThree;
