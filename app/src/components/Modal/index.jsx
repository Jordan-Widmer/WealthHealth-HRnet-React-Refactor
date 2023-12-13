import './styles.css'

/**
 * This component represents a modal for displaying a success message.
 * @param {Object} props - The component's props.
 * @param {Function} props.setModalIsOpen - A function to set the modal's open state.
 * @returns {JSX.Element} The JSX element representing the success modal.
 */

 // eslint-disable-next-line react/prop-types
const Modal = ({ setModalIsOpen }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="modal-closer" onClick={() => setModalIsOpen(false)}>x</button>
        <p>Employee Created!</p>
      </div>
    </div>
  );
};

export default Modal;
