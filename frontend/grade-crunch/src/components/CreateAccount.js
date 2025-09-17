import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {validateEmail} from "../lib/utils";
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const PasswordErrorMessage = ({ message = "Password must be between 8 and 12 characters" }) => {
    return (
        <div className="flex items-center gap-2 text-red-600 text-sm mt-1">
            <AlertCircle size={16} />
          <p>{message}</p>  
        </div>
    );
};

function SignIn({
    //child of CreateAccount component, inherits use states & functions
    email, setEmail,
    password, setPassword,
    showPassword, setShowPassword,
    clearForm,
    onToggleView
}) {
    const navigate = useNavigate();
    const[errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    
    //override validation, no name is required for sign in
    const validateForm = () => {
        return validateEmail(email) && password.value.length >= 1;
    };
    
    //override submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!validateForm()){
            setErrors({ submit: 'Please fill in all required fields' });
            return;
        }

        setIsLoading(true);
        setErrors({});

        try{
            const response = await api.post('/auth/signin', {
                email: email,
                password: password.value
            });

            //store auth token and user data
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            //navigate to dashboard
            navigate('/dashboard');
        } catch (error){
            console.error('Login error: ', error);

            if(error.response?.data?.message){
                setErrors({ submit: error.response.data.message });
            }
            else if(error.code === 'ECONNABORTED'){
                setErrors({ submit: 'Request timeout - please try again' });
            }
            else if(!error.response){
                setErrors({ submit: 'Network error - check your connection' });
            }
            else{
                setErrors({ submit: 'Login failed - please try again' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    //override password error - different requirement
    const getPasswordError = () => {
        return password.isTouched && password.value.length === 0;
    };

    const handleInputChange = (field, value) => {
        if(field === "email"){
            setEmail(value);
        }
        else if(field === "password"){
            setPassword({...password, value: value});
        }

        //clear errors when user starts typing
        if(errors.submit){
            setErrors({});
        }
    };

    return(
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your account</p>
            </div>


            <form onSubmit={handleSubmit}>
                {/*Email field */}
                <div className="mb-4">
                    <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                {/*Password field */}
                <div>
                    <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            id="signin-password"
                            type={showPassword ? "text" : "password"}
                            value={password.value}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            onBlur={() => setPassword({...password, isTouched: true})}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button> 
                    </div>
                    {getPasswordError() && (
                        <PasswordErrorMessage message="Password is required" />
                    )}
                </div>

                {/*Error message */}
                {errors.submit && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2 text-red-700 text-sm">
                            <AlertCircle size={16} />
                            <span>{errors.submit}</span>
                        </div>
                    </div>
                )}

                {/*Submit Button */}
                <button
                    type="submit"
                    disabled={!validateForm() || isLoading}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center space-y-2">
                <p className="text-gray-600">
                    <Link to="/forgot-password" className="text-gree-600 hover:text-green-700 font-medium transition-colors">
                        Forgot your password?
                    </Link>
                </p>
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button 
                        onClick={onToggleView}
                        className="text-green-600 hover:text-green-700 font-medium transition-colors"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
            
    );
};

function CreateAccount() {
    const navigate = useNavigate();

    //state to control the view (either sign up or sign in)
    const [currentView, setCurrentView] = useState('signup'); //could be 'signup' or 'signin'

    //initializing state for Create Account component
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState({
        value: "",
        isTouched: false,
      });

      const [showPassword, setShowPassword] = useState(false);

      //UI state
      const [errors, setErrors] = useState({});
      const [isLoading, setIsLoading] = useState(false);
      
    const validateForm = () => {
        return(
            username.trim() &&
            validateEmail(email) &&
            password.value.length >= 8
        );
    };

    const clearForm = () => {
        setUsername("");
        setEmail("");
        setPassword({
            value: "",
            isTouched: false,
        });
        setErrors({});
    };

    const handleSubmit = async (e) => {
       e.preventDefault();
       
       //client-side validation
       const validationErrors = {};
       if(!username.trim()) validationErrors.username = 'Username is required';
       if(!validateEmail(email)) validationErrors.email = 'Valid email is required';
       if(password.value.length < 8 || password.value.length > 12) validationErrors.password = 'Password must be between 8 and 12 characters';

       if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
       }

       setIsLoading(true);
       setErrors({});

       try{
        const response = await api.post('/auth/signup', {
            username: username.trim(),
            email: email,
            password: password.value
        });

        //store auth token and user data
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        //navigate to dashboard
        navigate('/dashboard')
       } catch (error){
        console.error('Sign up error: ', error);

        if(error.response?.data?.message){
            setErrors({ submit: error.response.data.message });
        }
        else if(error.code === 'ECONNABORTED') {
            setErrors({ submit: 'Request timeout - please try again '});
        }
        else if(!error.response){
            setErrors({ submit: 'Network error - check your connection' });
        }
        else{
            setErrors({ submit: 'Sign in failed - please try again' });
        }
       } finally {
            setIsLoading(false);
       }
    };

    const getPasswordError = () => {
        return password.isTouched && password.value.length < 8;
    };

    const toggleView = () => {
        setCurrentView(currentView === 'signup' ? 'signin' : 'signup');
        clearForm(); //clear form when switching views
    };

    const handleInputChange = (field, value) => {
        if(field === 'username'){
            setUsername(value);
        }
        else if(field === 'email'){
            setEmail(value);
        }
        else if(field === 'password'){
            setPassword({...password, value: value});
        }

        //clear field specific errors when user starts typing
        if(errors[field]){
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }

        //clear general submit errors
        if(errors.submit){
            setErrors(prev => ({
                ...prev,
                submit: ''
            }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 w-screen"
            style={{ 
                backgroundImage: "url('./images/background2.png')" 
             }}
        >
            <div className="w-full max-w-md">
                {/* Dynamic Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {currentView === 'signup' ? 'Create Account' : 'Welcome Back!'}
                    </h1>
                    <p className="text-gray-600">
                        {currentView === 'signup' ? 'Join us and start your journey' : 'Sign in to continue'}
                    </p>
                </div>

                {/* Form card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {currentView === 'signin' ? (
                        <SignIn
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                            clearForm={clearForm}
                            onToggleView={toggleView}
                        />
                    ) : (
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit}>
                            {/* Username field for sign up*/}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => handleInputChange('username', e.target.value)}
                                    placeholder="Enter your username"
                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 ${
                                        errors.username ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {errors.username && (
                                    <PasswordErrorMessage message={errors.username} />
                                )}
                            </div>

                            {/* Email field */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="Enter your email address"
                                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 ${
                                        errors.email ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {errors.email && (
                                    <PasswordErrorMessage message={errors.email} />
                                )}
                            </div>

                            {/* Password field */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password.value}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        onBlur={() => setPassword({...password, isTouched: true})}
                                        placeholder="Create a strong password"
                                        className={`w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 ${
                                            errors.password || getPasswordError() ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {(getPasswordError() || errors.password) && (
                                    <PasswordErrorMessage message={errors.password || "Password should be between 8 and 12 characters"} />
                                )}
                            </div>

                            {/*Error message */}
                            {errors.submit && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-700 text-sm">
                                        <AlertCircle size={16} />
                                        <span>{errors.submit}</span>
                                    </div>
                                </div>
                            )}

                            {/*Submit Button */}
                            <button
                                type="submit"
                                disabled={!validateForm() || isLoading}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:hover:bg-gray-300"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={toggleView}
                                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                    )}
                </div>

                {/* Terms */}
                {currentView === 'signup' && (
                <div className="mt-6 text-center bg-white/70 rounded-2xl">
                    <p className="text-sm text-gray-500">
                        By creating an account, you agree to our{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-700 transition-colors">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-700 transition-colors">
                            Privacy Policy
                        </Link>
                     </p>
                </div>
                )}
            </div>
        </div>
    );
};

export default CreateAccount;