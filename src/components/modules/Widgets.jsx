import ScrollSpy from '@globals/g-components/base/ScrollSpy';
import WidgetECommerce from '@globals/g-components/modules/widgets/WidgetECommerce';
import WidgetForms from '@globals/g-components/modules/widgets/WidgetForms';
import WidgetOthers from '@globals/g-components/modules/widgets/WidgetOthers';
import WidgetStats from '@globals/g-components/modules/widgets/WidgetStats';
import WidgetTables from '@globals/g-components/modules/widgets/WidgetTables';
import WidgetUserAndFeed from '@globals/g-components/modules/widgets/WidgetUserAndFeed';
import WidgetsScrollspyNav from '@globals/g-components/modules/widgets/WidgetsScrollspyNav';
const Widgets = () => {
    return (<div className="mb-9">
      <ScrollSpy>
        <WidgetsScrollspyNav />

        <ScrollSpy.Content id="stats" className="widgets-scrollspy">
          <WidgetStats />
        </ScrollSpy.Content>

        <ScrollSpy.Content id="tables" className="widgets-scrollspy">
          <WidgetTables />
        </ScrollSpy.Content>

        <ScrollSpy.Content id="e-commerce" className="widgets-scrollspy">
          <WidgetECommerce />
        </ScrollSpy.Content>

        <ScrollSpy.Content id="users-and-feed" className="widgets-scrollspy">
          <WidgetUserAndFeed />
        </ScrollSpy.Content>

        <ScrollSpy.Content id="forms" className="widgets-scrollspy">
          <WidgetForms />
        </ScrollSpy.Content>

        <ScrollSpy.Content id="others" className="widgets-scrollspy">
          <WidgetOthers />
        </ScrollSpy.Content>
      </ScrollSpy>
    </div>);
};
export default Widgets;
