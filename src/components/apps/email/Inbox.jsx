import EmailLayout from '@globals/g-layouts/EmailLayout';
import { Col } from 'react-bootstrap';
import InboxToolbar from '@globals/g-components/modules/email/InboxToolbar';
import { emails } from '@globals/g-data/email';
import EmailRow from '@globals/g-components/modules/email/EmailRow';
import BulkSelectProvider from '@globals/g-providers/BulkSelectProvider';
const Inbox = () => {
    return (<EmailLayout page="inbox">
      <Col xs={12} lg>
        <div className="px-lg-1">
          <BulkSelectProvider data={emails}>
            <InboxToolbar className="inbox-toolbar"/>
            {emails.map((email, index) => (<EmailRow index={index} email={email} key={email.id}/>))}
          </BulkSelectProvider>
        </div>
      </Col>
    </EmailLayout>);
};
export default Inbox;
