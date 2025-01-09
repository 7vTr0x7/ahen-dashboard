import React from "react";

function PageEight() {
  return (
    <div className="">
      <h5 className="text-lg font-bold text-black-700 mb-4">Declarations:</h5>

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
          <p className="text-sm font-semibold text-black-600 mb-2">
            {item.question}
          </p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                id={`yes-${index}`}
                value="Yes"
                name={`question-${index}`}
                className="form-radio"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                id={`no-${index}`}
                value="No"
                name={`question-${index}`}
                className="form-radio"
              />
              <span>No</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PageEight;
