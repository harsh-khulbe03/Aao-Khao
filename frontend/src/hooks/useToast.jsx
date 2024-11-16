import React, { useState } from "react";

function useToast() {
  const [toast, setToast] = useState({
    visible: false,
    color: "",
    text: "",
  });

  const showToast = (color, message) => {
    setToast({ visible: true, color, text: message });
    setTimeout(() => setToast({ visible: false, color: "", text: "" }), 3000);
  };

  return {
    toast,
    showToast,
  };
}

export { useToast };
