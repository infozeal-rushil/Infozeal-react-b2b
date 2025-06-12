import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTable from '@globals/g-components/base/AdvanceTable';
import AdvanceTableFooter from '@globals/g-components/base/AdvanceTableFooter';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import { clientMasterColumns } from '@components/clientCompany/ClientMasterTable';
import ClientModal from '@components/clientCompany/clientModel';
import { toast } from 'react-toastify';
import { funcGetClientConfigureList } from '@globals/g-store/slice/ClientCompanyMaster/getClientConfigureListSlice';
import { useNavigate } from 'react-router-dom';
import ClientCompanyMaster from '@components/clientCompany/clientCompanyMaster';
import { funcGetClientMasterByID } from '@globals/g-store/slice/ClientCompanyMaster/getClientMasterByIDSlice';
import { funcUpdateClientMaster } from '@globals/g-store/slice/ClientCompanyMaster/updateClientMasterSlice';

const ClientMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients, total, loading, error } = useSelector(
    state => state.clientConfigureList
  );
  const { client: fetchedClient, loading: loadingClient } = useSelector(
    state => state.clientMasterByID
  );
  const { loading: updatingClient } = useSelector(
    state => state.updateClientMaster
  );

  const [modalShow, setModalShow] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedClient, setSelectedClient] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5;

  // Fetch client list on mount and when pageIndex/pageSize changes
  useEffect(() => {
    dispatch(
      funcGetClientConfigureList({
        pageNo: pageIndex + 1,
        rowsPerPage: pageSize,
        searchTerm: '',
        searchTermByCol: '',
        filterStatusActive: '',
        shortByCol: ''
      })
    );
  }, [dispatch, pageIndex, pageSize]);

  const handleAddClient = () => {
    navigate('/clientCompanyMaster');
  };

  const handleEditClient = client => {
    dispatch(funcGetClientMasterByID(client.intClientID));
    setSelectedClient(client); // <-- Save the original client with ID
    setModalMode('edit');
    setModalShow(true);
  };

  const handleClientSubmit = async clientData => {
    console.log('Submitting clientData:', clientData);
    if (modalMode === 'edit') {
      try {
        await dispatch(
          funcUpdateClientMaster({
            ClientID: clientData.ClientID,
            ClientDisplayName: clientData.ClientDisplayName,
            ClientCity: clientData.ClientCity,
            ClientMasterEmail: clientData.ClientMasterEmail,
            ClientMobile: clientData.ClientMobile,
            ClientPhone: clientData.ClientPhone,
            ClientStatus: clientData.ClientStatus ? 'True' : 'False'
          })
        ).unwrap();
        toast.success('Client updated successfully');
        setModalShow(false);
        dispatch(
          funcGetClientConfigureList({
            pageNo: pageIndex + 1,
            rowsPerPage: pageSize,
            searchTerm: '',
            searchTermByCol: '',
            filterStatusActive: '',
            shortByCol: ''
          })
        );
      } catch (err) {
        toast.error('Failed to update client');
      }
    }
  };

  const columns = useMemo(
    () => clientMasterColumns(handleEditClient, () => {}),
    [handleEditClient]
  );

  const table = useAdvanceTable({
    data: clients,
    columns,
    pageSize,
    pagination: true,
    selection: false,
    sortable: true,
    pageCount: Math.ceil(total / pageSize),
    manualPagination: true
  });

  const handlePageChange = page => {
    setPageIndex(page - 1);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>
          Clients ({total})
          {loading && (
            <span className="ms-2 spinner-border spinner-border-sm" />
          )}
        </h3>
        <button className="btn btn-primary" onClick={handleAddClient}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          New client
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <AdvanceTableProvider {...table}>
        <AdvanceTable />
        <AdvanceTableFooter
          pagination
          total={total}
          onPageChange={handlePageChange}
        />
      </AdvanceTableProvider>

      <ClientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        client={
          modalMode === 'edit'
            ? {
                ...(fetchedClient || {}),
                ClientID: selectedClient?.intClientID
              }
            : null
        }
        onSubmit={handleClientSubmit}
        mode={modalMode}
        isLoading={updatingClient || loadingClient}
      />
    </>
  );
};

export default ClientMaster;
