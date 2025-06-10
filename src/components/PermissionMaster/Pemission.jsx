import { useState, useEffect, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { permissionTableColumns } from '@globals/g-components/modules/tables/AdvanceTableExample';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { getPanelMenuPermMasterbyid } from '@globals/g-store/Service/menupermisionservice';
import { useAppDispatch, useAppSelector } from '@globals/g-store/Index';
import { funcGetPannelUserMasterall } from '@globals/g-store/slice/PermissionMaster/getPermissionslistSlice';
import {
  funcUpdatePanelMenuPermMaster,
  resetUpdateStatus
} from '@globals/g-store/slice/PermissionMaster/UpdatePanelMenuPermMasterSlice';
const rightsOptions = [
  { value: 'Add', label: 'Add' },
  { value: 'Edit', label: 'Edit' },
  { value: 'Delete', label: 'Delete' },
  { value: 'View', label: 'View' },
  { value: 'Print', label: 'Print' },
  { value: 'Execute', label: 'Execute' }
];
const PermissionsMatrix = () => {
  const [data, setData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRights, setSelectedRights] = useState([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { data: panelUsers, loading: panelLoading } = useAppSelector(
    state => state.getPanelMenuPermMasterbyid
  );
  const {
    loading: updateLoading,
    error: updateError,
    success: updateSuccess
  } = useAppSelector(state => state.updatePermissions);
  // Fetch all users on mount
  useEffect(() => {
    dispatch(funcGetPannelUserMasterall());
  }, [dispatch]);
  // Set initial selected user
  useEffect(() => {
    if (panelUsers.length > 0 && !selectedRole) {
      // Try to set selectedRole from localStorage UserID if it exists in panelUsers
      const userId = localStorage.getItem('UserID');
      const foundUser = panelUsers.find(
        user => user.intPannelUserID.toString() === userId
      );
      if (userId && foundUser) {
        setSelectedRole(userId);
      } else {
        setSelectedRole(panelUsers[0].intPannelUserID.toString());
      }
    }
    // Only run when panelUsers changes
  }, [panelUsers]);
  const roleOptions = panelUsers.map(user => ({
    label: user.strPannelUserDisplayName,
    value: user.intPannelUserID.toString()
  }));
  // Fetch permissions when selected user changes
  useEffect(() => {
    // Only fetch if panelUsers is loaded and selectedRole is valid
    if (!selectedRole || panelUsers.length === 0) return;

    const funcgetPanelMenuPermMasterbyid = async () => {
      setPermissionsLoading(true);
      try {
        const selectedUserId = parseInt(selectedRole, 10);
        if (isNaN(selectedUserId)) {
          console.error('Invalid selected user ID');
          return;
        }
        const panelPermissions =
          await getPanelMenuPermMasterbyid(selectedUserId);
        const transformedPermissions = panelPermissions.map(panel => ({
          objectName: panel.strPanelMenuName,
          permissions: {
            Add: panel.bitCreate === 1,
            Edit: panel.bitUpdate === 1,
            Delete: panel.bitDelete === 1,
            Print: panel.bitPrint === 1,
            View: panel.bitRead === 1,
            Execute: panel.bitPanelPermMenuStatus ?? false
          },
          bitPanelPermMenuStatus: panel.bitPanelPermMenuStatus ?? false,
          intPanelMenuID: panel.intPanelMenuID
        }));
        setData(transformedPermissions);
      } catch (error) {
        console.error('Error fetching permissions:', error);
      } finally {
        setPermissionsLoading(false);
      }
    };

    funcgetPanelMenuPermMasterbyid();
  }, [selectedRole, panelUsers]);
  const togglePermission = (rowIndex, key) => {
    setData(prev =>
      prev.map((item, index) => {
        if (index !== rowIndex) return item;
        const updatedPermissions = Object.assign({}, item.permissions);
        if (key !== 'bitPanelPermMenuStatus') {
          updatedPermissions[key] = !updatedPermissions[key];
        }
        return Object.assign(Object.assign({}, item), {
          permissions: updatedPermissions
        });
      })
    );
  };
  const handleRightsChange = useCallback(selectedOptions => {
    const selected = selectedOptions ? [...selectedOptions] : [];
    setSelectedRights(selected);
    const selectedKeys = selected.map(option => option.value);
    setData(prevData =>
      prevData.map(item => {
        const updatedPermissions = Object.assign({}, item.permissions);
        Object.keys(updatedPermissions).forEach(key => {
          updatedPermissions[key] = selectedKeys.includes(key);
        });
        return Object.assign(Object.assign({}, item), {
          permissions: updatedPermissions
        });
      })
    );
  }, []);
  const handleRoleChange = e => {
    e.preventDefault(); // Prevent default form behavior
    setSelectedRole(e.target.value);
    setSelectedRights([]); // Reset selected rights when user changes
  };
  const handleSave = async () => {
    try {
      const selectedUser = panelUsers.find(
        user => user.intPannelUserID.toString() === selectedRole
      );
      if (!selectedUser) {
        console.error('Selected user not found');
        return;
      }
      const payload = data.map(item => {
        return {
          intPannelUserID: parseInt(selectedRole, 10),
          strPanelMenuName: item.objectName,
          intPanelMenuID: item.intPanelMenuID,
          bitCreate: item.permissions.Add ? 1 : 0,
          bitUpdate: item.permissions.Edit ? 1 : 0,
          bitDelete: item.permissions.Delete ? 1 : 0,
          bitPrint: item.permissions.Print ? 1 : 0,
          bitRead: item.permissions.View ? 1 : 0,
          bitPanelPermMenuStatus: item.permissions.Execute ?? false,
          strPannelUserDisplayName: selectedUser.strPannelUserDisplayName,
          bitPannelUserStatus: selectedUser.bitPannelUserStatus
        };
      });

      await dispatch(funcUpdatePanelMenuPermMaster(payload)).unwrap();
      // Refresh permissions for the current user
      const selectedUserId = parseInt(selectedRole, 10);
      const panelPermissions = await getPanelMenuPermMasterbyid(selectedUserId);
      const transformedPermissions = panelPermissions.map(panel => ({
        objectName: panel.strPanelMenuName,
        permissions: {
          Add: panel.bitCreate === 1,
          Edit: panel.bitUpdate === 1,
          Delete: panel.bitDelete === 1,
          Print: panel.bitPrint === 1,
          View: panel.bitRead === 1,
          Execute: panel.bitPanelPermMenuStatus ?? false
        },
        bitPanelPermMenuStatus: panel.bitPanelPermMenuStatus ?? false,
        intPanelMenuID: panel.intPanelMenuID
      }));

      setData(transformedPermissions);
    } catch (error) {
      console.error('Failed to save permissions:', error);
      // You might want to show a user-friendly error message here
    }
  };
  useEffect(() => {
    if (updateSuccess) {
      dispatch(resetUpdateStatus());
    }
    if (updateError) {
      console.error('Update error:', updateError);
    }
  }, [updateSuccess, updateError, dispatch]);
  // Update selected rights when data changes
  useEffect(() => {
    if (data.length > 0) {
      const newSelectedRights = rightsOptions.filter(option =>
        data.every(item => item.permissions[option.value])
      );
      setSelectedRights(newSelectedRights);
    }
  }, [data]);
  const columns = permissionTableColumns(togglePermission);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  if (panelLoading) {
    return <div>Loading users...</div>;
  }
  if (permissionsLoading) {
    return <div>Loading permissions...</div>;
  }
  if (!data.length && !permissionsLoading) {
    return <div>No permissions data available</div>;
  }
  return (
    <div className="permissions-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Permission Master</h2>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={updateLoading || permissionsLoading}
        >
          {updateLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Saving...
            </>
          ) : (
            'Save'
          )}
        </button>
      </div>

      <div className="d-flex gap-3 mb-4">
        <Form.Group controlId="roleSelect" className="flex-grow-1">
          <Form.Label>User</Form.Label>
          <Form.Select
            value={selectedRole}
            onChange={handleRoleChange}
            style={{ minWidth: '180px' }}
          >
            {roleOptions.map(role => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="rightsSelect" className="flex-grow-1">
          <Form.Label>Set Rights for All</Form.Label>
          <Select
            options={rightsOptions}
            isMulti
            value={selectedRights}
            onChange={handleRightsChange}
            placeholder="Select rights..."
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: base =>
                Object.assign(Object.assign({}, base), {
                  minHeight: '38px',
                  borderColor: '#dee2e6'
                })
            }}
          />
        </Form.Group>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PermissionsMatrix;
