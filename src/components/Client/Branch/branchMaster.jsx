import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import AdvanceTable from '@globals/g-components/base/AdvanceTable';
import AdvanceTableFooter from '@globals/g-components/base/AdvanceTableFooter';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { funcGetClientBranchMasterAllbyClientID } from '@globals/g-store/slice/Branch/getClientBranchMasterAllbyClientIDSlice';
import { funcGetClientMasterAll } from '@globals/g-store/slice/Branch/getClientMasterAllSlice';
import { branchMasterColumns } from './BranchMasterTable'; // Adjust path if needed
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const BranchMaster = () => {
  const dispatch = useDispatch();
  const {
    branches = [],
    loading: branchesLoading,
    error: branchesError
  } = useSelector(state => state.branchMasterAllByClientID || {});
  const {
    clients = [],
    loading: clientsLoading,
    error: clientsError
  } = useSelector(state => state.clientMasterAll || {});

  // Fetch branches for a specific client ID (replace 18 with your actual client ID)
  useEffect(() => {
    dispatch(funcGetClientBranchMasterAllbyClientID({ ClientID: 18 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(funcGetClientMasterAll());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const [selectedClient, setSelectedClient] = useState('');
  const [clientSearch, setClientSearch] = useState('');

  // Use dynamic data from Redux, fallback to empty array if undefined
  const filteredData = (branches || []).filter(branch =>
    branch.strClientBranchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter clients based on search input
  const filteredClients = useMemo(
    () =>
      clients.filter(client =>
        client.strClientDisplayName
          .toLowerCase()
          .includes(clientSearch.toLowerCase())
      ),
    [clients, clientSearch]
  );

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    setPageIndex(0);
  };

  const handlePageChange = page => {
    setPageIndex(page - 1);
  };

  const handleAddBranch = () => {
    // Add branch logic here
  };

  const handleEditBranch = useCallback(branch => {
    // Edit branch logic here
  }, []);

  const handleDeleteBranch = useCallback(branch => {
    // Delete branch logic here
  }, []);

  const handleClientChange = e => {
    setSelectedClient(e.target.value);
    if (e.target.value) {
      dispatch(
        funcGetClientBranchMasterAllbyClientID({
          ClientID: Number(e.target.value)
        })
      );
    }
  };

  const columns = useMemo(
    () => branchMasterColumns(handleEditBranch, handleDeleteBranch),
    [handleEditBranch, handleDeleteBranch]
  );

  const table = useAdvanceTable({
    data: filteredData,
    columns,
    pageSize,
    pagination: true,
    pageCount: Math.ceil(filteredData.length / pageSize),
    manualPagination: true
  });

  const clientOptions = clients.map(client => ({
    label: client.strClientDisplayName,
    value: client.intClientID
  }));

  const handleClientSelectChange = option => {
    setSelectedClient(option);
    if (option) {
      dispatch(
        funcGetClientBranchMasterAllbyClientID({ ClientID: option.value })
      );
    }
  };

  console.log('Redux branches:', branches);
  console.log('Table data:', filteredData);
  console.log('Clients from Redux:', clients);

  // const staticClients = [
  //   { intClientID: 1, strClientDisplayName: 'Infozeal' },
  //   { intClientID: 2, strClientDisplayName: 'Mahadevcompany' },
  //   { intClientID: 3, strClientDisplayName: 'Rcompany' }
  // ];

  return (
    <div>
      <PageBreadcrumb items={defaultBreadcrumbItems} />

      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center justify-content-between">
          <h3 className="mb-0">
            <span className="me-3">Branch Master</span>
            <span className="fw-normal text-body-tertiary">
              ({filteredData.length})
            </span>
          </h3>

          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control w-auto"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <button className="btn btn-primary px-4" onClick={handleAddBranch}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              New Branch
            </button>
          </div>
        </div>

        <div className="d-flex gap-3 align-items-end mb-4">
          <Form.Group controlId="clientSelect" className="mb-0">
            <Form.Label>Select Client</Form.Label>
            <Form.Select
              value={selectedClient}
              onChange={handleClientChange}
              style={{ minWidth: '220px' }}
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client.intClientID} value={client.intClientID}>
                  {client.strClientDisplayName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        {branchesLoading && <p>Loading...</p>}
        {branchesError && <div className="text-danger">{branchesError}</div>}
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
          total={filteredData.length}
        />
      </AdvanceTableProvider>
    </div>
  );
};

export default BranchMaster;
