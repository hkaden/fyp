import React from 'react';
import Logo from 'components/UI/Logo/Logo';
import Footers from 'components/Footer/Footer';
import LogoImage from 'assets/images/logo-alt.svg';
import FooterMenu from './FooterMenu';

const Footer = ({ path }) => {
  return (
    <Footers
      path={path}
      logo={<Logo withLink linkTo="/"  title="深度旅遊." />}
      menu={<FooterMenu />}
      copyright={`Copyright @ ${new Date().getFullYear()} `}
    />
  );
};

export default Footer;
