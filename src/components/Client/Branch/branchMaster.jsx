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
import { branchMasterColumns } from './BranchMasterTable'; // Adjust path if needed
import { useDispatch, useSelector } from 'react-redux';
// import { funcGetClientMasterAll } from '@globals/g-store/slice/getClientMasterAllSlice';

const BranchMaster = () => {
  const dispatch = useDispatch();
  const {
    clients = [],
    loading = false,
    error = null
  } = useSelector(state => state.clientMasterAll || {});

  // useEffect(() => {
  //   dispatch(funcGetClientMasterAll());
  // }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  // Use dynamic data from Redux, fallback to empty array if undefined
  const filteredData = (clients || []).filter(branch =>
    branch.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    setPageIndex(0);
  };

  const handlePageChange = page => {
    setPageIndex(page - 1);
  };

  const handleAddBranch = () => {
    toast.info('Add Branch button clicked (dummy action)');
  };

  const handleEditBranch = useCallback(branch => {
    toast.info(`Edit branch: ${branch.Name}`);
  }, []);

  const handleDeleteBranch = useCallback(branch => {
    toast.info(`Delete branch: ${branch.Name}`);
  }, []);

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

        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}
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
