import React from 'react';
import { Signup as SignupComponent } from '@/components';

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
