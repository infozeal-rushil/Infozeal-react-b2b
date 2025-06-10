import Footer from '@globals/g-components/footers/Footer';
import AdvanceFeatures from '@globals/g-components/modules/showcase/AdvanceFeatures';
import Cta from '@globals/g-components/modules/showcase/Cta';
import Demos from '@globals/g-components/modules/showcase/Demos';
import DifferentModules from '@globals/g-components/modules/showcase/DifferentModules';
import EssentialFeatures from '@globals/g-components/modules/showcase/EssentialFeatures';
import Faq from '@globals/g-components/modules/showcase/Faq';
import Feature from '@globals/g-components/modules/showcase/Feature';
import FeatureFigma from '@globals/g-components/modules/showcase/FeatureFigma';
import Header from '@globals/g-components/modules/showcase/Header';
import ImportantApplications from '@globals/g-components/modules/showcase/ImportantApplications';
import NecessaryPages from '@globals/g-components/modules/showcase/NecessaryPages';
import PreFooter from '@globals/g-components/modules/showcase/PreFooter';
import ShowcaseNavbar from '@globals/g-components/navbars/ShowcaseNavbar';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
import { useAppContext } from '@globals/g-providers/AppProvider';
import { useEffect, useMemo } from 'react';
const Showcase = () => {
    useSettingsMountEffect({
        showSettingPanelButton: false
    });
    const { config: { theme }, setConfig } = useAppContext();
    const mountTheme = useMemo(() => {
        return theme;
    }, [theme]);
    useEffect(() => {
        setConfig({
            theme: 'light'
        });
        return () => {
            setConfig({
                theme: mountTheme
            });
        };
    }, []);
    return (<>
      <ShowcaseNavbar />
      <Header />
      <Demos />
      <DifferentModules />
      <AdvanceFeatures />
      <EssentialFeatures />
      <Feature />
      <ImportantApplications />
      <NecessaryPages />
      <FeatureFigma />
      <Faq />
      <Cta />
      <PreFooter />
      <Footer className="d-flex justify-content-center bg-body border-0"/>
    </>);
};
export default Showcase;
