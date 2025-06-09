import AuthSimpleLayout from '@globals/g-layouts/AuthSimpleLayout';
import LockScreenForm from '@globals/g-components/modules/auth/LockScreenForm';
const LockScreen = () => {
    return (<AuthSimpleLayout logo={false} className="col-xl-5 col-xxl-3">
      <LockScreenForm />
    </AuthSimpleLayout>);
};
export default LockScreen;
