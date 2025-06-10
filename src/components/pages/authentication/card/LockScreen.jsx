import LockScreenForm from '@globals/g-components/modules/auth/LockScreenForm';
import AuthCardLayout from '@globals/g-layouts/AuthCardLayout';
const LockScreen = () => {
    return (<AuthCardLayout logo={false}>
      <LockScreenForm />
    </AuthCardLayout>);
};
export default LockScreen;
