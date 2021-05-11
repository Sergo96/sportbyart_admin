import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Videos = (props) => {
  const [videoData, setVideoData] = useState([]);

  let a = 0;
  const userToken = props.token;

  console.log(videoData);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/video/list/all`
        );
        setVideoData(res.data);
      } catch (err) {}
    };
    fetchBlogs();
  }, []);

  const deleteVideo = (videoId) => {
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
      `${process.env.REACT_APP_API_URL}/video/delete/` + videoId,
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
    <div className='videos'>
      <h4>Article's list</h4>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Title</th>
            <th scope='col'>Short Desc</th>
            <th scope='col'>Category</th>
            <th scope='col'>Author</th>
            <th scope='col'>Publication</th>
            <th scope='col'>Delete & Edit</th>
          </tr>
        </thead>
        <tbody>
          {videoData.map((video) => {
            return (
              <tr>
                <th scope='row'>{a++}</th>
                <td>{video.title}</td>
                <td>{video.description}</td>
                <td>{video.category_name}</td>
                <td>{video.author_username}</td>
                <td>{video.publication}</td>
                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      deleteVideo(video._id);
                    }}
                  >
                    Delete
                  </button>
                  <Link
                    className='btn btn-primary btn-sm'
                    to={`/EditArticle/${video._id}`}
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

export default Videos;
