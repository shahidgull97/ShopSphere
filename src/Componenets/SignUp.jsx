import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AtSign,
  Twitter,
  Facebook,
  Github,
  LogIn,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../Config/firebasedb";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../Redux/Reducers/User.Reducer";
import { signInThunk } from "../Redux/Reducers/User.Reducer";
import { toggelLogin } from "../Redux/Reducers/User.Reducer";

function SignUp() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector(userSelector);
  console.log(isLogin);
  const dispatch = useDispatch();

  function handleSignIn(e) {
    e.preventDefault();
    dispatch(signInThunk(formData))
      .unwrap()
      .then(() => {
        // Navigate after successful sign-in
        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.message); // Handle any error in the sign-in process
      });
  }

  // This is a sign function in firestore with inbuild authentication
  //   const signIn = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const userCredential = await signInWithEmailAndPassword(
  //         auth,
  //         formData.email,
  //         formData.password
  //       );
  //       const user = userCredential.user;
  //       setIsLogin(true);
  //       navigate("/");

  //       toast.success("SignIn Successfull");
  //     } catch (error) {
  //       toast.error(error.message);
  //       console.error("Error signing in:", error.message);
  //     }
  //   };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Implement your authentication logic here
  //     console.log(formData);
  //   };

  // This is function to sign up user on firestore
  const signUp = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        ...formData, // Additional fields like name, phone, etc.
        createdAt: new Date(),
      });
      navigate("/signin");
      toast.success("SignUn Successfull");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100  flex items-center justify-center p-4 ">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex  mt-20">
        {/* Left Side - Visual Design */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden hidden md:block">
          <div className="absolute inset-0 bg-[url('/api/placeholder/800/1200')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 p-12 text-white">
            <h2 className="text-4xl font-bold mb-6">
              {isLogin ? "Welcome Back!" : "Start Your Journey"}
            </h2>
            <p className="text-xl mb-10 opacity-80">
              {isLogin
                ? "Connect and continue your amazing experience"
                : "Create an account and unlock exclusive features"}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-1 bg-white/50 rounded"></div>
                <span>Quick {isLogin ? "Login" : "Signup"}</span>
                <div className="w-12 h-1 bg-white/50 rounded"></div>
              </div>
              <div className="flex space-x-4">
                <button className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition">
                  <Twitter className="text-white" />
                </button>
                <button className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition">
                  <Facebook className="text-white" />
                </button>
                <button className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition">
                  <Github className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          <form onSubmit={handleSignIn} className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-6">
              {isLogin ? "Login to Your Account" : "Create Account"}
            </h1>

            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!isLogin && (
              <div className="text-sm text-gray-600 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 rounded focus:ring-blue-500"
                />
                I agree to the Terms of Service and Privacy Policy
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full hover:opacity-90 transition flex items-center justify-center"
            >
              {isLogin ? "Login" : "Create Account"}
              <ArrowRight className="ml-2" />
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline"
              >
                {isLogin
                  ? "Need an account? Sign Up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
