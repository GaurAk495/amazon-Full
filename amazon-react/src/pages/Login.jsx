import { Link } from "react-router-dom";
import { apiClient } from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLoginStatus } from "../store/LogStatusSlice";
const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);
    const { email, password } = formObj;
    if (!email || !password) {
      console.log("Email or Password cannot be Empty");
      return;
    }

    try {
      const data = await apiClient.post("/api/auth/login", { email, password });
      console.log(data);
      const { success, message, error, token, user } = data;

      if (success) {
        console.log(message);
        localStorage.setItem("token", token);
        dispatch(setUserLoginStatus({ isLoggedIn: true, userInfo: user }));
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error.message || "Login failed:");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white border border-gray-300 p-6 rounded-md shadow-md">
        <div className="flex justify-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className="h-6"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>
        <form className="space-y-4" onSubmit={handleOnLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email or mobile phone number
            </label>
            <input
              type="text"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              required
            />
            <a
              href="#"
              className="text-xs text-blue-600 hover:underline mt-1 inline-block"
            >
              Forgot your password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold text-black rounded-sm"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon's{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Notice
          </a>
          .
        </p>

        <div className="mt-6 border-t border-gray-300 pt-4">
          <p className="text-sm text-gray-700 mb-2">New to Amazon?</p>
          <Link to="/signup">
            <button className="w-full py-2 px-4 border border-gray-400 rounded-sm text-sm font-medium hover:bg-gray-50">
              Create your Amazon account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
