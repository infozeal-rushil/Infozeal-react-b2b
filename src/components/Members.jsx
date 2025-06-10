import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@globals/g-components/base/Button';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import SearchBox from '@globals/g-components/common/SearchBox';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import { Col, Row } from 'react-bootstrap';
import { memberBreadcrumbItems, members } from '@globals/g-data/members';
import MembersTable, { membersTablecolumns } from '@globals/g-components/tables/MembersTable';
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
const Members = () => {
    const table = useAdvanceTable({
        data: members,
        columns: membersTablecolumns,
        pageSize: 10,
        pagination: true,
        sortable: true,
        selection: true
    });
    const handleSearchInputChange = (e) => {
        table.setGlobalFilter(e.target.value || undefined);
    };
    return (<div>
      <PageBreadcrumb items={memberBreadcrumbItems}/>
      <div className="mb-9">
        <h2 className="mb-5">Members</h2>

        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <Row className="g-3">
              <Col xs="auto">
                <SearchBox placeholder="Search members" onChange={handleSearchInputChange}/>
              </Col>
              <Col xs="auto" className="scrollbar overflow-hidden-y flex-grow-1"></Col>
              <Col xs="auto">
                <Button variant="link" className="text-body me-4 px-0">
                  <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2"/>
                  Export
                </Button>
                <Button variant="primary">
                  <FontAwesomeIcon icon={faPlus} className="me-2"/>
                  Add member
                </Button>
              </Col>
            </Row>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <MembersTable />
          </div>
        </AdvanceTableProvider>
      </div>
    </div>);
};
export default Members;
