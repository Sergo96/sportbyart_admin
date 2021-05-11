import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const [searchData, setSearchData] = useState([]);

  console.log(searchData);
  const params = useParams();
  console.log(params);
  const resultsId = params.str;
  console.log(resultsId);

  useEffect(() => {
    const searchDatas = {
      title: resultsId,
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchDatas),
    };
    fetch(`${process.env.REACT_APP_API_URL}/article/search`, requestOptions)
      .then((response) => response.json())
      .then((data) => setSearchData(data));
  }, [resultsId]);

  let a = 0;

  return (
    <div>
      <h4>Search Result</h4>
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
          {searchData.map((article) => {
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

export default SearchResults;
