import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router';

const { TextArea } = Input;

const AddVideo = (props) => {
  const [getCategory, setGetCategory] = useState([]);
  const [getCategoryId, setGetCategoryId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [editValues, setEditValues] = useState([]);

  const userToken = props.token;
  const params = useParams();
  console.log(params);
  const resultsId = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/list/all`
        );
        setGetCategory(res.data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  const addVideo = async (event) => {
    const videoData = {
      title: videoTitle,
      description: videoDesc,
      video: videoLink,
      category_id: getCategoryId,
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/video/add`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `${userToken}`,
          },
          body: JSON.stringify(videoData),
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
          `${process.env.REACT_APP_API_URL}/video/get/${resultsId}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `${userToken}`,
            },
          }
        );
        setEditValues(res.data);
        setVideoTitle(res.data.title);
        setVideoDesc(res.data.description);
        setVideoLink(res.data.video);
        setGetCategoryId(res.data.category_id);
      } catch (err) {}
    };
    fetchData();
  }, [resultsId]);

  async function updateVideo() {
    let videoData = {
      video_id: resultsId,
      author_id: editValues.author_id,
    };

    if (videoTitle !== editValues.title) {
      videoData.title = videoTitle;
    }

    if (videoDesc !== editValues.description) {
      videoData.description = videoDesc;
    }

    if (videoLink !== editValues.video) {
      videoData.video = videoLink;
    }

    if (getCategoryId !== editValues.category_id) {
      videoData.category_id = getCategoryId;
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
      body: JSON.stringify(videoData),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/video/update`,
      requestOptions
    );
    const data = await response.json();
  }
  return (
    <div>
      <form action=''>
        <h1>Add video</h1>
        <h5> title</h5>

        <TextArea
          value={videoTitle}
          onChange={(input) => setVideoTitle(input.target.value)}
          placeholder='Title'
          autoSize
        />
        <div style={{ margin: '24px 0' }} />
        <h5> description</h5>

        <TextArea
          placeholder='description'
          value={videoDesc}
          onChange={(input) => setVideoDesc(input.target.value)}
          autoSize
        />
        <div style={{ margin: '24px 0' }} />
        <h5> VideoURL</h5>

        <TextArea
          placeholder='video'
          value={videoLink}
          onChange={(input) => setVideoLink(input.target.value)}
          autoSize
        />
        <div style={{ margin: '24px 0' }} />
        <div className='select__category'>
          <h5>Select category</h5>
          <select
            value={getCategoryId}
            onChange={(select) => setGetCategoryId(select.target.value)}
            className='form-select'
            style={{ marginBottom: '20px' }}
          >
            <option selected>Select</option>
            {getCategory.map((category) => (
              <option selected value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addVideo} type='button' className='btn btn-primary'>
          Submit
        </button>
        <button onClick={updateVideo} type='button' className='btn btn-primary'>
          Edit
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
