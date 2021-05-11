import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubCategory = (props) => {
  const [subCategoryName, subSubCategoryName] = useState('');
  console.log('subcategoryname', subCategoryName);
  const [getCategory, setGetCategory] = useState([]);
  const [getCategoryId, setGetCategoryId] = useState('');
  console.log('category title', getCategoryId);

  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('token') || ''
  );

  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
  };
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
    console.log(fetchData());
  }, []);

  const addSubCategory = async (event) => {
    const subcategoryData = {
      title: subCategoryName,
      category: getCategoryId,
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/sub-category/add`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `${userToken}`,
          },
          body: JSON.stringify(subcategoryData),
        }
      );

      const json = await response.json();
      console.log(JSON.stringify(json));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form value={{ authTokens, setAuthTokens: setTokens }} action=''>
      <div className='addSubcategory'>
        <div style={{ margin: '24px 0' }} />
        <div className='select__category'>
          <h2>Select category</h2>
          <select
            value={getCategoryId}
            onChange={(select) => setGetCategoryId(select.target.value)}
            className='form-select'
            style={{ marginBottom: '20px' }}
          >
            {getCategory.map((category) => (
              <option selected value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Subcategory Name</span>
          </div>
          <input
            value={subCategoryName}
            onChange={(input) => subSubCategoryName(input.target.value)}
            type='text'
            className='form-control'
          />
        </div>

        <button
          style={{ marginTop: '20px' }}
          onClick={addSubCategory}
          type='button'
          className='btn btn-primary'
        >
          Add Subcategory
        </button>
      </div>
    </form>
  );
};

export default AddSubCategory;
