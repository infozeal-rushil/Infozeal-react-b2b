import AddressSection from '@globals/g-components/modules/landing/alternate/AddressSection';
import Cta from '@globals/g-components/modules/landing/alternate/Cta';
import Footer from '@globals/g-components/modules/landing/alternate/Footer';
import Gallery from '@globals/g-components/modules/landing/alternate/Gallery';
import HeroHeader from '@globals/g-components/modules/landing/alternate/HeroHeader';
import OneStopSolution from '@globals/g-components/modules/landing/alternate/OneStopSolution';
import Stats from '@globals/g-components/modules/landing/alternate/Stats';
import TeamSection from '@globals/g-components/modules/landing/alternate/TeamSection';
import Testimonial from '@globals/g-components/modules/landing/alternate/Testimonial';
import Blogs from '@globals/g-components/modules/landing/alternate/blogs/Blogs';
import Features from '@globals/g-components/modules/landing/alternate/features/Features';
import Pricing from '@globals/g-components/modules/landing/alternate/pricing/Pricing';
import Brands from '@globals/g-components/modules/landing/default/Brands';
import DefaultLandingNavbar from '@globals/g-components/navbars/default-landing-navbar/DefaultLandingNavbar';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
const Alternate = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableHorizontalNavbarAppearance: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true
    });
    return (<div className="bg-body-emphasis dark__bg-gray-1200">
      <DefaultLandingNavbar className="dark__bg-gray-1200"/>
      <HeroHeader />
      <Brands />
      <Features />
      <Testimonial />
      <Gallery />
      <OneStopSolution />
      <Stats />
      <Pricing />
      <Blogs />
      <AddressSection />
      <TeamSection />
      <Cta />
      <Footer />
    </div>);
};
export default Alternate;
