import "./styles.css";
import React, { useCallback } from 'react';
import Select from "react-select";
import { useForm, useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addToEmployeesList } from "../../store/employeeDataSlice";
import { states, departments } from "../../variables";

const Form = ({ setModalIsOpen }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      birthdate: '',
      startDate: '',
      street: '',
      city: '',
      zipCode: '',
      state: null,
      department: null,
    }
  });

  const { field: stateField } = useController({ name: "state", control });
  const { field: departmentField } = useController({ name: "department", control });

  const subForm = useCallback((data) => {
    if (data.department && data.state) {
      setModalIsOpen(true);
      dispatch(addToEmployeesList(data));
    }
  }, [setModalIsOpen, dispatch]);

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: "400px",
      border: "none",
      background: "#E5EEF4",
      borderRadius: "none",
      marginBottom: "2.2em",
      padding: "4.5px",
      boxShadow: "none",
    }),
  };

  const customInputStyles = {
    width: "400px",
    border: "none",
    background: "#E5EEF4",
    borderRadius: "none",
    padding: "12px",
  };

  return (
    <form onSubmit={handleSubmit(subForm)} aria-labelledby="employee-form">
      <h1 id="employee-form">Employee Form</h1>
      <div className="flexSection">
        <div>
          <div className="labelContainer">
            <label htmlFor="firstname">First Name</label>
            <input
              className={errors.firstname ? "errorInput" : "input"}
              placeholder="Enter first name"
              id="firstname"
              type="text"
              {...register("firstname", { required: "Please provide this field" })}
            />
            <p className="errorMessage">{errors.firstname?.message}</p>
          </div>
          
          <div className="labelContainer">
            <label htmlFor="lastname">Last Name</label>
            <input
              className={errors.lastname ? "errorInput" : "input"}
              placeholder="Enter last name"
              id="lastname"
              type="text"
              {...register("lastname", { required: "Please provide this field" })}
            />
            <p className="errorMessage">{errors.lastname?.message}</p>
          </div>

          <div className="labelContainer">
            <label htmlFor="birthdate">Birth Date</label>
            <input
              style={customInputStyles}
              className={errors.birthdate ? "errorInput" : "input"}
              id="birthdate"
              type="date"
              {...register("birthdate", { required: "Please provide this field" })}
            />
            <p className="errorMessage">{errors.birthdate?.message}</p>
          </div>

          <div className="labelContainer">
            <label htmlFor="startDate">Start Date</label>
            <input
              style={customInputStyles}
              type="date"
              id="startDate"
              className={errors.startDate ? "errorInput" : "input"}
              {...register("startDate", { required: "Please provide this field" })}
            />
            <p className="errorMessage">{errors.startDate?.message}</p>
          </div>
        </div>
        
        <div>
          <fieldset className="fieldset">
            <div className="labelContainer">
              <label htmlFor="street">Street</label>
              <input
                className={errors.street ? "errorInput" : "input"}
                placeholder="Enter street name"
                id="street"
                type="text"
                {...register("street", { required: "Please provide this field" })}
              />
              <p className="errorMessage">{errors.street?.message}</p>
            </div>

            <div className="labelContainer">
              <label htmlFor="city">City</label>
              <input
                className={errors.city ? "errorInput" : "input"}
                placeholder="Enter city name"
                id="city"
                type="text"
                {...register("city", { required: "Please provide this field" })}
              />
              <p className="errorMessage">{errors.city?.message}</p>
            </div>

            <div className="labelContainer">
              <label htmlFor="state-select">State</label>
              <Select
                inputId="state-select"
                styles={customSelectStyles}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.abbreviation}
                isClearable
                options={states}
                {...stateField}
              />
              <p className="errorMessage">{errors.state?.message}</p>
            </div>

            <div className="labelContainer">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                className={errors.zipCode ? "errorInput" : "input"}
                placeholder="Enter Zip code"
                id="zipCode"
                type="text"
                {...register("zipCode", { required: "Please provide this field" })}
              />
              <p className="errorMessage">{errors.zipCode?.message}</p>
            </div>
          </fieldset>
          
          <div className="labelContainer">
            <label htmlFor="department-select">Department</label>
            <Select
              inputId="department-select"
              styles={customSelectStyles}
              isClearable
              options={departments}
              {...departmentField}
            />
            <p className="errorMessage">{errors.department?.message}</p>
          </div>
        </div>
      </div>
      
      <button type="submit" className="submit">Create Employee!</button>
    </form>
  );
};

export default Form;
