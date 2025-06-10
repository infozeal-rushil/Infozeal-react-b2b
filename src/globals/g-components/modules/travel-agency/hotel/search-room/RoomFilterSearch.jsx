import SearchBox from 'components/common/SearchBox';
import RoomFilterCheckbox from './RoomFilterCheckbox';
import useAdvanceTable from 'hooks/useAdvanceTable';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import { Link } from 'react-router-dom';
export const columns = [
    {
        // For filtering and searching projects by status
        id: 'name',
        accessorFn: ({ name }) => name
    },
    {
        // For searching projects by name
        accessorKey: 'name'
    }
];
const RoomFilterSearch = ({ items }) => {
    const table = useAdvanceTable({
        data: items,
        columns,
        pageSize: 10
    });
    const handleSearchInputChange = (e) => {
        table.setGlobalFilter(e.target.value || undefined);
    };
    return (<>
      <AdvanceTableProvider {...table}>
        <SearchBox placeholder="Search..." size="sm" onChange={handleSearchInputChange} className="mx-auto mb-4 w-100"/>

        {table
            .getRowModel()
            .rows.map(row => row.original)
            .map((item, index) => (<RoomFilterCheckbox name={item.name.split(' ').join('-')} value={item.name.split(' ').join('-')} label={item.name} key={index}/>))}
        <Link to="" className="mt-2 fw-bold d-inline-block">
          Show more items
        </Link>
      </AdvanceTableProvider>
    </>);
};
export default RoomFilterSearch;
