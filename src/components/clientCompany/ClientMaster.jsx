import { useState, useEffect, useMemo, useCallback } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTable from '@globals/g-components/base/AdvanceTable';
import AdvanceTableFooter from '@globals/g-components/base/AdvanceTableFooter';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import { clientMasterColumns } from '@components/clientCompany/ClientMasterTable';
import ClientModal from '@components/clientCompany/clientModel';

import { toast } from 'react-toastify';

const dummyClients = [
  {
    ClientID: 1,
    ClientDisplayName: 'ABC Corp',
    ClientCity: 'Mumbai',
    ClientEmail: 'abc@example.com'
  },
  {
    ClientID: 2,
    ClientDisplayName: 'XYZ Ltd',
    ClientCity: 'Delhi',
    ClientEmail: 'xyz@example.com'
  }
];

const ClientMaster = () => {
  const [clients, setClients] = useState(dummyClients);
  const [modalShow, setModalShow] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedClient, setSelectedClient] = useState(null);

  const handleAddClient = () => {
    setModalMode('add');
    setSelectedClient(null);
    setModalShow(true);
  };

  const handleEditClient = client => {
    setModalMode('edit');
    setSelectedClient(client);
    setModalShow(true);
  };

  const handleClientSubmit = clientData => {
    if (modalMode === 'add') {
      setClients(prev => [...prev, { ...clientData, ClientID: Date.now() }]);
      toast.success('Client added');
    } else {
      setClients(prev =>
        prev.map(c =>
          c.ClientID === selectedClient.ClientID ? { ...c, ...clientData } : c
        )
      );
      toast.success('Client updated');
    }
    setModalShow(false);
  };

  const columns = useMemo(
    () => clientMasterColumns(handleEditClient, () => {}),
    [handleEditClient]
  );

  const table = useAdvanceTable({
    data: clients,
    columns,
    pageSize: 5,
    pagination: true,
    selection: false,
    sortable: true,
    pageCount: 1,
    manualPagination: false
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Clients ({clients.length})</h3>
        <button className="btn btn-primary" onClick={handleAddClient}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          New client
        </button>
      </div>

      <AdvanceTableProvider {...table}>
        <AdvanceTable />
        <AdvanceTableFooter pagination total={clients.length} />
      </AdvanceTableProvider>

      <ClientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        client={selectedClient}
        onSubmit={handleClientSubmit}
        mode={modalMode}
        isLoading={false}
      />
    </>
  );
};

export default ClientMaster;
