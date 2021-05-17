import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

const Subscribers = (props) => {
  const userToken = props.token;
  let a = 0;
  const [subscirbers, setSubscribers] = useState([]);
  const [subscriberPageNum, setSubscriberPageNum] = useState(); //here i have page numbers

  const params = useParams();
  // here is params of page numbers
  let pageNumLink = params.page;

  // this is to go back function
  const history = useHistory();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/subscribe/list/${pageNumLink}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              authorization: `${userToken}`,
            },
          }
        );
        setSubscribers(res.data.subscribers);
        setSubscriberPageNum(res.data.pageCount);
      } catch (err) {}
    };
    fetchBlogs();
  }, [pageNumLink]);

  const deleteSubscriber = (subscriberId) => {
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
      `${process.env.REACT_APP_API_URL}/subscribe/delete/` + subscriberId,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
  };

  // pagination code!

  var pagesArray = [];
  let pageMinus = 3;
  let pagePlus = 10;

  if (pageNumLink < 3) {
    pageMinus = 0;
  }

  if (subscriberPageNum - pageNumLink < 10) {
    pagePlus = 0;
  }
  for (let i = pageNumLink - pageMinus; i < subscriberPageNum + pagePlus; i++) {
    pagesArray.push(<Link to={`/subscribers/${i}`}>{i}</Link>);
  }

  return (
    <div className='subscribers'>
      <h4>Subscriber's list</h4>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Email</th>
            <th scope='col'>Delete & Edit</th>
          </tr>
        </thead>
        <tbody>
          {subscirbers.map((subscriber) => {
            return (
              <tr>
                <th scope='row'>{a++}</th>
                <td>{subscriber.email}</td>

                <td>
                  <button
                    className='btn btn-danger btn-sm'
                    style={{ marginRight: '10px' }}
                    onClick={() => {
                      deleteSubscriber(subscriber._id);
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
      <div className='pagination'>
        <a onClick={() => history.goBack()}>&laquo;</a>
        {/*this button doesn't work */}
        {pagesArray}
        <a href='#'>&raquo;</a>
      </div>
    </div>
  );
};

export default Subscribers;
