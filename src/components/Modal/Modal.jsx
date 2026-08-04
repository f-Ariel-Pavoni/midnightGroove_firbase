const Modal = ({ children, onClose, titulo }) => {
  return (
    <div className="modal d-block">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
