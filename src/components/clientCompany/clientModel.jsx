import { useState, useEffect } from 'react';

const ClientModal = ({ show, onHide, onSubmit, client, mode, isLoading }) => {
  const [formData, setFormData] = useState({
    ClientDisplayName: '',
    ClientEmail: '',
    ClientCity: ''
  });

  useEffect(() => {
    if (client) {
      setFormData({
        ClientDisplayName: client.ClientDisplayName || '',
        ClientEmail: client.ClientEmail || '',
        ClientCity: client.ClientCity || ''
      });
    }
  }, [client]);

  if (!show) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: '#00000099' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
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
              placeholder="Client Name"
              value={formData.ClientDisplayName}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="ClientEmail"
              placeholder="Email"
              value={formData.ClientEmail}
              onChange={handleChange}
            />
            <input
              className="form-control mb-2"
              name="ClientCity"
              placeholder="City"
              value={formData.ClientCity}
              onChange={handleChange}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onHide}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {mode === 'add' ? 'Add' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
