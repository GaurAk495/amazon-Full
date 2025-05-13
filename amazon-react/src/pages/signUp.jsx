import { Link } from "react-router-dom";
import { apiClient } from "../utils/apiClient";
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const navigate = useNavigate();
  const handleonSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const { email, username, password } = Object.fromEntries(form);

    // Basic validation
    if (!email || !username || !password) {
      console.warn("All fields are required.");
      // Optionally, show this in UI
      return;
    }

    // Optional: Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      console.warn("Invalid email format.");
      // Optionally, show this in UI
      return;
    }

    // Optional: Stronger password check
    if (password.length < 6) {
      console.warn("Password must be at least 6 characters.");
      // Optionally, show this in UI
      return;
    }

    try {
      const response = await apiClient.post("/api/auth/signup", {
        email,
        name: username,
        password,
      });
      const { success, message, error } = response;

      if (success) {
        console.log("Signup successful:", message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Signup failed:" || error.message);
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
        <h2 className="text-xl font-semibold mb-4">Create account</h2>
        <form
          className="space-y-4"
          onSubmit={handleonSubmit}
          autoComplete="off"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your name
            </label>
            <input
              type="text"
              name="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile number or email
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
              placeholder="At least 6 characters"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-sm"
              minLength="6"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              Passwords must be at least 6 characters.
            </p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-sm font-semibold text-black rounded-sm"
            >
              Continue
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

        <div className="mt-6 border-t border-gray-300 pt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
