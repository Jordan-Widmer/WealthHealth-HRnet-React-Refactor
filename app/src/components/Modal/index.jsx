import './styles.css'

 // eslint-disable-next-line react/prop-types
 const Modal = ({ setModalIsOpen }) => {
   return (
     <div className="modal-background">
       <div className="modal-container">
         <button className="modal-closer" onClick={() => setModalIsOpen(false) }>x</button>
         <p>Employee Created!</p>
       </div>
     </div>
   );
 };

 export default Modal;