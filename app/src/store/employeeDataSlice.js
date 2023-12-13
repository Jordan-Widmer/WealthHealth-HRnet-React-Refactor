import { createSlice } from "@reduxjs/toolkit";

// Setting up initial state
const initialState = {
  employees: [],
};

/**
 * Redux slice for managing employees.
 * @type {import("@reduxjs/toolkit").Slice}
 */
const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    /**
     * Action for adding a new employee.
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the new employee data.
     */
    addToEmployeesList(state, action) {
      const newEmployee = action.payload;
      state.employees.push(newEmployee);
    },
  },
});

// Destructuring and exporting the reducer and actions
const { reducer: employeesReducer, actions } = employeesSlice;
export const { addToEmployeesList } = actions;
export default employeesReducer;
