import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const UserModal = ({
  show,
  onHide,
  user,
  mode,
  isLoading,
  onSubmit,
  branches,
  selectedBranch
}) => {
  const [form, setForm] = useState({
    ClientUserID: null,
    ClientBranchID: '',
    DisplayName: '',
    Email: '',
    Password: '',
    IsAdmin: true,
    IsActive: true
  });

  const [errors, setErrors] = useState({
    DisplayName: '',
    Email: '',
    Password: ''
  });

  useEffect(() => {
    if (user) {
      setForm({
        ClientUserID: user.intClientUserID || null,
        ClientBranchID: user.intClientBranchID || selectedBranch,
        DisplayName: user.strClientUserDisplayName || '',
        Email: user.strClientUserEmail || '',
        Password: '',
        IsAdmin: user.bitClientUserAdminAccount || false,
        IsActive: user.bitClientUserStatus !== false
      });
    } else {
      setForm({
        ClientUserID: null,
        ClientBranchID: selectedBranch,
        DisplayName: '',
        Email: '',
        Password: '',
        IsAdmin: false,
        IsActive: true
      });
    }
    setErrors({
      DisplayName: '',
      Email: '',
      Password: ''
    });
  }, [user, show, selectedBranch]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      DisplayName: !form.DisplayName ? 'Display Name is required' : '',
      Email: !form.Email ? 'Email is required' : '',
      Password: mode === 'add' && !form.Password ? 'Password is required' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(form);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-lg">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">
              {mode === 'add' ? 'Add New User' : 'Edit User'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              disabled={isLoading}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Display Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="DisplayName"
                    value={form.DisplayName}
                    onChange={handleChange}
                    isInvalid={!!errors.DisplayName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.DisplayName}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={form.Email}
                    onChange={handleChange}
                    isInvalid={!!errors.Email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Email}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Password{mode === 'add' ? '*' : ''}</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={form.Password}
                    onChange={handleChange}
                    isInvalid={!!errors.Password}
                    placeholder={
                      mode === 'edit' ? 'Leave blank to keep current' : ''
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Password}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Branch</Form.Label>
                  <Form.Control
                    as="select"
                    name="ClientBranchID"
                    value={form.ClientBranchID}
                    onChange={handleChange}
                    disabled
                  >
                    {branches.map(branch => (
                      <option
                        key={branch.intClientBranchID}
                        value={branch.intClientBranchID}
                      >
                        {branch.strClientBranchName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="IsAdmin"
                      id="IsAdmin"
                      checked={!!form.IsAdmin}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="IsAdmin">
                      Admin Privileges
                    </label>
                  </div>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="IsActive"
                      id="IsActive"
                      checked={!!form.IsActive}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="IsActive">
                      Active User
                    </label>
                  </div>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onHide}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  {mode === 'add' ? ' Adding...' : ' Updating...'}
                </>
              ) : mode === 'add' ? (
                'Add User'
              ) : (
                'Update User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
