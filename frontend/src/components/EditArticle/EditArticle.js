import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const EditArticle = (props) => {
  const [editValues, setEditValues] = useState([]);
  const [changedValues, setChangedValues] = useState('');
  console.log('values', editValues);
  console.log('changed', changedValues);
  const params = useParams();
  console.log(params);
  const resultsId = params.id;
  console.log('string', resultsId);
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('token') || ''
  );

  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
    // setToken(data['dataValues']['token']);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/article/${resultsId}`
        );
        setEditValues(res.data);
      } catch (err) {}
    };
    fetchData();
  }, [resultsId]);

  const inputValue = editValues;

  const userToken = props.token;
  return (
    <div>
      <form value={{ authTokens, setAuthTokens: setTokens }}>
        <input
          defaultValue={editValues.title}
          value={changedValues}
          onChange={(input) => setChangedValues(input.target.value)}
          type='text'
        />
        {/* yooooo */}
        {/* </input> */}
        <input
          defaultValue={editValues.shortDesc}
          value={changedValues}
          onChange={(input) => setChangedValues(input.target.value)}
          type='text'
        />
        <button type='submit'>send</button>
      </form>
    </div>
  );
};

export default EditArticle;
