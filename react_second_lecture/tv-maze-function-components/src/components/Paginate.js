import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

import "../App.css";

const Paginate = (props) => {

  const getPaginatedData = () => {};

  return (
    <div className="pagination">
      <Link to={`/shows/page/${Number(props.pageNum) - 1}`}>Previous</Link>
      <Link to={`/shows/page/${Number(props.pageNum) + 1}`}>Next</Link>
    </div>
  );
};
export default Paginate;
