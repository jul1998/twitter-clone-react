import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResponseComp = ({ show, handleModalClose, modalTitle, modalBody, modalBtn }) => {
  return (
    <>
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            {modalBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResponseComp;
