const Toast = ({ visible, color, text }) => {
  if (!visible) return null;

  return (
    <div
      className={`${color} text-white w-96 px-6 py-3 flex items-center justify-center rounded-2xl fixed top-20 right-3 z-50 shadow-lg`}
    >
      <span className="text-white">{text}</span>
    </div>
  );
};

export default Toast;
