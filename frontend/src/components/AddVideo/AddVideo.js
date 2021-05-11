import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const AddVideo = (props) => {
  const [getCategory, setGetCategory] = useState([]);
  const [getCategoryId, setGetCategoryId] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const userToken = props.token;

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
      </form>
    </div>
  );
};

export default AddVideo;
