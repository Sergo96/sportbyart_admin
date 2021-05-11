import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EditUserList = (props) => {
  let a = 0;
  const [users, setUsers] = useState([]);
  console.log('users', users);

  const userToken = props.token;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/list`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `${userToken}`,
            },
          }
        );
        setUsers(res.data);
      } catch (err) {}
    };
    fetchBlogs();
  }, []);

  const deleteUser = (userId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
      // authorization: `${userToken}`,
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
    // This makes it so you don't have to bind component functions like `setState`
    // to the component.
    fetch(
      `${process.env.REACT_APP_API_URL}/user/delete/` + userId,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div>
      <h4>Article's list</h4>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>username</th>
            <th scope='col'>email</th>
            <th scope='col'>root</th>
            <th scope='col'>Last LogedIn</th>
            <th scope='col'>Edit Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <th scope='row'>{a++}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.root}</td>
                <td>{user.last_login}</td>

                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    className='btn btn-primary btn-sm'
                    to={`/editUser/${user._id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditUserList;
