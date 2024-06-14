import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddNewEvent = () => {
  const [fields, setFields] = useState([{ id: 1, input: "", hsn: "", est_no: "" }]);

  const handleAddField = () => {
    setFields((prevFields) => {
      if (prevFields.length < 5) {
        return [...prevFields, { id: prevFields.length + 1, input: "", hsn: "", est_no: "" }];
      } else {
        alert("You can only add up to 5 inputs.");
        
        return prevFields;
      }
    });
  };

  const handleFieldChange = (e, index, type) => {
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, [type]: e.target.value } : field
    );
    setFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      inputs: fields.map((field) => field.input),
      hsns: fields.map((field) => field.hsn),
      est_no: fields.map((field) => field.est_no)
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/estimate/test",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setFields([{ id: 1, input: "", hsn: "", est_no: "" }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Enter Details</label>
        <div className="col-sm-10">
          <div id="fieldsContainer">
            {fields.map((field, index) => (
              <div className="fieldContainer" key={field.id}>
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Input"
                  value={field.input}
                  onChange={(e) => handleFieldChange(e, index, 'input')}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="HSN Number"
                  value={field.hsn}
                  onChange={(e) => handleFieldChange(e, index, 'hsn')}
                  required
                />
                <input
                  className="form-control mb-2"
                  type="text"
                  placeholder="Estimate Number"
                  value={field.est_no}
                  onChange={(e) => handleFieldChange(e, index, 'est_no')}
                  required
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={handleAddField}
      >
        Add Another Input
      </button>

      <div className="row mb-3">
        <div className="col-sm-10 offset-sm-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/item" style={{ textDecoration: "none" }} className="btn btn-primary">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default AddNewEvent;
