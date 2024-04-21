import React, { useState } from 'react';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';

function SignInLogIn() {
  const [view, setView] = useState('signup'); // 'signup' or 'login'

  return (
    <div className="container mt-5">
      <div className="btn-group">
        <button
          onClick={() => setView('signup')}
          className={`btn ${view === 'signup' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setView('login')}
          className={`btn ${view === 'login' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Log In
        </button>
      </div>

      {view === 'signup' ? <SignUp /> : <SignIn />}
    </div>
  );
}

export default SignInLogIn;
