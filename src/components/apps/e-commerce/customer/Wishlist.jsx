import Section from '@globals/g-components/base/Section';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import EcomWishlistTable from '@globals/g-components/tables/EcomWishlistTable';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
const Wishlist = () => {
    return (<div className="pt-5 mb-9">
      <Section small className="py-0">
        <PageBreadcrumb items={defaultBreadcrumbItems}/>
        <h2 className="mb-5">
          Wishlist
          <span className="text-body-tertiary fw-normal ms-2">(43)</span>
        </h2>
        <EcomWishlistTable />
      </Section>
    </div>);
};
export default Wishlist;
