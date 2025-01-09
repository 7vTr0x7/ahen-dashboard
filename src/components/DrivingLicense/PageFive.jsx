import React from "react";

function PageFive() {
  return (
    <div className="rounded-lg">
      {/* Vehicle Type Selection */}
      <div className="mb-4">
        <select
          id="vehicleType"
          name="vehicleType"
          className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
        >
          <option value="lmv">LMV (Light Motor Vehicle) - Eg: Cars</option>
          <option value="mcwog">
            MCWOG (Motor Cycle Without Gear) - Eg: Activa, Jupiter
          </option>
          <option value="mcwg">
            MCWG (Motor Cycle With Gear) - Eg: Hero Honda
          </option>
        </select>
      </div>

      {/* Notes Section */}
      <div className="mb-4">
        <label
          htmlFor="vehicleType"
          className="block text-sm font-bold text-black-700"
        >
          Notes
        </label>
        <ul className="text-sm text-black-600 list-disc ml-5 mt-2">
          <li>LMV (Light Motor Vehicle) - Eg: Cars</li>
          <li>MCWOG (Motor Cycle Without Gear) - Eg: Activa, Jupiter</li>
          <li>MCWG (Motor Cycle With Gear) - Eg: Hero Honda</li>
        </ul>
      </div>

      {/* Booking Slot Section */}
      <h2 className="text-sm font-bold mb-1">
        Book Slot with Date <span className="text-red-500">*</span>
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        (Skip this question if you chose to submit via Aadhar authentication)
      </p>

      {/* Date Selection Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
          />
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
            className="mt-1 block w-full px-3 py-2 border border-black rounded-md text-gray-700"
          />
        </div>
      </div>

      {/* Notes Section */}
      <div>
        <p className="text-sm font-bold text-red-500 mb-3">Notes *</p>
        <p className="text-xs font-bold text-red-500 mb-2">
          (Only for without Aadhar authentication)
        </p>
        <p className="text-sm text-gray-600 mb-7">
          Select a date from the initial 15-day window, and we'll book your
          appointment based on slot availability at the Regional Transport
          Office within that timeframe. If your chosen dates aren't available,
          we'll secure the earliest slot after the initial 15 days.
        </p>
      </div>
    </div>
  );
}

export default PageFive;
