// import React from "react";
// import {
//   FE_ARKALOGICA_PARAM,
//   FE_ARKALOGICA_SUBMISSION_PARAM,
// } from "../constant";
// import { Link } from "react-router-dom";

// export default ({ previousQuestionId, nextQuestionId }) => {
//   return (
//     <div className="row mb-3">
//       <div className="col-10">
//         {previousQuestionId && (
//           <Link
//             to={`${FE_ARKALOGICA_PARAM}${previousQuestionId}`}
//             className="btn arkav-btn-outline"
//           >
//             Previous
//           </Link>
//         )}
//       </div>
//       <div className="col-2">
//         {nextQuestionId ? (
//           <Link
//             to={`${FE_ARKALOGICA_PARAM}${nextQuestionId}`}
//             className="btn arkav-btn"
//           >
//             Next
//           </Link>
//         ) : (
//           <Link
//             to={`${FE_ARKALOGICA_SUBMISSION_PARAM}`}
//             className="btn arkav-btn"
//           >
//             Confirm
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };
