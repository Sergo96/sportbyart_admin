import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Partners = (props) => {
  const [partners, setPartners] = useState([]);
  let a = 0;
  const userToken = props.token;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/partners/get`
        );
        setPartners(res.data);
      } catch (err) {}
    };
    fetchBlogs();
  }, []);
  // funtion to delet partner
  const deletePartner = (partnerId) => {
    //deleting partner by id
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `${userToken}`,
      },
    };

    // Note: I'm using arrow functions inside the `.fetch()` method.
    // to the component.
    fetch(
      `${process.env.REACT_APP_API_URL}/partners/delete/` + partnerId,
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
    <div className='partners'>
      <h4>Partner's list</h4>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Title</th>
            <th scope='col'>URL</th>
            <th scope='col'>Delete & Edit</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => {
            return (
              <tr>
                <th scope='row'>{a++}</th>
                <td>{partner.title}</td>
                <td>{partner.url}</td>

                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      deletePartner(partner._id); // taking id here
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Partners;
