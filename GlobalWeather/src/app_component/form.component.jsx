import React from "react";
import "./form.style.css";

const Form = props => {
  return (
    <div className="container h-100">
      <form onSubmit={props.loadweather}>
        <div>{props.error ? error() : ""}</div>
        <div className="d-flex justify-content-center row">
        <div className="row">
            <div className="col">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="City"
              name="city"
              autoComplete="off"
            />
          </div>
          
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              name="country"
              autoComplete="off"
            />
          </div>
          </div>     
        </div>
        <div className="d-flex justify-content-center row mt-4">
            <button className="btn btn-outline-white waves-effect waves-light">Get Weather</button>
          </div>
      </form>
    </div>
  );
};

const error = props => {
  return (
    <div className="alert alert-danger mx-5" role="alert">
      Enter City and Country
    </div>
  );
};

export default Form;
