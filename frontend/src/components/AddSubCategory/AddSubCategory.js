import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const AddSubCategory = (props) => {
  const [subCategoryName, subSubCategoryName] = useState('');
  const [getCategory, setGetCategory] = useState([]);
  const [getCategoryId, setGetCategoryId] = useState('');

  const [getSubCategoryEdit, setSubGetCategoryEdit] = useState([]);

  console.log(getSubCategoryEdit);

  const params = useParams();
  console.log(params);
  // this id for updating categories
  const resultsId = params.id;

  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('token') || ''
  );

  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
  };
  const userToken = props.token;

  // to get category list
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

  // function to add sub category
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
  //  to get sub category values
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/sub-category/get/${resultsId}`
        );
        setSubGetCategoryEdit(res.data);
        setGetCategoryId(res.data.category);
        subSubCategoryName(res.data.title);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log(fetchData());
  }, []);

  // to edit sub categories
  async function updateSubCategory() {
    let subCategoryData = {
      subCategory_id: resultsId,
    };

    if (subCategoryName !== getSubCategoryEdit.title) {
      subCategoryData.title = subCategoryName;
    }

    const requestOptions = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
      body: JSON.stringify(subCategoryData),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/sub-category/update`,
      requestOptions
    );
    const data = await response.json();
  }

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
        <button
          style={{ marginTop: '20px' }}
          onClick={updateSubCategory}
          type='button'
          className='btn btn-primary'
        >
          Edit Subcategory
        </button>
      </div>
    </form>
  );
};

export default AddSubCategory;
