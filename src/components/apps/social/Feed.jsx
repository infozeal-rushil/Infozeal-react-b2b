import SocialProfileCard from '@globals/g-components/cards/SocialProfileCard';
import Events from '@globals/g-components/modules/events/Events';
import NavbarBottom from '@globals/g-components/modules/social/NavbarBottom';
import SocialMessages from '@globals/g-components/list-items/SocialMessages';
import SocialPhotos from '@globals/g-components/image-gallery/SocialPhotos';
import SocialPosts from '@globals/g-components/modules/social/SocialPosts';
import { events } from '@globals/g-data/eventsData';
import { messages } from '@globals/g-data/social/messages';
import { feedPosts, socialPhotos } from '@globals/g-data/social/postsData';
import { Col, Row } from 'react-bootstrap';
import ProfileNavigation from '@globals/g-components/list-items/ProfileNavigation';
import FeedTextarea from '@globals/g-components/forms/FeedTextarea';
import { useMainLayoutContext } from '@globals/g-providers/MainLayoutProvider';
import { useEffect } from 'react';
import profileImage from '@src/assets/img/team/59.webp';
const Feed = () => {
  const { setFooterClass } = useMainLayoutContext();
  useEffect(() => {
    setFooterClass('d-none d-lg-block');
    return () => {
      setFooterClass('');
    };
  }, []);
  return (
    <>
      <div className="mb-9">
        <Row className="gy-3 gx-5 gx-xxl-6">
          <Col lg={5} xl={4} className="d-none d-lg-block">
            <SocialProfileCard
              showAbout={true}
              avatar={profileImage}
              className="mb-5"
            />
            <ProfileNavigation />
            <div className="mb-8 mt-6">
              <SocialMessages messages={messages} />
            </div>
            <div className="mb-8">
              <SocialPhotos photos={socialPhotos} />
            </div>
            <Events events={events} title="Events" />
          </Col>
          <Col lg={7} xl={8}>
            <FeedTextarea className="mb-5" />
            <SocialPosts posts={feedPosts} />
          </Col>
        </Row>
      </div>
      <NavbarBottom active="home" className="d-lg-none" />
    </>
  );
};
export default Feed;
