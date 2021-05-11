import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './Articles.css';
import { Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Articles = (props) => {
  const [articleData, setArticleData] = useState([]);

  // console.log(auxToFetchBoard);
  console.log(articleData);

  let a = 0;

  const history = useHistory();

  const userToken = props.token;
  console.log(userToken);

  // useEffect(fetchBoard, [auxToFetchBoard]);

  const deletePost = (userId) => {
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
      `${process.env.REACT_APP_API_URL}/article/delete/` + userId,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/article/list/all`
        );
        setArticleData(res.data);
      } catch (err) {}
    };
    fetchBlogs();
  }, []);

  return (
    <div className='articles'>
      <h4>Article's list</h4>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Title</th>
            <th scope='col'>Short Desc</th>
            <th scope='col'>Category</th>
            <th scope='col'>SubCategory</th>
            <th scope='col'>Publication</th>
            <th scope='col'>Delete & Edit</th>
          </tr>
        </thead>
        <tbody>
          {articleData.map((article) => {
            return (
              <tr>
                <th scope='row'>{a++}</th>
                <td>{article.title}</td>
                <td>{article.shortDesc}</td>
                <td>{article.category_name}</td>
                <td>{article.subCategory_name}</td>
                <td>{article.publication}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      deletePost(article._id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    className='btn btn-primary btn-sm'
                    to={`/EditArticle/${article._id}`}
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

export default Articles;
