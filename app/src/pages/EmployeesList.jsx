import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Table from "../components/Table";

const EmployeesList = () => {
  const list = useSelector((state) => state.employees);

  // Map over the list and transform state and department objects to strings
  const formattedList = list.map((item) => ({
    ...item,
    state: item.state.name, // Assuming the state object has a 'name' property
    department: item.department.label, // Assuming the department object has a 'label' property
  }));

  return (
    <main id="employee-div" className="container">
      <h1>Current Employees</h1>
      <Table list={formattedList} />
      <NavLink to="/">Home</NavLink>
    </main>
  );
};

export default EmployeesList;
