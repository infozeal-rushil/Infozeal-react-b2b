import AddressSection from '@globals/g-components/modules/landing/default/address/AddressSection';
import Blog from '@globals/g-components/modules/landing/default/blog/Blog';
import Brands from '@globals/g-components/modules/landing/default/Brands';
import Cta from '@globals/g-components/modules/landing/default/Cta';
import Features from '@globals/g-components/modules/landing/default/features/Features';
import Footer from '@globals/g-components/modules/landing/default/Footer';
import FunFacts from '@globals/g-components/modules/landing/default/fun-facts/FunFacts';
import Gallery from '@globals/g-components/modules/landing/default/Gallery';
import HeroHeader from '@globals/g-components/modules/landing/default/HeroHeader';
import Pricing from '@globals/g-components/modules/landing/default/pricing/Pricing';
import TeamSection from '@globals/g-components/modules/landing/default/team/TeamSection';
import Testimonial from '@globals/g-components/modules/landing/default/testimonial/Testimonial';
import DefaultLandingNavbar from '@globals/g-components/navbars/default-landing-navbar/DefaultLandingNavbar';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
const Default = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableHorizontalNavbarAppearance: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true
    });
    return (<div className="bg-body-emphasis">
      <DefaultLandingNavbar />
      <HeroHeader />
      <Brands className="py-5 pt-xl-13"/>
      <Features />
      <Testimonial />
      <FunFacts />
      <Gallery />
      <Pricing />
      <Blog />
      <AddressSection />
      <TeamSection />
      <Cta />
      <Footer />
    </div>);
};
export default Default;
