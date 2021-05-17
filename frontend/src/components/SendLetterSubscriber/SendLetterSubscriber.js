import React, { useState } from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

const { TextArea } = Input;

const SendLetterSubscriber = (props) => {
  const userToken = props.token;
  const [subject, setSubject] = useState('');
  const [letter, setLetter] = useState('');

  const sendLetter = async (event) => {
    const letterData = {
      subject: subject,
      text: letter,
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/subscribe/send`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `${userToken}`,
          },
          body: JSON.stringify(letterData),
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
      <h1>Leteers</h1>
      <br />
      <br />
      <h5>Subject</h5>
      <Input
        placeholder='Subject'
        allowClear
        value={subject}
        onChange={(input) => {
          setSubject(input.target.value);
        }}
      />
      <br />
      <br />
      <h5>Letter</h5>
      <TextArea
        value={letter}
        onChange={(input) => {
          setLetter(input.target.value);
        }}
        rows={4}
      />
      <br />
      <br />
      <button onClick={sendLetter}>Submit</button>
    </div>
  );
};

export default SendLetterSubscriber;
