import { NavLink } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import Modal from "../components/Modal";

// Lazy load the Form component
const Form = lazy(() => import("../components/Form"));

/**
 * This component represents the home page of your application.
 * @returns {JSX.Element} The JSX element representing the home page.
 */
const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <main>
      <h1 className="title">HRnet</h1>
      <NavLink to="/employees-list">View Current Employees</NavLink>
      <section>
        {/* <h2>Create Employee</h2> */}
        <Suspense fallback={<div className="loading-container">Loading Form...</div>}>
          <Form setModalIsOpen={setModalIsOpen} />
        </Suspense>
      </section>
      {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} />}
    </main>
  );
};

export default Home;
