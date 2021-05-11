import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Form, Input } from 'antd';
import { useParams } from 'react-router';
import axios from 'axios';

const AddUser = (props) => {
  const [usernameAdd, setUsernameAdd] = useState('');
  console.log(usernameAdd);
  const [emailAdd, setEmailAdd] = useState('');
  console.log(emailAdd);
  const [passwordAdd, setPasswordAdd] = useState('');
  console.log(passwordAdd);
  const [editUser, setEditUser] = useState([]);

  console.log('user values', editUser);

  const userToken = props.token;

  const params = useParams();
  // console.log(params);
  const resultsId = params.id;

  console.log('user id', resultsId);

  const addUser = async (event) => {
    const userData = {
      username: usernameAdd,
      email: emailAdd,
      password: passwordAdd,
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/register`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `${userToken}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const json = await response.json();
      console.log(JSON.stringify(json));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${resultsId}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `${userToken}`,
            },
          }
        );
        setEditUser(res.data);
        setUsernameAdd(res.data.username);
        setEmailAdd(res.data.email);

        // setBaseImage(
        //   `${process.env.REACT_APP_API_URL}` + res.data.article.image
        // );

        // Object.keys(res.data.slider).forEach((key) => {
        //   console.log('keeey', key);
        //   const sliderKey = res.data.slider[key];
        //   setBaseImages(`${process.env.REACT_APP_API_URL}` + sliderKey.image);
        // });
      } catch (err) {}
    };
    fetchData();
  }, [resultsId]);

  async function updateUser() {
    let userData = {
      user_id: resultsId,
    };

    if (usernameAdd !== editUser.username) {
      userData.username = usernameAdd;
    }
    if (emailAdd !== editUser.email) {
      userData.email = emailAdd;
    }
    if (passwordAdd !== '') {
      userData.password = passwordAdd;
      console.log('yooooooooo');
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
      body: JSON.stringify(userData),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/update`,
      requestOptions
    );
    const data = await response.json();
    // setPostId(data.id);
  }

  return (
    <div className='add_user'>
      <form action=''>
        <div style={{ marginBottom: '20px' }} className='form-group'>
          <label for='exampleInputEmail1'>Username</label>
          <input
            value={usernameAdd}
            onChange={(input) => setUsernameAdd(input.target.value)}
            type='text'
            className='form-control'
            placeholder='Username'
          />
        </div>
        <div style={{ marginBottom: '20px' }} className='form-group'>
          <label for='exampleInputEmail1'>Email address</label>
          <input
            type='email'
            className='form-control'
            value={emailAdd}
            onChange={(input) => setEmailAdd(input.target.value)}
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
        </div>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          value={passwordAdd}
          onChange={(input) => setPasswordAdd(input.target.value)}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <button onClick={addUser} type='button' className='btn btn-primary'>
          Add
        </button>
        <button onClick={updateUser} type='button' className='btn btn-primary'>
          Ubpate
        </button>
      </form>
    </div>
  );
};

export default AddUser;
