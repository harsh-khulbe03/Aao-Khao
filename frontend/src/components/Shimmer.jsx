const Shimmer = () => {
  return (
    <div
      data-testid="shimmer"
      className="flex flex-wrap mt-24 ml-12 w-[1460px]"
    >
      {Array(15)
        .fill("")
        .map((e, index) => (
          <div key={index} className="h-64 w-56 bg-slate-200 m-5 rounded-xl"></div>
        ))}
    </div>
  );
};

export default Shimmer;
