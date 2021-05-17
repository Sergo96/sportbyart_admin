// here is also pagination stuff whihc doesn't work properly

import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './Articles.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Redirect, useParams } from 'react-router';

const Articles = (props) => {
  const [articleData, setArticleData] = useState([]);

  console.log(articleData.articles);
  const [pageNumber, setPageNumber] = useState(); //here i have page numbers

  console.log('page number', pageNumber);

  const params = useParams();
  // here is params of page numbers
  let pageNumLink = params.page;

  console.log(articleData);

  let a = 0;

  // this is to go back function
  const history = useHistory();

  const userToken = props.token;

  const deletePost = (userId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
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

  // here i get pagination numbers from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/article/list/${pageNumLink}`
        );
        setArticleData(res.data.articles);
        setPageNumber(res.data.pageCount);
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

  if (pageNumber - pageNumLink < 10) {
    pagePlus = 0;
  }
  for (let i = pageNumLink - pageMinus; i < pageNumber + pagePlus; i++) {
    pagesArray.push(<Link to={`/articles/${i}`}>{i}</Link>);
  }

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
      <div className='pagination'>
        <a onClick={() => history.goBack()}>&laquo;</a>
        {pagesArray}

        <a href='#'>&raquo;</a>
      </div>
    </div>
  );
};

export default Articles;
