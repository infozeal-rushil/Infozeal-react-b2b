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
import { funcAddClientBranchMaster } from '@globals/g-store/slice/Branch/addClientBranchMasterSlice';
import { funcUpdateClientBranchMaster } from '@globals/g-store/slice/Branch/updateClientBranchMasterSlice';
import { branchMasterColumns } from './BranchMasterTable';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal } from 'react-bootstrap';

function formatDateForInput(dateStr) {
  if (!dateStr) return '';
  // Handles both "14-Jun-2025" and "14-06-2025"
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  };
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const [day, mon, year] = parts;
    const month = months[mon] || mon; // handles both "Jun" and "06"
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return '';
}

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

  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;
  const [selectedClient, setSelectedClient] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    ClientBranchID: null,
    ClientID: '',
    ClientBranchName: '',
    ClientBranchCity: '',
    ClientBranchEmail: '',
    ClientBranchMobile: '',
    ClientBranchPhone: '',
    ClientBranchValidate: '',
    BranchTag: '',
    BranchType: 'B2B', // Default value
    ClientBranchStatus: 'True' // Default value
  });

  useEffect(() => {
    dispatch(funcGetClientBranchMasterAllbyClientID({ ClientID: 18 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(funcGetClientMasterAll());
  }, [dispatch]);

  // Set default selected client to the first client when clients are loaded
  useEffect(() => {
    if (clients.length > 0 && !selectedClient) {
      setSelectedClient(clients[0].intClientID);
    }
  }, [clients, selectedClient]);

  // Safe filtering function
  const filteredData = (branches || []).filter(branch =>
    branch.strClientBranchName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    setPageIndex(0);
  };

  const handlePageChange = page => {
    setPageIndex(page - 1);
  };

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

  const handleAddBranch = async () => {
    try {
      const payload = {
        ...formData,
        ClientID: Number(selectedClient),
        dtClientBranchValidate: formData.ClientBranchValidity || null
      };
      await dispatch(funcAddClientBranchMaster(payload)).unwrap();
      toast.success('Branch added successfully!');
      dispatch(
        funcGetClientBranchMasterAllbyClientID({
          ClientID: Number(selectedClient)
        })
      );
      setShowModal(false);
    } catch (error) {
      toast.error(error?.message || 'Failed to add branch');
    }
  };

  const handleEditBranch = useCallback(async () => {
    try {
      const payload = {
        ...formData,
        dtClientBranchValidate: formData.dtClientBranchValidity || null
      };
      await dispatch(funcUpdateClientBranchMaster(payload)).unwrap();
      toast.success('Branch updated successfully!');
      dispatch(
        funcGetClientBranchMasterAllbyClientID({
          ClientID: Number(selectedClient)
        })
      );
      setShowModal(false);
    } catch (error) {
      toast.error(error?.message || 'Failed to update branch');
    }
  }, [dispatch, formData, selectedClient]);

  const handleDeleteBranch = useCallback(branch => {
    // Optional delete logic
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      ClientBranchID: null,
      ClientID: selectedClient,
      ClientBranchName: '',
      ClientBranchCity: '',
      ClientBranchEmail: '',
      ClientBranchMobile: '',
      ClientBranchPhone: '',
      ClientBranchValidate: '',
      BranchTag: '',
      BranchType: 'B2B',
      ClientBranchStatus: 'True'
    });
    setShowModal(true);
  };
  const openEditModal = branch => {
    const dateOnly = branch.dtClientBranchValidity
      ? new Date(branch.dtClientBranchValidity).toISOString().split('T')[0]
      : '';
    console.log('API date:', branch.dtClientBranchValidity);
    setIsEditMode(true);
    setFormData({
      ClientBranchID: branch.intClientBranchID,
      ClientID: branch.intClientID,
      ClientBranchName: branch.strClientBranchName || '',
      ClientBranchCity: branch.strClientBranchCity || '',
      ClientBranchEmail: branch.strClientBranchEmail || '',
      ClientBranchMobile: branch.strClientBranchMobile || '',
      ClientBranchPhone: branch.strClientBranchPhone || '',
      dtClientBranchValidity:
        branch.dtClientBranchValidity?.split('T')[0] || '',
      BranchTag: branch.strBranchTag || '',
      BranchType: branch.strBranchType || 'B2B',
      ClientBranchStatus: branch.bitClientBranchStatus ? 'True' : 'False'
    });
    setShowModal(true);
  };

  // const openEditModal = branch => {
  //   const formattedDate = formatDateForInput(branch.dtClientBranchValidate);
  //   console.log('API date:', branch.dtClientBranchValidate);
  //   console.log('Formatted for input:', formattedDate);

  //   setIsEditMode(true);
  //   setFormData({
  //     ClientBranchID: branch.intClientBranchID,
  //     ClientID: branch.intClientID,
  //     ClientBranchName: branch.strClientBranchName || '',
  //     ClientBranchCity: branch.strClientBranchCity || '',
  //     ClientBranchEmail: branch.strClientBranchEmail || '',
  //     ClientBranchMobile: branch.strClientBranchMobile || '',
  //     ClientBranchPhone: branch.strClientBranchPhone || '',
  //     ClientBranchValidate: branch.dtClientBranchValidate || '',
  //     BranchTag: branch.strBranchTag || '',
  //     BranchType: branch.strBranchType || 'B2B',
  //     ClientBranchStatus: branch.bitClientBranchStatus ? 'True' : 'False',
  //     dtClientBranchValidity: formattedDate
  //   });
  //   setShowModal(true);
  // };

  const handleModalSubmit = async () => {
    if (isEditMode) {
      await handleEditBranch();
    } else {
      await handleAddBranch();
    }
  };

  const columns = useMemo(
    () => branchMasterColumns(openEditModal, handleDeleteBranch),
    [openEditModal, handleDeleteBranch]
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
              value={searchTerm}
            />
            <button className="btn btn-primary px-4" onClick={openAddModal}>
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
              {clients.map(client => (
                <option key={client.intClientID} value={client.intClientID}>
                  {client.strClientDisplayName || 'Unnamed Client'}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        {branchesLoading && <p>Loading branches...</p>}
        {branchesError && (
          <div className="text-danger">
            Error loading branches: {branchesError}
          </div>
        )}

        {!branchesLoading && !branchesError && (
          <>
            <AdvanceTable
              tableProps={{
                size: 'sm',
                className:
                  'phoenix-table fs-9 mb-0 border-top border-translucent'
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
          </>
        )}
      </AdvanceTableProvider>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit Branch' : 'Add Branch'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Branch Name*</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ClientBranchName}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        ClientBranchName: e.target.value
                      })
                    }
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>City*</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ClientBranchCity}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        ClientBranchCity: e.target.value
                      })
                    }
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.ClientBranchEmail}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        ClientBranchEmail: e.target.value
                      })
                    }
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ClientBranchMobile}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        ClientBranchMobile: e.target.value
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.ClientBranchPhone}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        ClientBranchPhone: e.target.value
                      })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Validity Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dtClientBranchValidity"
                    value={formData.dtClientBranchValidity}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        dtClientBranchValidity: e.target.value
                      })
                    }
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Branch Tag</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.BranchTag}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        BranchTag: e.target.value
                      })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Branch Type</Form.Label>
                  <Form.Select
                    value={formData.BranchType}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        BranchType: e.target.value
                      })
                    }
                  >
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                    <option value="Both">Both</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={formData.ClientBranchStatus}
                onChange={e =>
                  setFormData({
                    ...formData,
                    ClientBranchStatus: e.target.value
                  })
                }
              >
                <option value="True">Active</option>
                <option value="False">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleModalSubmit}>
            {isEditMode ? 'Update' : 'Add'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BranchMaster;
