import React from 'react';
import Link from 'next/link';
import { Divider } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import { LOGIN_PAGE } from 'settings/constant';
import SignUpForm from './SignUpForm';
import SocialLogin from '../SocialLogin';
import Wrapper, {
  Title,
  TitleInfo,
  Text,
  FormWrapper,
  BannerWrapper,
} from '../Auth.style';
// demo image
import signUpImage from 'assets/images/login-page-bg.jpg';
import tripFinder from 'assets/images/logo-alt.svg';

const SignUp = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Logo withLink linkTo="/" src={tripFinder} title="深度旅遊." />
        <Title>歡迎</Title>
        <TitleInfo>請註冊你的帳號</TitleInfo>
        <SignUpForm />
        <Divider> </Divider>
        {/* <SocialLogin /> */}
        <Text>
          已經有帳號嗎 &nbsp;
          <Link href={LOGIN_PAGE}>
            <a>前往登入</a>
          </Link>
        </Text>
      </FormWrapper>
      <BannerWrapper>
        <div
          style={{
            backgroundImage: `url(${signUpImage})`,
            backgroundPosition: 'center center',
            height: '100vh',
            backgroundSize: 'cover',
          }}
        />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignUp;
