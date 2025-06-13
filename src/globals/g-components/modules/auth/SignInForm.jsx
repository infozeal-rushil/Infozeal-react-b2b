import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@globals/g-components/base/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetPannelUserLogin } from '@globals/g-store/slice/loginSlice';
import { useAppDispatch, useAppSelector } from '@globals/g-store/Index';
const SignInForm = ({ layout }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector(state => state.login);
  const handleLogin = () => {
    dispatch(
      GetPannelUserLogin({
        UserEmail: userEmail,
        UserPassword: userPassword
      })
    );
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('userName', user.strPannelUserDisplayName);
      localStorage.setItem('UserID', user.intPannelUserID.toString());
      navigate('/Dashboard');
    }
  }, [user, navigate]);
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);
  return (
    <>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="email">Email address</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="email"
            type="email"
            className="form-icon-input"
            placeholder="name@example.com"
            value={userEmail}
            onChange={e => setUserEmail(e.target.value)}
          />
          <FontAwesomeIcon icon={faUser} className="text-body fs-9 form-icon" />
        </div>
      </Form.Group>
      <Form.Group className="mb-3 text-start">
        <Form.Label htmlFor="password">Password</Form.Label>
        <div className="form-icon-container">
          <Form.Control
            id="password"
            type="password"
            className="form-icon-input"
            placeholder="Password"
            value={userPassword}
            onChange={e => setUserPassword(e.target.value)}
          />
          <FontAwesomeIcon icon={faKey} className="text-body fs-9 form-icon" />
        </div>
      </Form.Group>
      <Row className="flex-between-center mb-7">
        <Col xs="auto">
          <Form.Check type="checkbox" className="mb-0">
            <Form.Check.Input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              defaultChecked
            />
            <Form.Check.Label htmlFor="remember-me" className="mb-0">
              Remember me
            </Form.Check.Label>
          </Form.Check>
        </Col>
        <Col xs="auto">
          <Link
            to={`/pages/authentication/${layout}/forgot-password`}
            className="fs-9 fw-semibold"
          >
            Forgot Password?
          </Link>
        </Col>
      </Row>
      <Button
        variant="primary"
        className="w-100 mb-3"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>
      <div className="text-center">
        <Link
          to={`/pages/authentication/${layout}/sign-up`}
          className="fs-9 fw-bold"
        >
          Create an account
        </Link>
      </div>
    </>
  );
};
export default SignInForm;
