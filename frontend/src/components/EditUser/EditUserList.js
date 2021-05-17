import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

const EditUserList = (props) => {
  let a = 0;
  const [users, setUsers] = useState([]);
  const [userPageNumber, setUserPageNumber] = useState();
  console.log('pages', userPageNumber);

  console.log('users', users);

  const userToken = props.token;

  const params = useParams();
  // here is params of page numbers
  let pageNumLink = params.page;

  // geting user data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/list/${pageNumLink}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `${userToken}`,
            },
          }
        );
        setUsers(res.data.users);
        setUserPageNumber(res.data.pageCount);
      } catch (err) {}
    };
    fetchBlogs();
  }, [pageNumLink]);

  // here is pagination logic which works horrible
  var pagesArray = [];
  let pageMinus = 3;
  let pagePlus = 10;

  if (pageNumLink < 3) {
    pageMinus = 0;
  }

  if (userPageNumber - pageNumLink < 10) {
    pagePlus = 0;
  }
  for (let i = pageNumLink - pageMinus; i < userPageNumber + pagePlus; i++) {
    pagesArray.push(<Link to={`/editUserList/${i}`}>{i}</Link>);
  }

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
      <h4>User's list</h4>
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
      <div className='pagination'>
        <a>&laquo;</a>
        {pagesArray}

        <a href='#'>&raquo;</a>
      </div>
    </div>
  );
};

export default EditUserList;
