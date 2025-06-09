import ProductDescription from '@globals/g-components/modules/e-commerce/ProductDescription';
import ProductDetailsTab from '@globals/g-components/modules/e-commerce/ProductDetailsTab';
import { topElectronicProducts } from '@globals/g-data/e-commerce/products';
import SimilarProducts from '@globals/g-components/sliders/SimilarProducts';
import Section from '@globals/g-components/base/Section';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { ecomBreadcrumbItems } from '@globals/g-data/commonData';
const ProductDetails = () => {
    return (<div className="pt-5 mb-9">
      <Section small className="py-0">
        <PageBreadcrumb items={ecomBreadcrumbItems} className="mb-3"/>
        <ProductDescription />
      </Section>

      <Section small className="py-0">
        <div className="mb-9">
          <ProductDetailsTab />
        </div>
      </Section>

      <Section className="py-0">
        <SimilarProducts products={topElectronicProducts}/>
      </Section>
    </div>);
};
export default ProductDetails;
