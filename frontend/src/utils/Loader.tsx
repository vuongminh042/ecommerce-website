const Loader = () => {
  return (
    <div className="fixed bg-black z-50 bg-opacity-55 top-0 h-screen flex justify-center items-center w-screen">
      <div className="h-19 w-19 animate-spin rounded-full border-6 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
