import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import AdvanceTable from '@globals/g-components/base/AdvanceTable';
import AdvanceTableFooter from '@globals/g-components/base/AdvanceTableFooter';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { pannelMasterColumns } from '@globals/g-components/modules/tables/AdvanceTableExample';
import UserModal from '@globals/g-components/modals/pannel-modals/UserModal';
import DeleteUserModal from '@globals/g-components/modals/pannel-modals/DeleteUserModal';
import { usePannelUsers } from '@globals/g-store/hooks/UsePannelUsers';
import { AddPannelUserMaster } from '@globals/g-store/Service/panelUserService';
import { funcUpdatePannelUserMaster } from '@globals/g-store/slice/pannel/updatepaneluserslice';
import { getPermissionByMenuPageName } from '@globals/g-store/hooks/FuncMenuPermision';
const PannelMaster = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  // Modal states
  const [modalShow, setModalShow] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 100);
  const { users, total, error, refresh } = usePannelUsers();
  // let permisiondata = null;
  // try {
  //   const rawData = localStorage.getItem('panelMenuPermissions');
  //   permisiondata = rawData ? JSON.parse(rawData) : null;
  // } catch (error) {
  //   console.error('Error parsing panelMenuPermissions:', error);
  // }
  const pagePermission = getPermissionByMenuPageName('panelusermaster');
  let ShowCreate =
    pagePermission && pagePermission.bitCreate === 1 ? 'visible' : 'hidden';
  useEffect(() => {
    refresh(pageIndex + 1, pageSize, searchTerm);
  }, [pageIndex, pageSize, searchTerm]);
  const handleAddUser = useCallback(() => {
    setModalMode('add');
    setSelectedUser(null);
    setModalShow(true);
  }, []);
  const handleDeleteSuccess = () => {
    refresh(pageIndex + 1, pageSize, searchTerm);
    toast.success('User deleted successfully');
  };
  const handleEditUser = useCallback(user => {
    setModalMode('edit');
    setSelectedUser(user);
    setModalShow(true);
  }, []);
  const handleDeleteClick = useCallback(user => {
    setSelectedUser(user);
    setDeleteModalVisible(true);
  }, []);
  const handleUserSubmit = userData => {
    setIsSubmitting(true);
    try {
      if (modalMode === 'add') {
        const response = AddPannelUserMaster({
          UserDisplayName: userData.strPannelUserDisplayName || '',
          UserEmail: userData.strPannelUserEmail || '',
          UserPassword: userData.strPannelUserPassword || '',
          UserStatus: userData.bitPannelUserStatus || true
        });

        refresh(pageIndex + 1, pageSize, searchTerm);
        toast.success('User created successfully');
      } else if (modalMode === 'edit' && selectedUser) {
        const response = funcUpdatePannelUserMaster({
          UserID: selectedUser.intPannelUserID.toString(),
          UserDisplayName: userData.strPannelUserDisplayName || '',
          UserEmail: userData.strPannelUserEmail || '',
          UserStatus: userData.bitPannelUserStatus || false
        });

        refresh(pageIndex + 1, pageSize, searchTerm);
        toast.success('User updated successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setModalShow(false);
    }
  };
  const columns = useMemo(
    () => pannelMasterColumns(handleEditUser, handleDeleteClick),
    [handleEditUser, handleDeleteClick]
  );
  const table = useAdvanceTable({
    data: users || [],
    columns: columns,
    pageSize: 10,
    pagination: true,
    selection: false,
    sortable: true,
    pageCount: Math.ceil(total / pageSize),
    manualPagination: true
  });
  useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearchTerm]);
  const handleSearch = e => {
    setSearchTerm(e.target.value);
    setPageIndex(0);
  };
  const handlePageChange = page => {
    setPageIndex(page - 1);
  };
  return (
    <>
      <div>
        <PageBreadcrumb items={defaultBreadcrumbItems} />

        <AdvanceTableProvider {...table}>
          <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center justify-content-between">
            <h3 className="mb-0">
              <span className="me-3">Pannel Users</span>{' '}
              <span className="fw-normal text-body-tertiary">({total})</span>
            </h3>

            <div className="d-flex gap-2 align-items-center">
              <input
                type="text"
                className="form-control w-auto"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <button
                className="btn btn-primary px-4"
                onClick={handleAddUser}
                style={{ visibility: ShowCreate }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                New user
              </button>
            </div>
          </div>

          {error && <p className="text-danger">Error: {error}</p>}

          <AdvanceTable
            tableProps={{
              size: 'sm',
              className: 'phoenix-table fs-9 mb-0 border-top border-translucent'
            }}
            rowClassName="hover-actions-trigger btn-reveal-trigger position-static"
          />
          <AdvanceTableFooter
            navBtn
            pagination
            tableInfo="custom-class"
            showViewAllBtn={false}
            onPageChange={handlePageChange}
            total={total}
          />
        </AdvanceTableProvider>
      </div>

      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selectedUser}
        onSubmit={handleUserSubmit}
        mode={modalMode}
        isLoading={isSubmitting}
      />

      <DeleteUserModal
        show={deleteModalVisible}
        onHide={() => setDeleteModalVisible(false)}
        user={selectedUser}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </>
  );
};
export default PannelMaster;
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
