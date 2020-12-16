import React, { useContext } from 'react';
import { Menu } from 'antd';
import ActiveLink from 'library/helpers/activeLink';
import { AuthContext } from 'context/AuthProvider';
import {
  HOME_PAGE,
  LISTING_POSTS_PAGE,
  PRICING_PLAN_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
} from 'settings/constant';

const MobileMenu = ({ className }) => {
  // auth context
  const { loggedIn, logOut } = useContext(AuthContext);

  return (
    <Menu className={className}>
      <Menu.Item key="0">
        <ActiveLink href={HOME_PAGE}>行程</ActiveLink>
      </Menu.Item>
      <Menu.Item key="1">
        <ActiveLink href={LISTING_POSTS_PAGE}>Listing</ActiveLink>
      </Menu.Item>
      <Menu.Item key="2">
        <ActiveLink href={PRICING_PLAN_PAGE}>Pricing</ActiveLink>
      </Menu.Item>
      {loggedIn && (
        <Menu.Item key="3">
          <ActiveLink href={AGENT_ACCOUNT_SETTINGS_PAGE}>
            Account Settings
          </ActiveLink>
        </Menu.Item>
      )}
      {loggedIn && (
        <Menu.Item key="4">
          <button onClick={logOut}>登出</button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MobileMenu;
