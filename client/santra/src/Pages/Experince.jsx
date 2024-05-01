import React, { useState } from "react";

const Experience = () => {
  // State to hold existing data and new data
  const [existingData, setExistingData] = useState([]);
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    // Add more fields as needed
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new form data to existing data
    setExistingData([...existingData, formData]);
    // Reset form data
    setFormData({
      field1: "",
      field2: "",
      // Reset other fields as needed
    });
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      {/* Display existing data */}
      {existingData.map((data, index) => (
        <div key={index}>
          <p>Field 1: {data.field1}</p>
          <p>Field 2: {data.field2}</p>
          {/* Display other fields as needed */}
        </div>
      ))}

      {/* Form for adding new data */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
          placeholder="Field 1"
        />
        <input
          type="text"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
          placeholder="Field 2"
        />
        {/* Add other form fields as needed */}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Experience;
