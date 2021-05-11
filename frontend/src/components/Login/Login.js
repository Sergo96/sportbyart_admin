import React, { useState, useEffect } from 'react';
import './Login.css';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import logoAdmin from '../../assets/admin_logo.png';
import { useAuth } from '../../Auth/Auth';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 32,
  },
};
const tailLayout = {
  wrapperCol: {
    // offset: 8,
    // span: 16,
  },
};

const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const referrer = props.location.state ? props.location.state.referrer : '/';

  const loginAdmin = async (event) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, {
        username,
        password,
      })
      .then((result) => {
        if (result.status === 200) {
          setAuthTokens(result.data);
          localStorage.setItem('user', JSON.stringify(result.data));

          setLoggedIn(true);
          console.log('result', result.data);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
        console.log(e);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setAuthTokens(JSON.parse(user));
      setLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return <Redirect to={referrer} />;
  }

  return (
    <div className='login_form'>
      <div className='login_container'>
        <div className='login_logo'>
          <img src={logoAdmin} alt='' />
        </div>
        <Form
          {...layout}
          name='basic'
          initialValues={{
            remember: true,
          }}
          onSubmitCapture={loginAdmin}
        >
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              value={username}
              onChange={(input) => setUsername(input.target.value)}
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(input) => setPassword(input.target.value)}
              placeholder='Password'
            />
            {isError && (
              <div>
                <h1
                  style={{
                    color: 'red',
                    fontWeight: 600,
                    fontSize: '22px',
                    lineHeight: '140%',
                  }}
                >
                  The username or password provider were incorrect.
                </h1>
              </div>
            )}
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type='primary'
              style={{
                backgroundColor: '#FBA919',
                border: 'none',
                width: '100%',
              }}
              htmlType='submit'
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
