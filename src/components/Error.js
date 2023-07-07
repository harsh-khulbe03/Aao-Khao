import { useRouteError } from "react-router-dom";

const Error = () => {
  const { status, statusText } = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-100 gap-5">
      <h1>
        <i class="fa-solid fa-circle-exclamation fa-2x"></i>
      </h1>
      <h1>Oops!!</h1>
      <h2> Something went wrong.</h2>
      <h2>{status + " " + statusText}.</h2>
    </div>
  );
};

export default Error;
