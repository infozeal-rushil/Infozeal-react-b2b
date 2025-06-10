import LockScreenForm from '@globals/g-components/modules/auth/LockScreenForm';
import AuthSplitLayout from '@globals/g-layouts/AuthSplitLayout';
import bg from '@src/assets/img/bg/33.png';
const LockScreen = () => {
  return (
    <AuthSplitLayout bg={bg} logo={false}>
      <LockScreenForm />
    </AuthSplitLayout>
  );
};
export default LockScreen;
