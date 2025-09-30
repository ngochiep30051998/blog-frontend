
import { LOCAL_USER_KEY } from '@blog-frontend/shared';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import cache from '@blog-frontend/core';

// Import SVG icons
import LoginIcon from '@cms/assets/svgs/login-icon.svg';
import EmailIcon from '@cms/assets/svgs/email-icon.svg';
import PasswordIcon from '@cms/assets/svgs/password-icon.svg';
import EyeIcon from '@cms/assets/svgs/eye-icon.svg';
import EyeOffIcon from '@cms/assets/svgs/eye-off-icon.svg';
import GoogleIcon from '@cms/assets/svgs/google-icon.svg';
import FacebookIcon from '@cms/assets/svgs/facebook-icon.svg';
import AppleIcon from '@cms/assets/svgs/apple-icon.svg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    cache.setCache(LOCAL_USER_KEY, { token: 'ssss' });
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-pink-100 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Main login card */}
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in with email</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Make a new doc to bring your words, data,<br />
            and teams together. For free
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
          {/* Email input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <img src={EmailIcon} alt="Email" className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              required
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <img src={PasswordIcon} alt="Password" className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <img 
                src={showPassword ? EyeOffIcon : EyeIcon} 
                alt={showPassword ? 'Hide password' : 'Show password'} 
                className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
              />
            </button>
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[0.98]"
          >
            Get Started
          </button>
        </form>

        {/* Divider */}
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign in with</span>
            </div>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
            <img src={GoogleIcon} alt="Google" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;