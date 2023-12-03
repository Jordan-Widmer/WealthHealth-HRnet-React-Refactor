import { createSlice } from '@reduxjs/toolkit';

// Setting up initial state
const initialState = {
  employees: [],
};

// Employees slice for Redux Toolkit
const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Action for adding a new employee
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
