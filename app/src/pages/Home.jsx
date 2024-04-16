import { NavLink } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import Modal from 'modal_by_jsw';
import PropTypes from 'prop-types';

// Lazy load the Form component
const Form = lazy(() => import("../components/Form"));

/**
 * This component represents the home page of your application.
 * It manages the opening of a modal with dynamic messages based on form actions.
 * @returns {JSX.Element} The JSX element representing the home page.
 */
const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState('');  // To handle dynamic text for the modal

  // Function to open the modal with a specific message
  const handleOpenModal = (message) => {
    setModalText(message);
    setModalIsOpen(true);
  };

  return (
    <main>
      <h1 className="title">HRnet</h1>
      <NavLink to="/employees-list">View Current Employees</NavLink>
      <section>
        {/* Suspense used for lazy loading the Form, which now triggers modal with dynamic text */}
        <Suspense fallback={<div className="loading-container">Loading Form...</div>}>
          <Form setModalIsOpen={handleOpenModal} />
        </Suspense>
      </section>
      {/* Modal is now called with the dynamic text and a function to close it */}
      {modalIsOpen && <Modal setModalIsOpen={setModalIsOpen} text={"Employee Created!"} />}
    </main>
  );
};

export default Home;
