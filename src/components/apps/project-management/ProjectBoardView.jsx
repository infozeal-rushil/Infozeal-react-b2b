import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import ProjectsTopSection from '@globals/g-components/modules/project-management/ProjectsTopSection';
import BoardViewItem from '@globals/g-components/modules/project-management/board-view/BoardViewItem';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import { projects } from '@globals/g-data/project-management/projects';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const columns = [
    {
        // For filtering and searching projects by status
        id: 'status',
        accessorFn: ({ status }) => status.label
    },
    {
        // For searching projects by name
        accessorKey: 'name'
    }
];
const ProjectBoardView = () => {
    const table = useAdvanceTable({
        data: projects,
        columns,
        pageSize: 10,
        pagination: true,
        sortable: true
    });
    return (<div>
      <PageBreadcrumb items={defaultBreadcrumbItems}/>
      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center">
          <h2 className="mb-0">
            <span className="me-3">Projects</span>{' '}
            <span className="fw-normal text-body-tertiary">
              ({projects.length})
            </span>
          </h2>
          <Link className="btn btn-primary px-5" to="/apps/project-management/create-new">
            <FontAwesomeIcon icon={faPlus} className="me-2"/>
            Add new project
          </Link>
        </div>
        <ProjectsTopSection activeView="board"/>
        <Row className="g-3 mb-9">
          {table
            .getRowModel()
            .rows.map(row => row.original)
            .map(project => (<Col xs={12} sm={6} md={4} xxl={3} key={project.id}>
                <BoardViewItem project={project}/>
              </Col>))}
        </Row>
      </AdvanceTableProvider>
    </div>);
};
export default ProjectBoardView;
