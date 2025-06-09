import ReportCard from '@globals/g-components/cards/ReportCard';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import { reports } from '@globals/g-data/crm/reportsData';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import { Col, Row } from 'react-bootstrap';
import ReportTopSection from '@globals/g-components/modules/crm/ReportTopSection';
import AdvanceTableFooter from '@globals/g-components/base/AdvanceTableFooter';
export const columns = [
    {
        // For filtering and searching projects by priority
        id: 'priority',
        accessorFn: ({ priority }) => priority.label
    },
    {
        // For filtering and searching projects by category
        id: 'category',
        accessorFn: ({ category }) => category
    },
    {
        // For searching projects by name
        accessorKey: 'title'
    }
];
const Reports = () => {
    const table = useAdvanceTable({
        data: reports,
        columns,
        pageSize: 10,
        pagination: true,
        sortable: true
    });
    return (<div>
      <PageBreadcrumb items={defaultBreadcrumbItems}/>
      <AdvanceTableProvider {...table}>
        <div className="mb-9">
          <h2 className="mb-4">Reports</h2>
          <ReportTopSection />
          <Row className="g-3">
            {table
            .getRowModel()
            .rows.map(row => row.original)
            .map(report => (<Col xl={6} key={report.id}>
                  <ReportCard report={report}/>
                </Col>))}
          </Row>
          <AdvanceTableFooter pagination className="mt-2 pb-0"/>
        </div>
      </AdvanceTableProvider>
    </div>);
};
export default Reports;
