import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { FORGET_PASSWORD_PAGE } from 'settings/constant';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';
// import auth from 'context/AuthProvider'
import { AuthContext } from 'context/AuthProvider';
const SignInForm = () => {
  const { signIn } = useContext(AuthContext);
  const [MutationsignIn, { loading, error }] = useMutation(SIGN_IN, {
    onCompleted(data){
     // const { user, token } = data.signIn
      signIn(data.signIn)
    }
  });
  //const [todoInput, setTodoInput] = useState('');
  //const { signIn } = useContext(AuthContext);
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = ({ email, password }) => {
    console.log(email)
    MutationsignIn({
      variables: {
        email,
        password
      }
    })
    // signIn({variables: {email: data.email, password: data.password }, onCompleted({MutationsignIn}) {
    //   console.log(MutationsignIn)
    // }})
  };


  return (


          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl
              label="Email"
              htmlFor="email"
              error={
                errors.email && (
                  <>
                    {errors.email?.type === 'required' && (
                      <span>This field is required!</span>
                    )}
                    {errors.email?.type === 'pattern' && (
                      <span>請輸入有效的Email</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<Input />}
                type="email"
                id="email"
                name="email"
                defaultValue=""
                control={control}
                rules={{
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                }}
              />
            </FormControl>
            <FormControl
              label="密碼"
              htmlFor="password"
              error={
                errors.password && (
                  <>
                    {errors.password?.type === 'required' && (
                      <span>This field is required!</span>
                    )}
                    {errors.password?.type === 'minLength' && (
                      <span>密碼最少需要 6 個字符</span>
                    )}
                    {errors.password?.type === 'maxLength' && (
                      <span>Password must not be longer than 20 characters!</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<Input.Password />}
                defaultValue=""
                control={control}
                id="password"
                name="password"
                rules={{ required: true, minLength: 6, maxLength: 20 }}
              />
            </FormControl>
            <FieldWrapper>
              <SwitchWrapper>
                <Controller
                  as={<Switch />}
                  name="rememberMe"
                  defaultValue={false}
                  valueName="checked"
                  control={control}
                />
                <Label>記住我</Label>
              </SwitchWrapper>
              <Link href={FORGET_PASSWORD_PAGE}>
                <a>忘記密碼 ?</a>
              </Link>
            </FieldWrapper>
            <Button
              className="signin-btn"
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: '100%' }}
              loading={loading}
            >
              <MdLockOpen />
              登入
            </Button>
          </form>


  );
};

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        email
        name
        id
      }
      token
    }
  }
`;

export default SignInForm;
