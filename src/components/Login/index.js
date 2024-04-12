import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import "./index.css"

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onChangeUsername = event => {
    setUsername(event.target.value);
  };

  const onChangePassword = event => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    });
    navigate('/home');
  };

  const onSubmitFailure = errorMsg => {
  
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async event => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = 'https://apis.ccbp.in/login';
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        onSubmitSuccess(data.jwt_token);
      } else {
        onSubmitFailure(data.error_msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
      onSubmitFailure('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className='login-bg-container'>
      <form className="login-card" onSubmit={submitForm}>
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            placeholder='ENTER USERNAME:rahul' //username:rahul, password:rahul@2021
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field" placeholder='PASSWORD:rahul@2021'
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <button>SingUp</button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      
      </form>
    </div>
  );
};

export default LoginForm;
