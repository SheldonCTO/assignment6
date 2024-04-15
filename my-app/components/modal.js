export default function Modal({ onClose, children }) {
  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ position: "relative" }}>
            {children}
            <button
              type="button"
              className="btn-close"
              style={{ position: "absolute", top: 15, right: 15 }}
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}
