import { useEffect, useState } from 'react';

const ClientModal = ({ show, onHide, client, mode, isLoading, onSubmit }) => {
  const [form, setForm] = useState({
    ClientDisplayName: '',
    ClientMasterEmail: '',
    ClientMobile: '',
    ClientPhone: '',
    ClientStatus: true
  });

  useEffect(() => {
    if (client) {
      setForm({
        ClientID: client.ClientID, // <-- Add this line!
        ClientDisplayName:
          client.ClientDisplayName || client.strClientDisplayName || '',
        ClientMasterEmail:
          client.ClientMasterEmail || client.strClientMasterEmail || '',
        ClientMobile: client.ClientMobile || client.strClientMobile || '',
        ClientPhone: client.ClientPhone || client.strClientPhone || '',
        ClientStatus:
          client.ClientStatus !== undefined
            ? client.ClientStatus
            : client.bitClientStatus !== undefined
            ? client.bitClientStatus
            : true
      });
    }
  }, [client, show]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Modal form submit:', form); // <-- Add this line
    if (onSubmit) onSubmit(form);
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: '#00000099' }}
    >
      <div className="modal-dialog">
        <form className="modal-content" onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">
              {mode === 'add' ? 'Add Client' : 'Edit Client'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              name="ClientDisplayName"
              placeholder="Name"
              value={form.ClientDisplayName}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="ClientMasterEmail"
              placeholder="Email"
              value={form.ClientMasterEmail}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="ClientMobile"
              placeholder="Mobile No"
              value={form.ClientMobile}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              name="ClientPhone"
              placeholder="Phone No"
              value={form.ClientPhone}
              onChange={handleChange}
            />
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                name="ClientStatus"
                id="ClientStatus"
                checked={!!form.ClientStatus}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="ClientStatus">
                Active
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onHide}
            >
              Close
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientModal;
