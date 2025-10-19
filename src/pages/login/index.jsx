import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import GoogleAuthButton from './components/GoogleAuthButton';
import SecurityBadges from './components/SecurityBadges';
import CreateAccountLink from './components/CreateAccountLink';
import DemoCredentials from './components/DemoCredentials';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated (mock check)
    const isAuthenticated = localStorage.getItem('cryptopayai_auth');
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_50%)]"></div>
      {/* Main Login Container */}
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="gradient-border glow-hover">
          <div className="gradient-border-content p-8">
            {/* Header */}
            <LoginHeader />
            
            {/* Login Form */}
            <LoginForm />
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            {/* Google Auth */}
            <GoogleAuthButton />
            
            {/* Demo Credentials */}
            <DemoCredentials />
          </div>
        </div>
        
        {/* Create Account Link */}
        <CreateAccountLink />
        
        {/* Security Badges */}
        <SecurityBadges />
        
        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>© {new Date()?.getFullYear()} CryptoPayAI. All rights reserved.</p>
          <p className="mt-1">Powered by Circle DCW & Firebase</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;