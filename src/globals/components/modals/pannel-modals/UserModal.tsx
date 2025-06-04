/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { PannelUser } from 'manager/api/panelmaster/PannelUserManager';
type Props = {
  show: boolean;
  onHide: () => void;
  user: PannelUser | null;
  onSubmit: (userData: Partial<PannelUser>) => void;
  mode: 'add' | 'edit';
  isLoading?: boolean;
};

const UserModal = ({
  show,
  onHide,
  user,
  onSubmit,
  mode,
  isLoading = false
}: Props) => {
  const [formData, setFormData] = useState<
    Partial<PannelUser> & { confirmPassword?: string }
  >({
    strPannelUserDisplayName: '',
    strPannelUserEmail: '',
    strPannelUserPassword: '',
    confirmPassword: '',
    bitPannelUserStatus: true
  });

  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (show) {
      if (mode === 'edit' && user) {
        setFormData({
          strPannelUserDisplayName: user.strPannelUserDisplayName || '',
          strPannelUserEmail: user.strPannelUserEmail || '',
          bitPannelUserStatus: user.bitPannelUserStatus ?? true
        });
      } else {
        setFormData({
          strPannelUserDisplayName: '',
          strPannelUserEmail: '',
          strPannelUserPassword: '',
          confirmPassword: '',
          bitPannelUserStatus: true
        });
      }
      setValidated(false);
      setAlertMessage('');
    }
  }, [show, mode, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const passwordsMatch =
      mode !== 'add' ||
      formData.strPannelUserPassword === formData.confirmPassword;

    if (form.checkValidity() && passwordsMatch) {
      const { confirmPassword, ...submitData } = formData;
      onSubmit(submitData);
    } else {
      if (!passwordsMatch) {
        setAlertMessage('Passwords do not match');
      }
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'add' ? 'New User' : 'Edit User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {alertMessage && (
            <div className="alert alert-warning d-flex justify-content-between align-items-center">
              {alertMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setAlertMessage('')}
              />
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="strPannelUserDisplayName"
              value={formData.strPannelUserDisplayName || ''}
              onChange={handleChange}
              placeholder="Enter user name"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a user name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              name="strPannelUserEmail"
              value={formData.strPannelUserEmail || ''}
              onChange={handleChange}
              placeholder="Enter email"
              readOnly={mode === 'edit'}
              onKeyDown={e => {
                if (mode === 'edit') {
                  e.preventDefault();
                  setAlertMessage("Email can't be changed in edit mode");
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          {mode === 'add' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="strPannelUserPassword"
                  value={formData.strPannelUserPassword || ''}
                  onChange={handleChange}
                  placeholder="Enter password"
                  minLength={6}
                />
                <Form.Control.Feedback type="invalid">
                  Password must be at least 6 characters
                </Form.Control.Feedback>
                <Form.Text muted>
                  Password must be at least 6 characters long
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  isInvalid={
                    validated &&
                    formData.strPannelUserPassword !== formData.confirmPassword
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {mode === 'edit' && (
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="status-switch"
                label="Active Status"
                name="bitPannelUserStatus"
                checked={formData.bitPannelUserStatus || false}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="success" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : mode === 'add' ? (
                'Save'
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
