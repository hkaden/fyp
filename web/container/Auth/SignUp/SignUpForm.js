import React, { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MdLockOpen } from 'react-icons/md';
import { Input, Switch, Button, DatePicker } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { AuthContext } from 'context/AuthProvider';
import { FieldWrapper, SwitchWrapper, Label } from '../Auth.style';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

export default () => {
  const { signIn } = useContext(AuthContext);
  const { control, watch, errors, handleSubmit } = useForm({
    mode: 'onChange',
  });
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const [MutationsignUp, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted(data){
     // const { user, token } = data.signIn
     signIn(data.signUp)
    }
  });
  const onSubmit = ({name, email, password}) => {
    MutationsignUp({
      variables: {
        name,
        email,
        password
      }
    })
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        label="名字"
        htmlFor="name"
        error={
          errors.name && (
            <>
              {errors.name?.type === 'required' && (
                <span>This field is required!</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<Input />}
          id="name"
          name="name"
          defaultValue=""
          control={control}
          rules={{
            required: true,
          }}
        />
      </FormControl>
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
        label="生日日期"
        htmlFor="birthday"
      >
        <Controller
          as={<Input />}
          defaultValue="1990/1/1"
          control={control}
          id="birthday"
          name="birthday"
        />
      </FormControl>
      <FormControl
        label="地址"
        htmlFor="live"
      >
        <Controller
          as={<Input />}
          defaultValue=""
          control={control}
          id="live"
          name="live"
        />
      </FormControl>
      <FormControl
        label="電話號碼"
        htmlFor="phone"
      >
        <Controller
          as={<Input />}
          defaultValue=""
          control={control}
          id="phone"
          name="phone"
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
      <FormControl
        label="確認密碼"
        htmlFor="confirmPassword"
        error={
          confirmPassword &&
          password !== confirmPassword && (
            <span>兩個密碼不一樣!</span>
          )
        }
      >
        <Controller
          as={<Input.Password />}
          defaultValue=""
          control={control}
          id="confirmPassword"
          name="confirmPassword"
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
        <SwitchWrapper>
          <Controller
            as={<Switch />}
            name="termsAndConditions"
            defaultValue={false}
            valueName="checked"
            control={control}
          />
          <Label>我同意註冊條款</Label>
        </SwitchWrapper>
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
        註冊
      </Button>
    </form>
  );
};

const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      user {
        email
        name
        id
      }
      token
    }
  }
`;
