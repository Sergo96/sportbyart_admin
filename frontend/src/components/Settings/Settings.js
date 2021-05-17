import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const Settings = (props) => {
  const [aboutUsTitle, setAboutUsTitle] = useState('');
  const [aboutUsContent, setAboutUsContent] = useState('');
  const [aboutUsImage, setAboutUsImage] = useState('');
  const [aboutUsAuthorImg, setAboutUsAuthorImg] = useState('');
  const [aboutUsAuthorInfo, setAboutUsAuthorInfo] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [authorEmailPassword, setAuthorEmailPassword] = useState('');
  const [authorAddress, setAuthorAddress] = useState('');
  const [authorPhone, setAuthorPhone] = useState('');
  const [authorEmailForContact, setEmailAuthorForContact] = useState('');
  const [editAboutUsValues, setEditAboutUsValues] = useState([]); // here i have all values to display and edit

  console.log('values', editAboutUsValues);

  const userToken = props.token;

  // here i get all seting data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/settings`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `${userToken}`,
            },
          }
        );
        setEditAboutUsValues(res.data);
        setAboutUsTitle(res.data['0']['about_us_title']);
        setAboutUsContent(res.data['0']['about_us_content']);
        setAboutUsImage(res.data['0']['about_us_image']);
        setAboutUsAuthorImg(res.data['0']['about_us_author_image']);
        setAboutUsAuthorInfo(res.data['0']['about_us_author']);
        setAuthorEmail(res.data['0']['email_username']);
        setAuthorEmailPassword(res.data['0']['email_password']);
        setAuthorAddress(res.data['0']['address']);
        setAuthorPhone(res.data['0']['phone']);
        setEmailAuthorForContact(res.data['0']['email_for_contact']);
      } catch (err) {}
    };
    fetchData();
  }, []);

  // function to upload and edit
  async function updateSettings() {
    let settingsData = {
      // title: titleValue,
    };

    // conditions to check if value updated

    if (aboutUsTitle !== editAboutUsValues['0']['about_us_title']) {
      settingsData.about_us_title = aboutUsTitle;
    }
    if (aboutUsContent !== editAboutUsValues['0']['about_us_content']) {
      settingsData.about_us_content = aboutUsContent;
    }
    if (aboutUsImage !== editAboutUsValues['0']['about_us_image']) {
      settingsData.about_us_image = aboutUsImage;
    }
    if (aboutUsAuthorImg !== editAboutUsValues['0']['about_us_author_image']) {
      settingsData.about_us_author_image = aboutUsAuthorImg;
    }
    if (aboutUsAuthorInfo !== editAboutUsValues['0']['about_us_author']) {
      settingsData.about_us_author = aboutUsAuthorInfo;
    }
    if (authorEmail !== editAboutUsValues['0']['email_username']) {
      settingsData.email_username = authorEmail;
    }
    if (authorEmailPassword !== editAboutUsValues['0']['email_password']) {
      settingsData.email_password = authorEmailPassword;
    }
    if (authorAddress !== editAboutUsValues['0']['address']) {
      settingsData.address = authorAddress;
    }
    if (authorPhone !== editAboutUsValues['0']['phone']) {
      settingsData.phone = authorPhone;
    }
    if (authorEmailForContact !== editAboutUsValues['0']['email_for_contact']) {
      settingsData.email_for_contact = authorEmailForContact;
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
      body: JSON.stringify(settingsData),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/settings`,
      requestOptions
    );
    const data = await response.json();
  }

  return (
    <div>
      <h5>About us title</h5>
      <TextArea
        placeholder='About us title'
        autoSize
        style={{ marginBottom: '20px' }}
        value={aboutUsTitle}
        onChange={(input) => setAboutUsTitle(input.target.value)}
      />
      <h5>About us Content</h5>
      <TextArea
        placeholder='Autosize height with minimum and maximum number of lines'
        autoSize={{ minRows: 7, maxRows: 9 }}
        style={{ marginBottom: '20px' }}
        value={aboutUsContent}
        onChange={(input) => setAboutUsContent(input.target.value)}
      />

      <h5>General Image (URL)</h5>
      <TextArea
        placeholder='Image Link'
        autoSize
        style={{ marginBottom: '20px' }}
        value={aboutUsImage}
        onChange={(input) => setAboutUsImage(input.target.value)}
      />

      <h5>Author Image (URL)</h5>
      <TextArea
        placeholder='Image Link'
        autoSize
        style={{ marginBottom: '20px' }}
        value={aboutUsAuthorImg}
        onChange={(input) => setAboutUsAuthorImg(input.target.value)}
      />

      <h5>About us Author INFO</h5>
      <TextArea
        placeholder='Autosize height with minimum and maximum number of lines'
        autoSize={{ minRows: 3, maxRows: 5 }}
        style={{ marginBottom: '20px' }}
        value={aboutUsAuthorInfo}
        onChange={(input) => setAboutUsAuthorInfo(input.target.value)}
      />

      <div style={{ marginBottom: '20px' }} className='form-group'>
        <label style={{ fontSize: '20px' }} for='exampleInputEmail1'>
          Write your(Author) Email
        </label>
        <input
          type='email'
          className='form-control'
          aria-describedby='emailHelp'
          placeholder='Enter email'
          value={authorEmail}
          onChange={(input) => setAuthorEmail(input.target.value)}
        />
      </div>
      <h5>Write your Email password</h5>
      <Input.Password
        style={{ marginBottom: '20px' }}
        placeholder='input password'
        value={authorEmailPassword}
        onChange={(input) => setAuthorEmailPassword(input.target.value)}
      />

      <h5>Address</h5>
      <TextArea
        placeholder='Address'
        autoSize
        style={{ marginBottom: '20px' }}
        value={authorAddress}
        onChange={(input) => setAuthorAddress(input.target.value)}
      />

      <div style={{ marginBottom: '20px' }} className='form-group'>
        <label style={{ fontSize: '20px' }} for='exampleInputEmail1'>
          Phonenumber
        </label>
        <input
          type='number'
          className='form-control'
          placeholder='Phonenumber'
          value={authorPhone}
          onChange={(input) => setAuthorPhone(input.target.value)}
        />
      </div>
      <div style={{ marginBottom: '20px' }} className='form-group'>
        <label style={{ fontSize: '20px' }} for='exampleInputEmail1'>
          Email for contact
        </label>
        <input
          type='email'
          className='form-control'
          aria-describedby='emailHelp'
          placeholder='email for contact'
          value={authorEmailForContact}
          onChange={(input) => setEmailAuthorForContact(input.target.value)}
        />
      </div>

      <button
        onClick={updateSettings}
        type='button'
        className='btn btn-primary'
      >
        Save
      </button>
    </div>
  );
};

export default Settings;
