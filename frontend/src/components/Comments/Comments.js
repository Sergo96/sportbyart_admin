import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

const Comments = (props) => {
  const userToken = props.token;
  const [getComments, setGetComments] = useState([]);
  const [commentPageNum, setCommentPageNum] = useState(); //here i have page numbers
  let a = 0;

  const params = useParams();
  // here is params of page numbers
  let pageNumLink = params.page;

  // this is to go back function
  const history = useHistory();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/comment/get/list/${pageNumLink}`
        );
        setGetComments(res.data.comments);
        setCommentPageNum(res.data.pageCount);
      } catch (err) {}
    };
    fetchBlogs();
  }, [pageNumLink]);

  const deleteComment = (commentId) => {
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
      `${process.env.REACT_APP_API_URL}/comment/delete/` + commentId,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  // here the same pagination bugs

  var pagesArray = [];
  let pageMinus = 3;
  let pagePlus = 10;

  if (pageNumLink < 3) {
    pageMinus = 0;
  }

  if (commentPageNum - pageNumLink < 10) {
    pagePlus = 0;
  }
  for (let i = pageNumLink - pageMinus; i < commentPageNum + pagePlus; i++) {
    pagesArray.push(<Link to={`/comments/${i}`}>{i}</Link>);
  }

  return (
    <div>
      <h4>Comment's list</h4>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>username</th>
            <th scope='col'>email</th>
            <th scope='col'>content</th>
            <th scope='col'>publication</th>
            <th scope='col'>Delete & Edit</th>
          </tr>
        </thead>
        <tbody>
          {getComments.map((comment) => {
            return (
              <tr>
                <th scope='row'>{a++}</th>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.content}</td>
                <td>{comment.publication}</td>

                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      deleteComment(comment._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <a onClick={() => history.goBack()}>&laquo;</a>
        {/*this button doesn't work */}
        {pagesArray}
        <a href='#'>&raquo;</a>
      </div>
    </div>
  );
};

export default Comments;
