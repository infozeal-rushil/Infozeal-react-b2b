import AuthSplitLayout from '@globals/g-layouts/AuthSplitLayout';
import bg from '@src/assets/img/bg/30.png';
import React from 'react';
import SignInForm from '@globals/g-components/modules/auth/SignInForm';
const SignIn = () => {
  return (
    <AuthSplitLayout bg={bg}>
      <SignInForm layout="split" />
    </AuthSplitLayout>
  );
};
export default SignIn;
