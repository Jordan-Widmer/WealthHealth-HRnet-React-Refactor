import Select from "react-select";
import { useForm, useController } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addToEmployeesList } from "../../store/employeeDataSlice";
import { states, departments } from "../../variables";
import { useCallback } from "react";

// eslint-disable-next-line react/prop-types
const Form = ({ setModalIsOpen }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const { field: stateField } = useController({ name: "state", control });
  const { field: departmentField } = useController({ name: "department", control });

  const subForm = useCallback((data) => {
    if (data.department && data.state) {
      setModalIsOpen(true);
      dispatch(addToEmployeesList(data));
    }
  }, [setModalIsOpen, dispatch]);

  return (
    <form onSubmit={handleSubmit(subForm)} aria-labelledby="employee-form">
      <h1 id="employee-form">Employee Form</h1>
      
      <div className="labelContainer">
        <label htmlFor="firstname">First Name</label>
        <input
          className={errors.firstname ? "errorInput" : "input"}
          id="firstname"
          type="text"
          placeholder="First Name"
          {...register("firstname", { required: "Please provide this field" })}
        />
        <p className="errorMessage">{errors.firstname?.message}</p>
      </div>

      <div className="labelContainer">
        <label htmlFor="lastname">Last Name</label>
        <input
          className={errors.lastname ? "errorInput" : "input"}
          id="lastname"
          type="text"
          placeholder="Last Name"
          {...register("lastname", { required: "Please provide this field" })}
        />
        <p className="errorMessage">{errors.lastname?.message}</p>
      </div>

      <div className="labelContainer">
        <label htmlFor="birthdate">Birth Date</label>
        <input
          type="date"
          id="birthdate"
          className={errors.birthdate ? "errorInput" : "input"}
          {...register("birthdate", { required: "Please provide this field" })}
        />
        <p className="errorMessage">{errors.birthdate?.message}</p>
      </div>

      <div className="labelContainer">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          className={errors.startDate ? "errorInput" : "input"}
          {...register("startDate", { required: "Please provide this field" })}
        />
        <p className="errorMessage">{errors.startDate?.message}</p>
      </div>

      <fieldset>
        <legend>Address</legend>

        <div className="labelContainer">
          <label htmlFor="street">Street</label>
          <input
            className={errors.street ? "errorInput" : "input"}
            id="street"
            type="text"
            placeholder="Street"
            {...register("street", {
              required: "Please provide this field",
              pattern: {
                value: /^\s*\S+(?:\s+\S+){2}/,
                message: "Please provide valid data",
              },
            })}
          />
          <p className="errorMessage">{errors.street?.message}</p>
        </div>

        <div className="labelContainer">
          <label htmlFor="city">City</label>
          <input
            className={errors.city ? "errorInput" : "input"}
            id="city"
            type="text"
            placeholder="City"
            {...register("city", { required: "Please provide this field" })}
          />
          <p className="errorMessage">{errors.city?.message}</p>
        </div>

        <div className="labelContainer">
          <label htmlFor="state-select">State</label>
          <Select
            inputId="state-select"
            className="select-input"
            placeholder="Select your state"
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.abbreviation}
            isClearable
            options={states}
            {...stateField}
          />
          <p className="errorMessage">{errors.state?.message}</p>
        </div>

        <div className="labelContainer">
          <label htmlFor="zip-code">Zip Code</label>
          <input
            className={errors.zipCode ? "errorInput" : "input"}
            id="zipCode"
            type="text"
            placeholder="Zip Code"
            {...register("zipCode", {
              required: "Please provide this field",
              pattern: {
                value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                message: "Please provide valid data",
              },
            })}
          />
          <p className="errorMessage">{errors.zipCode?.message}</p>
        </div>
      </fieldset>

      <div className="labelContainer">
        <label htmlFor="department-select">Department</label>
        <Select
          inputId="department-select"
          className="select-input"
          placeholder="Select your department"
          isClearable
          options={departments}
          {...departmentField}
        />
        <p className="errorMessage">{errors.department?.message}</p>
      </div>

      <button type="submit" className="submit">Save</button>
    </form>
  );
};

export default Form;
