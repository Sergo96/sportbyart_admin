import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const AddCategory = (props) => {
  const [categoryName, setCategoryName] = useState('');
  const [showInNav, setShowInNav] = useState();
  console.log(showInNav);
  console.log('category false', showInNav);
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem('token') || ''
  );

  const [getCategoryEdit, setGetCategoryEdit] = useState([]);
  console.log('edit category', getCategoryEdit);

  const setTokens = (data) => {
    localStorage.setItem('token', JSON.stringify(data));
    setAuthTokens(data);
  };
  // this token for authorization
  const userToken = props.token;
  const params = useParams();
  console.log(params);
  // this id for updating categories
  const resultsId = params.id;

  // this is the function to add category
  const addCategory = async (event) => {
    const categoryData = {
      title: categoryName,
      show_in_nav: showInNav, // this is very important this will show category in navbar
    };

    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/category/add`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `${userToken}`,
          },
          body: JSON.stringify(categoryData),
        }
      );

      const json = await response.json();
      console.log(JSON.stringify(json));
    } catch (err) {
      console.log(err);
    }
  };

  //  this is the get request to take categories data to display in fields to update!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/${resultsId}`
        );
        setGetCategoryEdit(res.data);
        setCategoryName(res.data.title);
        setShowInNav(res.data.show_in_nav);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    console.log(fetchData());
  }, [showInNav]);

  return (
    <form value={{ authTokens, setAuthTokens: setTokens }} action=''>
      <div className='addcategory'>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Category Name</span>
          </div>
          <input
            value={categoryName}
            onChange={(input) => setCategoryName(input.target.value)} // here i am taking values from inputs
            type='text'
            className='form-control'
          />
        </div>
        <div style={{ marginTop: '20px' }} className='form-check form-switch'>
          <input
            value={showInNav}
            onChange={() => setShowInNav(!showInNav)}
            type='checkbox'
            className='form-check-input'
          />
          <label htmlFor='flexSwitchCheckChecked' className='form-check-label'>
            Category for Navbar
          </label>
        </div>
        <button
          style={{ marginTop: '20px' }}
          onClick={addCategory}
          type='button'
          className='btn btn-primary'
        >
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
