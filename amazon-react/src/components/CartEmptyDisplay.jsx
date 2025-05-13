import { NavLink } from "react-router-dom";

function CartEmptyDisplay() {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-[calc(100lvh_-_60px)] my-[-80px]">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full flex flex-col gap-2 items-center animate-float-in">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
          alt="Empty Cart"
          className="w-24 h-24 mx-auto animate-bounce duration-1000 opacity-80"
        />

        <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>

        <p className="text-gray-500 mb-4">
          Looks like you haven’t added anything yet.
        </p>

        <NavLink
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 hover:scale-105"
        >
          Start Shopping
        </NavLink>
      </div>
    </div>
  );
}
export default CartEmptyDisplay;
