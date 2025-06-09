import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import RoomListingTable from '@globals/g-components/tables/RoomListingTable';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
const RoomListing = () => {
    return (<div className="mb-9">
      <PageBreadcrumb className="mb-3" items={defaultBreadcrumbItems}/>
      <h2>Room Listing</h2>
      <RoomListingTable />
    </div>);
};
export default RoomListing;
