import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { funcDeletePannelUserMaster } from '@globals/g-store/slice/pannel/deletepaneluserslice';

const DeleteUserModal = ({ show, onHide, user, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await dispatch(
        funcDeletePannelUserMaster(user.intPannelUserID.toString())
      ).unwrap();
      onDeleteSuccess();
      onHide();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) return null;
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          Are you sure you want to delete user{' '}
          <strong>{user.strPannelUserDisplayName}</strong>?
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Delete'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
