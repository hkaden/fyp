import React from 'react';
import Link from 'next/link';
import { Divider } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import { REGISTRATION_PAGE } from 'settings/constant';
import SignInForm from './SignInForm';
// import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  Text,
  FormWrapper,
  BannerWrapper,
} from '../Auth.style';
// demo image
import signInImage from 'assets/images/login-page-bg.jpg';
import tripFinder from 'assets/images/logo-alt.svg';

const SignIn = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Logo withLink linkTo="/" src={tripFinder} title="深度旅遊." />
        <Title>歡迎回來</Title>
        <TitleInfo>請登入你的帳號</TitleInfo>
        <SignInForm />
        {/* <Divider>Or log in with </Divider> */}
        {/* <SocialLogin /> */}
        <Text>
          沒有帳號嗎?&nbsp;
          <Link href={REGISTRATION_PAGE}>
            <a>前往註冊</a>
          </Link>
        </Text>
      </FormWrapper>
      <BannerWrapper>
        <div
          style={{
            backgroundImage: `url(${signInImage})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignIn;
