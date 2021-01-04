import React from "react";

const Spinner = ({ color = "#431785", size = "50px", height = "50px" }) => {
  return (
    <>
      <div id="loader-container">
        <div id="loader"></div>
      </div>
      <style>{`
        #loader-container {
          width: 100%;
          height: ${height};
          position: relative;
        }
        #loader {
          border: 5px solid ${color};
          border-top: 5px solid transparent;
          border-radius: 50%;
          width: ${size};
          height: ${size};
          animation: spin 2s linear infinite;
          position: absolute;
          margin: auto;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Spinner;
