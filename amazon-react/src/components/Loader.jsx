function Loader() {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 h-screen bg-white">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:.2s]"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce [animation-delay:.4s]"></div>
      </div>
    </>
  );
}
export default Loader;
