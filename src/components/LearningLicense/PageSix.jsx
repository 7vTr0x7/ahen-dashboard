import React from "react";

function PageSix() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="w-full rounded-md">
      {/* Form Header */}
      <form className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Address Proof Dropdown */}
          <div>
            <label
              htmlFor="address-proof"
              className="block text-black-700 font-bold mb-2"
            >
              Address Proof
            </label>
            <select
              id="address-proof"
              className="w-full border border-black-300 rounded-md shadow-sm p-2 focus:border-black-500"
            >
              <option>Select Address Proof</option>
            </select>
          </div>

          {/* Age Proof Dropdown */}
          <div>
            <label
              htmlFor="age-proof"
              className="block text-gray-700 font-bold mb-2"
            >
              Age Proof
            </label>
            <select
              id="age-proof"
              className="w-full border border-black-300 rounded-md shadow-sm p-2 focus:border-black-500"
            >
              <option>Select Age Proof</option>
            </select>
          </div>
        </div>

        {/* Instruction Section */}
        <div>
          <div className="mt-4 mb-3">
            <span className="text-lg font-semibold text-black-200">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* Passport Size Photo */}
              <div>
                <label
                  htmlFor="passport-photo"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Upload Passport Size Photo
                </label>
                <input
                  type="file"
                  id="passport-photo"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("passport-photo").click()
                  }
                  className="block w-full py-2 px-4 border border-black rounded-md shadow-sm"
                >
                  Upload
                </button>
              </div>

              {/* Blood Group Proof */}
              <div>
                <label
                  htmlFor="blood-group-proof"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Upload Blood Group Proof
                </label>
                <input
                  type="file"
                  id="blood-group-proof"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("blood-group-proof").click()
                  }
                  className="block w-full py-2 px-4 border border-black rounded-md shadow-sm"
                >
                  Upload
                </button>
              </div>

              {/* Address Proof Upload */}
              <div>
                <label
                  htmlFor="address-proof-upload"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Upload Address Proof
                </label>
                <input
                  type="file"
                  id="address-proof-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("address-proof-upload").click()
                  }
                  className="block w-full py-2 px-4 border border-black rounded-md shadow-sm"
                >
                  Upload
                </button>
              </div>

              {/* Age Proof Upload */}
              <div>
                <label
                  htmlFor="age-proof-upload"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Upload Age Proof
                </label>
                <input
                  type="file"
                  id="age-proof-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("age-proof-upload").click()
                  }
                  className="block w-full py-2 px-4 border border-black rounded-md shadow-sm"
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </form>
    </div>
  );
}

export default PageSix;
