import React from "react";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function CustomToast({ toasts, setToasts }) {
  const toastContainers = toasts.map((toast, index) => (
    <Toast
      bg={toast.type}
      onClose={() => {
        const newArray = [...toasts];
        newArray[index].show = false;
        setToasts(newArray);
      }}
      show={toast.show}
      delay={4000}
      key={index}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{toast.title}</strong>
      </Toast.Header>
      <Toast.Body className="text-white fs-6">{toast.message}</Toast.Body>
    </Toast>
  ));

  return (
    <div>
      <ToastContainer className="p-4" position="top-end" style={{ zIndex: 1 }}>
        {toastContainers}
      </ToastContainer>
    </div>
  );
}

export default CustomToast;
