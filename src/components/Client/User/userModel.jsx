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

  useEffect(() => {
    if (user) {
      setForm({
        ClientUserID: user.ClientUserID || user.intClientUserID || null,
        ClientBranchID:
          user.ClientBranchID || user.intClientBranchID || selectedBranch,
        DisplayName: user.DisplayName || user.strClientUserDisplayName || '',
        Email: user.Email || user.strClientUserEmail || '',
        Password: user.Password || user.strClientUserPassword || '',
        IsAdmin:
          user.IsAdmin !== undefined
            ? user.IsAdmin
            : user.bitClientUserAdminAccount !== undefined
            ? user.bitClientUserAdminAccount
            : true,
        IsActive:
          user.IsActive !== undefined
            ? user.IsActive
            : user.bitClientUserStatus !== undefined
            ? user.bitClientUserStatus
            : true
      });
    } else {
      setForm({
        ClientUserID: null,
        ClientBranchID: selectedBranch,
        DisplayName: '',
        Email: '',
        Password: '',
        IsAdmin: true,
        IsActive: true
      });
    }
  }, [user, show, selectedBranch]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: '#00000099' }}
    >
      <div className="modal-dialog modal-lg">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">
              {mode === 'add' ? 'Add User' : 'Edit User'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
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
                    required
                  />
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
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={form.Password}
                    onChange={handleChange}
                    required={mode === 'add'}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      branches.find(
                        b => b.intClientBranchID === Number(form.ClientBranchID)
                      )?.strClientBranchName || ''
                    }
                    readOnly
                  />
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
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? mode === 'add'
                  ? 'Adding...'
                  : 'Updating...'
                : mode === 'add'
                ? 'Add'
                : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
