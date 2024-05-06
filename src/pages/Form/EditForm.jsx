import React, { useState, useEffect } from 'react';

const EditFormnih = ({ id_customer_service, onCancel }) => {
  const [formData, setFormData] = useState({
    title_issues: '',
    description_issues: '',
    rating: 0,
    image: null,
    id_division_target: 0,
    id_priority: 0,
  });

  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);

  useEffect(() => {
    fetch('https://simobile.singapoly.com/api/division-department')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.datas)) {
          setDepartmentOptions(
            data.datas.map((option) => ({
              value: option.id_division_target,
              label: option.division_department_name,
            })),
          );
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) =>
        console.error('Error fetching department options:', error),
      );

    fetch('https://simobile.singapoly.com/api/priority-issues')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.datas)) {
          setPriorityOptions(
            data.datas.map((option) => ({
              value: option.id_priority,
              label: option.priority_name,
            })),
          );
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) =>
        console.error('Error fetching priority options:', error),
      );

    fetch(
      `https://simobile.singapoly.com/api/trpl/customer-service/2255011002/${id_customer_service}`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.datas) && data.datas.length > 0) {
          const customerServiceData = data.datas[0];
          setFormData({
            title_issues: customerServiceData.title_issues,
            description_issues: customerServiceData.description_issues,
            rating: customerServiceData.rating,
            image: null,
            id_division_target: customerServiceData.id_division_target,
            id_priority: customerServiceData.id_priority,
          });
        } else {
          console.error('Form data not found:', data);
        }
      })
      .catch((error) => console.error('Error fetching form data:', error));
  }, [id_customer_service]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'image') {
          if (value) {
            formDataToSend.append(key, value);
          }
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      const response = await fetch(
        `https://simobile.singapoly.com/api/trpl/customer-service/2255011002/${id_customer_service}`,
        {
          method: 'POST',
          body: formDataToSend,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormData({
        title_issues: '',
        description_issues: '',
        rating: 0,
        image: null,
        id_division_target: 0,
        id_priority: 0,
      });

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again later.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Form elements */}
      </form>
    </div>
  );
};

export default EditFormnih;