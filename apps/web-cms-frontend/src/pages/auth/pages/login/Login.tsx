
import { ACCESS_TOKEN_KEY } from '@blog-frontend/shared';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { cache } from '@blog-frontend/core';
import { login } from '@cms/services/api.service';

// Import SVG icons
import EmailIcon from '@cms/assets/svgs/email-icon.svg';
import PasswordIcon from '@cms/assets/svgs/password-icon.svg';
import EyeIcon from '@cms/assets/svgs/eye-icon.svg';
import EyeOffIcon from '@cms/assets/svgs/eye-off-icon.svg';
import GoogleIcon from '@cms/assets/svgs/google-icon.svg';

// Validation schema
const loginSchema = yup.object().shape({
  identifier: yup
    .string()
    .required('Email or username is required')
    .min(3, 'Please enter a valid email or username'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long')
});

// Form data type
interface LoginFormData {
  identifier: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      identifier: '',
      password: ''
    }
  });



  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login data:', data);
      
      // Call login API
      const response = await login(data.identifier, data.password);
      console.log('Login response:', response);
      // Store user data in cache
      cache.setCache(ACCESS_TOKEN_KEY, response.data.accessToken);

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      // You can add error handling here (show toast, set error state, etc.)
    }
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign in to your account</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Make a new doc to bring your words, data,<br />
            and teams together. For free
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Identifier input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <img src={EmailIcon} alt="Email or Username" className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register('identifier')}
              placeholder="Email or Username"
              className={`w-full pl-12 shadow-xl pr-4 py-4 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:outline-none transition-all duration-200 ${                errors.identifier ? 'focus:ring-red-500 bg-red-50' : 'focus:ring-blue-500'
                }`}
            />
            {errors.identifier && (
              <p className="mt-1 text-sm text-red-600">{errors.identifier.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <img src={PasswordIcon} alt="Password" className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Password"
              className={`w-full pl-12 shadow-xl pr-12 py-4 border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-2 focus:outline-none transition-all duration-200 ${errors.password ? 'focus:ring-red-500 bg-red-50' : 'focus:ring-blue-500'
                }`}
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
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-2xl font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[0.98] ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white hover:bg-cyan-800'
              }`}
          >
            {isSubmitting ? 'Signing in...' : 'Get Started'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm ">
              <span className="px-4 bg-white text-gray-500 rounded-2xl">Or sign in with</span>
            </div>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center p-2 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
            <img src={GoogleIcon} alt="Google" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;