import React from "react";

function PageFour() {
  return (
    <>
      <div>
        <h4 className="text-lg font-bold text-black-700 mb-4">
          Present address
        </h4>
      </div>
      {/* Personal Details Form */}
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="Flat" className="block text-base font-medium">
              House/Door/Flat No
              <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="Flat"
              name="Flat"
              placeholder="House/Door/Flat No"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="Station" className="block text-base font-medium">
              Street/Locality/Police Station
              <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="Station"
              name="Station"
              placeholder="Street/Locality/Police Station"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="Mark" className="block text-base font-medium">
              Location/Land Mark
              <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="Mark"
              name="Mark"
              placeholder="Location/Land Mark"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="Town" className="block text-base font-medium">
              Village/Town
              <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="Town"
              name="Town"
              placeholder="Village/Town"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="State">
              State<span className="text-red-700">*</span>
            </label>
            <div>
              <select
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
                name="whatever"
                id="State"
              >
                <option value="">State</option>
                <option value="1">Gujarat</option>
                <option value="2">Haryana</option>
                <option value="3">Himachal Pradesh</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="District">
              District<span className="text-red-700">*</span>
            </label>
            <div>
              <select
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
                name="whatever"
                id="District"
              >
                <option value="">District</option>
                <option value="1">Bhavnagar</option>
                <option value="2">Ahmedabad</option>
                <option value="3">Jamnagar</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label
              htmlFor="Taluk"
              className="block text-sm font-medium text-gray-700"
            >
              Taluk
              <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="Taluk"
              name="Taluk"
              placeholder="Taluk"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="code" className="block text-base font-medium">
              Pin code<span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Pin code"
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="RTO">
              RTO Office<span className="text-red-700">*</span>
            </label>
            <div>
              <select
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
                name="whatever"
                id="RTO"
              >
                <option value="">Other</option>
                <option value="1">Bhavnagar</option>
                <option value="2">Ahmedabad</option>
                <option value="3">Jamnagar</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <div>
        <div className="mb-4">
          <input type="radio" id="present" value="present" name="present" />
          <label
            className="py-1 px-3 cursor-pointer rounded-l text-lg font-medium text-black-700"
            htmlFor="present"
          >
            Same as present address
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold text-black-700 mb-4">
          Permanent Address
        </h4>
      </div>

      <div>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="Flat"
                className="block text-base font-medium text-gray-700"
              >
                House/Door/Flat No
                <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="Flat"
                name="Flat"
                placeholder="House/Door/Flat No"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Station"
                className="block text-base font-medium text-gray-700"
              >
                Street/Locality/Police Station
                <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="Station"
                name="Station"
                placeholder="Street/Locality/Police Station"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
                required
              />
            </div>

            <div>
              <label
                htmlFor="Mark"
                className="block text-base font-medium text-gray-700"
              >
                Location/Land Mark
                <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="Mark"
                name="Mark"
                placeholder="Location/Land Mark"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="Town"
                className="block text-base font-medium text-gray-700"
              >
                Village/Town
                <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="Town"
                name="Town"
                placeholder="Village/Town"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="State">
                State<span className="text-red-700">*</span>
              </label>
              <div>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
                  name="whatever"
                  id="State"
                >
                  <option value="">State</option>
                  <option value="1">Gujarat</option>
                  <option value="2">Haryana</option>
                  <option value="3">Himachal Pradesh</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="District">
                District<span className="text-red-700">*</span>
              </label>
              <div>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
                  name="whatever"
                  id="District"
                >
                  <option value="">District</option>
                  <option value="1">Bhavnagar</option>
                  <option value="2">Ahmedabad</option>
                  <option value="3">Jamnagar</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="Taluk"
                className="block text-base font-medium text-gray-700"
              >
                Taluk
                <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="Taluk"
                name="Taluk"
                placeholder="Taluk"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Pin code<span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                placeholder="Pin code"
                className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="RTO">
                RTO Office<span className="text-red-700">*</span>
              </label>
              <div>
                <select
                  className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
                  name="whatever"
                  id="RTO"
                >
                  <option value="">Other</option>
                  <option value="1">Bhavnagar</option>
                  <option value="2">Ahmedabad</option>
                  <option value="3">Jamnagar</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PageFour;
