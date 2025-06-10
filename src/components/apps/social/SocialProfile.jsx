import SocialCoverCard from '@globals/g-components/cards/SocialCoverCard';
import NavbarBottom from '@globals/g-components/modules/social/NavbarBottom';
import MutualNavigation from '@globals/g-components/list-items/MutualNavigation';
import SocialPhotos from '@globals/g-components/image-gallery/SocialPhotos';
import SocialPosts from '@globals/g-components/modules/social/SocialPosts';
import { profilePosts, socialPhotos } from '@globals/g-data/social/postsData';
import { Col, Row } from 'react-bootstrap';
import ProfileNavigation from '@globals/g-components/list-items/ProfileNavigation';
import { useMainLayoutContext } from '@globals/g-providers/MainLayoutProvider';
import { useEffect } from 'react';
const SocialProfile = () => {
    const { setFooterClass, setContentClass } = useMainLayoutContext();
    useEffect(() => {
        setFooterClass('d-none d-lg-block');
        setContentClass('widget-gap-large');
        return () => {
            setFooterClass('');
        };
    }, []);
    return (<>
      <div className="mb-9">
        <SocialCoverCard />
        <Row className="gy-3 gx-5 gx-xxl-6">
          <Col xl={4} className="d-none d-xl-block">
            <ProfileNavigation className="mb-8"/>
            <SocialPhotos className="mb-8" photos={socialPhotos}/>
            <MutualNavigation />
          </Col>
          <Col xl={8}>
            <SocialPosts posts={profilePosts}/>
          </Col>
        </Row>
      </div>
      <NavbarBottom active="profile" className="d-xl-none"/>
    </>);
};
export default SocialProfile;
