import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import BottomNav from './bottomNav';
import TopNav from './topNav';

const Layout = () => {
  return (
    <div>
      <Sidebar></Sidebar>
      <TopNav></TopNav>
      <BottomNav></BottomNav>
      <Outlet />
    </div>
  );
};

export default Layout;
