// Here is the most importnat files with bunch of bugs

import React, { useState, useRef, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useParams } from 'react-router';

const { TextArea } = Input;

const AddArticle = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const [baseImages, setBaseImages] = useState([]);

  // here i created array to push slider images
  let slider_images = [];

  // slider_images.push(baseImages);
  console.log(slider_images);

  console.log('multiple images', baseImages);

  const [titleValue, setTitleValue] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [getCategory, setGetCategory] = useState([]);
  const [getSubCategory, setSubGetCategory] = useState([]);
  const [editValues, setEditValues] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);

  console.log('sliderimage', sliderImage);

  //  here i created array to push deleted images into one array and send put request to delete them! but here is one problem i could combine arrays here!
  let deleted_images = [];
  deleted_images.concat(sliderImage);

  console.log('deleted array', deleted_images);

  console.log('edit values', editValues);

  // here i take article id from url to get values of existing article to edit
  const params = useParams();
  const resultsId = params.id;

  const [getCategoryId, setGetCategoryId] = useState('');
  const [getSubCategoryId, setGetSubCategoryId] = useState('');

  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('token') || ''
  );

  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
  };

  const userToken = props.token;
  console.log(userToken);

  // here i am geting artilces valu to display them!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/article/${resultsId}`
        );
        setEditValues(res.data);
        setTitleValue(res.data.article.title);
        setShortDesc(res.data.article.shortDesc);
        setContent(res.data.article.content);
        setGetCategoryId(res.data.article.category_id);
        setGetSubCategoryId(res.data.article.subCategory_id);
        // setBaseImage(
        //   `${process.env.REACT_APP_API_URL}` + res.data.article.image
        // );

        // setBaseImages(res.data.slider);

        Object.keys(res.data.slider).forEach((key) => {
          console.log('keeey', key);
          const sliderKey = res.data.slider[key];
          slider_images.push(process.env.REACT_APP_API_URL + sliderKey.image);

          setBaseImages(slider_images);
        });
      } catch (err) {}
    };
    fetchData();
  }, [resultsId]);

  console.log('slider key', slider_images);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  // function to convert single image into base64
  const uploadImage = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const base64 = await covertBase64(file);
    // console.log(base64);
    setBaseImage(base64);
  };

  // function to convert multiple images into base64
  const uploadImages = async (e) => {
    console.log('dude this is', e.target.files);
    const file = e.target.files;

    for (let image of file) {
      console.log('imageee ------', image);
      const base64 = await covertBase64(image);
      // console.log('Sergo ---', base64);
      setBaseImages((prevState) => [...prevState, base64]);
    }

    // console.log(base64);
  };

  // function of converting base64
  const covertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // function to upload article
  const uploadArticle = async (event) => {
    const articletData = {
      title: titleValue,
      shortDesc: shortDesc,
      content: content,
      category: getCategoryId,
      subCategory: getSubCategoryId, // here is bug sometimes it takes sub category id sometimes not
      image: baseImage,
      slider: baseImages,
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/article/add`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `${userToken}`,
          },
          body: JSON.stringify(articletData),
        }
      );

      const json = await response.json();
      console.log(JSON.stringify(json));
    } catch (err) {
      // console.log(err);
    }
  };

  // function to get all categories
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

  // function to get sub categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/sub-category/list/${getCategoryId}`
        );

        setSubGetCategory(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
    console.log(fetchData());
  }, [getCategoryId]);

  // PUT request using fetch with async/await
  async function updatePost() {
    let articletData = {
      articleId: resultsId,
    };
    // here i am checking if value edited or not!
    if (titleValue !== editValues.article.title) {
      articletData.title = titleValue;
    }
    if (shortDesc !== editValues.article.shortDesc) {
      articletData.shortDesc = shortDesc;
    }
    if (content !== editValues.article.content) {
      articletData.content = content;
    }
    if (getCategoryId !== editValues.article.category_id) {
      articletData.category = getCategoryId;
    }
    if (getSubCategoryId !== editValues.article.subCategory_id) {
      articletData.subCategory = getSubCategoryId;
    }
    if (baseImage !== '') {
      articletData.image = baseImage;
    }

    // here filtering of images to send exactly base64 into newslider
    articletData.newSlider = baseImages.filter((image) => {
      return !image.includes(process.env.REACT_APP_API_URL); // here i had bugs but now it works! but need to be checked :-D
    });

    articletData.deleteSlider = deleted_images.map(
      (image) => image.replace(process.env.REACT_APP_API_URL, '') // here i am replacing the localhost url! and sending only path of image
    );

    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
      body: JSON.stringify(articletData),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/article/update`,
      requestOptions
    );
    const data = await response.json();
  }

  return (
    <form
      onSubmit={uploadArticle}
      value={{ authTokens, setAuthTokens: setTokens }}
    >
      <div style={{ background: 'white', padding: '20px' }}>
        <TextArea
          placeholder='title'
          autoSize
          value={titleValue}
          onChange={(input) => setTitleValue(input.target.value)} // here taking values
        />
        <div style={{ margin: '24px 0' }} />
        <TextArea
          placeholder='short desc'
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={shortDesc}
          onChange={(input) => setShortDesc(input.target.value)}
        />
        <div style={{ margin: '24px 0' }} />
        <div className='editor'>
          <JoditEditor
            ref={editor}
            placeholder='content'
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
        </div>

        <div style={{ margin: '24px 0' }} />
        <div className='select__category'>
          <h2>Select category</h2>
          <select
            value={getCategoryId}
            onChange={(select) => setGetCategoryId(select.target.value)}
          >
            {getCategory.map((category) => (
              <option value={category._id}>{category.title}</option>
            ))}
          </select>
        </div>

        <div className='select__subcategory'>
          <h2>Select subcategory</h2>

          <select
            value={getSubCategoryId}
            onChange={(select) => setGetSubCategoryId(select.target.value)}
          >
            {getSubCategory.map((subcategory) => (
              <option value={subcategory._id}>{subcategory.title}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '20px' }} className='image_upload'>
          <input
            type='file'
            onChange={(e) => {
              uploadImage(e);
            }}
          />
        </div>
        <img
          style={{
            width: '500px',
            display: 'flex',
            padding: '20px',
          }}
          src={baseImage}
          alt=''
        />

        <div style={{ marginTop: '30px' }} className='upload__images'>
          <h1>choose multiple pictures</h1>
          <input
            type='file'
            onChange={(e) => {
              uploadImages(e);
            }}
            multiple
          />
          {baseImages.map((i) => {
            // looping to show slider images
            return (
              <div
                style={{ display: 'flex', alignItems: 'center' }}
                className=''
              >
                <img
                  style={{
                    width: '500px',
                    display: 'flex',
                    padding: '20px',
                  }}
                  src={i}
                  alt=''
                />
                <input
                  value={i}
                  onChange={(e) => setSliderImage(e.target.value)}
                  type='checkbox'
                />
              </div>
            );
          })}
        </div>

        <button
          style={{ marginTop: '30px' }}
          type='button'
          onClick={uploadArticle}
        >
          Upload
        </button>

        <button type='button' onClick={updatePost}>
          Update
        </button>
      </div>
    </form>
  );
};

export default AddArticle;
