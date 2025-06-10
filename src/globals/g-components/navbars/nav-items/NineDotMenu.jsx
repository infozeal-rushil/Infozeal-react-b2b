import { useState } from 'react';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import behance from '@src/assets/img/nav-icons/behance.webp';
import googleCloud from '@src/assets/img/nav-icons/google-cloud.webp';
import slack from '@src/assets/img/nav-icons/slack.webp';
import gitlab from '@src/assets/img/nav-icons/gitlab.webp';
import bitbucket from '@src/assets/img/nav-icons/bitbucket.webp';
import googleDrive from '@src/assets/img/nav-icons/google-drive.webp';
import trello from '@src/assets/img/nav-icons/trello.webp';
import figma from '@src/assets/img/nav-icons/figma.webp';
import twitter from '@src/assets/img/nav-icons/twitter.webp';
import pinterest from '@src/assets/img/nav-icons/pinterest.webp';
import ln from '@src/assets/img/nav-icons/ln.webp';
import googleMaps from '@src/assets/img/nav-icons/google-maps.webp';
import googlePhotos from '@src/assets/img/nav-icons/google-photos.webp';
import spotify from '@src/assets/img/nav-icons/spotify.webp';
import Scrollbar from '@globals/g-components/base/Scrollbar';
const NineDotMenu = () => {
  const [items] = useState([
    { img: behance, title: 'Behance' },
    { img: googleCloud, title: 'Cloud' },
    { img: slack, title: 'Slack' },
    { img: gitlab, title: 'Gitlab' },
    { img: bitbucket, title: 'BitBucket' },
    { img: googleDrive, title: 'Drive' },
    { img: trello, title: 'Trello' },
    { img: figma, title: 'Figma', width: '20' },
    { img: twitter, title: 'Twitter' },
    { img: pinterest, title: 'Pinterest' },
    { img: ln, title: 'Linkedin' },
    { img: googleMaps, title: 'Maps' },
    { img: googlePhotos, title: 'Photos' },
    { img: spotify, title: 'Spotify' }
  ]);
  return (
    <Dropdown.Menu
      align="end"
      className="navbar-dropdown-caret py-0 dropdown-nine-dots shadow border"
    >
      <Card
        className="position-relative border-0"
        style={{ height: '20rem', minWidth: 244 }}
      >
        <Scrollbar>
          <Card.Body className="pt-3 px-3 pb-0">
            <Row className="text-center align-items-center g-0">
              {items.map(item => (
                <Col xs={4} key={item.title}>
                  <Link
                    to="#!"
                    className="d-block bg-body-secondary-hover p-2 rounded-3 text-center text-decoration-none mb-3"
                  >
                    <img
                      src={item.img}
                      alt="behance"
                      width={item.width || 30}
                    />
                    <p className="mb-0 text-body-emphasis text-truncate fs-10 mt-1 pt-1">
                      {item.title}
                    </p>
                  </Link>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Scrollbar>
      </Card>
    </Dropdown.Menu>
  );
};
export default NineDotMenu;
