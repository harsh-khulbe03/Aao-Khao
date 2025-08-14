const Shimmer = () => {
  return (
    <div
      data-testid="shimmer"
      className="flex flex-wrap justify-center gap-5 mt-24 max-w-6xl mx-auto"
    >
      {Array(16)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="h-64 w-64 bg-slate-200 rounded-xl animate-pulse mr-4"
          ></div>
        ))}
    </div>
  );
};

export default Shimmer;
