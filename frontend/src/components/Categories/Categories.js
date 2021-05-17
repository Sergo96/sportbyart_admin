import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './Categories.css';
import { Collapse } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = (props) => {
  const { Panel } = Collapse;
  const [getCategory, setGetCategory] = useState([]);
  const [getSubCategory, setSubGetCategory] = useState([]);

  console.log(getSubCategory);

  let a = 0;
  let b = 0;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/sub-category/list`
        );
        setSubGetCategory(res.data);
      } catch (err) {}
    };
    fetchData();
    console.log(fetchData());
  }, []);

  function callback(key) {
    console.log(key);
  }

  const deleteCategory = (categoryId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
      // authorization: `${userToken}`,
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
    // This makes it so you don't have to bind component functions like `setState`
    // to the component.
    fetch(
      `${process.env.REACT_APP_API_URL}/category/delete/` + categoryId,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  const deleteSubCategory = (subcategoryId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
    // This makes it so you don't have to bind component functions like `setState`
    // to the component.
    fetch(
      `${process.env.REACT_APP_API_URL}/sub-category/delete/` + subcategoryId,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div>
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header='Categories' key='1'>
          <h4>Categories list</h4>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Delete & Edit</th>
              </tr>
            </thead>
            <tbody>
              {getCategory.map((category) => {
                return (
                  <tr>
                    <th scope='row'>{a++}</th>
                    <td>{category.title}</td>

                    <td>
                      <button
                        className='btn btn-danger btn-sm'
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                          deleteCategory(category._id);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        className='btn btn-primary btn-sm'
                        to={`/editCategory/${category._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
        <Panel header='Subcategories' key='2'>
          <h4>Subcategories list</h4>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Delete & Edit</th>
              </tr>
            </thead>
            <tbody>
              {getSubCategory.map((subcategory) => {
                return (
                  <tr>
                    <th scope='row'>{b++}</th>
                    <td>{subcategory.title}</td>

                    <td>
                      <button
                        className='btn btn-danger btn-sm'
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                          deleteSubCategory(subcategory._id);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        className='btn btn-primary btn-sm'
                        to={`/addSubCategory/${subcategory._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Categories;
