import React, { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Input } from 'antd';

const AddPartners = (props) => {
  const [partnerImage, setPartnerImage] = useState('');
  const [partnerTitle, setPartnerTitle] = useState('');
  const [partnerUrl, setPartnerUrl] = useState('');

  const userToken = props.token;

  const uploadImage = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const base64 = await covertBase64(file);
    // console.log(base64);
    setPartnerImage(base64);
  };

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

  const uploadPartner = async (event) => {
    const PartnertData = {
      title: partnerTitle,
      url: partnerUrl,
      image: partnerImage,
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/partners/add`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `${userToken}`,
          },
          body: JSON.stringify(PartnertData),
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
        <h5>Title</h5>
        <Input
          value={partnerTitle}
          onChange={(input) => setPartnerTitle(input.target.value)}
          placeholder='Title'
        />
        <br />
        <br />
        <h5>URL</h5>
        <Input
          value={partnerUrl}
          onChange={(input) => setPartnerUrl(input.target.value)}
          placeholder='URL'
        />
        <br />
        <br />
        <h5>Image</h5>
        <input
          onChange={(e) => {
            uploadImage(e);
          }}
          type='file'
        />
        <button
          onClick={uploadPartner}
          type='button'
          className='btn btn-primary'
        >
          Primary
        </button>
      </form>
    </div>
  );
};

export default AddPartners;
