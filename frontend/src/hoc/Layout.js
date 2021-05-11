import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Row, Col, Button } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import logoAdmin from '../assets/admin_logo.png';
import { Link, Redirect, useHistory } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayOut = (props) => {
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const history = useHistory();

  const handleClick = () => {
    history.push(`/searchResults/${search}`);
  };

  const homeClick = () => {
    history.push(`/`);
  };

  const onSearch = (value) => {
    setSearch(value);
    handleClick();
    sendSearch();
  };
  const { Search } = Input;

  console.log('search result', search);

  const sendSearch = async (event) => {
    // event.preventDefault();
    const searchDatas = {
      title: search,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/article/search`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchDatas),
        }
      );
      const json = await response.json();
      setSearchData(json);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{ background: '#ffffff', color: 'black' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'pointer',
            }}
            className='logo'
            onClick={homeClick}
          >
            <img style={{ width: '100px' }} src={logoAdmin} alt='' />
          </div>

          <Menu
            style={{ width: '100%' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            theme='light'
            mode='inline'
          >
            <SubMenu key='sub1' icon={<AppstoreOutlined />} title='Article'>
              <Menu.Item key='3'>
                <Link to='/addArticle'>Add Article</Link>
              </Menu.Item>
              <Menu.Item key='4'>
                <Link to='/articles'>Articles</Link>
              </Menu.Item>
              <SubMenu key='sub1-2' title='Submenu'>
                <Menu.Item key='5'>Option 5</Menu.Item>
                <Menu.Item key='6'>Option 6</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key='sub2' icon={<SettingOutlined />} title='Categories'>
              <Menu.Item key='7'>
                <Link to='/addCategory'>Add Category</Link>
              </Menu.Item>
              <Menu.Item key='8'>
                <Link to='/addSubCategory'>Add Subcategory</Link>
              </Menu.Item>
              <Menu.Item key='9'>
                <Link to='/categories'>Categories</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key='sub3' icon={<SettingOutlined />} title='Video'>
              <Menu.Item key='10'>
                <Link to='/addVideo'>Add Video</Link>
              </Menu.Item>
              <Menu.Item key='11'>
                <Link to='/videos'>Videos</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key='sub4' icon={<SettingOutlined />} title='Subscribers'>
              <Menu.Item key='12'>
                <Link to='/subscribers'>Subscribers</Link>
              </Menu.Item>
              <Menu.Item key='13'>
                <Link to='/sendLetterSubscriber'>
                  send letter to subscribers
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key='sub5' icon={<SettingOutlined />} title='Partners'>
              <Menu.Item key='14'>
                <Link to='/addPartners'>Add Partners</Link>
              </Menu.Item>
              <Menu.Item key='15'>
                <Link to='/partners'>Partners</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key='16'>
              <Link to='/comments'>Comments</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className='site-layout-sub-header-background'
            style={{ background: '#ffffff', color: '#1c1c1c' }}
          >
            <Menu mode='horizontal'>
              <SubMenu key='SubMenu' icon={<SettingOutlined />} title='User'>
                <Menu.ItemGroup title='Item 1'>
                  <Menu.Item key='setting:1'>
                    <Link to='/addUser'>Add User</Link>
                  </Menu.Item>
                  <Menu.Item key='setting:2'>
                    <Link to='/editUserList'>Edit Users</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='Item 2'>
                  <Menu.Item key='setting:3'>Logout</Menu.Item>
                  <Menu.Item key='setting:4'>Settings 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item disabled>
                <Search
                  placeholder='input search text'
                  onSearch={onSearch}
                  enterButton
                  // onClick={handleClick}
                  style={{ padding: '15px' }}
                />
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: '24px 16px 0', maxHeight: '100%' }}>
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 360 }}
            >
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default LayOut;
