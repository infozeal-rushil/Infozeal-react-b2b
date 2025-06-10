import SignOutForm from '@globals/g-components/modules/auth/SignOutForm';
import AuthCardLayout from '@globals/g-layouts/AuthCardLayout';
const SignOut = () => {
    return (<AuthCardLayout logo={false}>
      <SignOutForm layout="card"/>
    </AuthCardLayout>);
};
export default SignOut;
