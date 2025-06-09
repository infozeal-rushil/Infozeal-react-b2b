var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bgLeft27 from '@src/assets/img/bg/bg-left-27.png';
import bgRight27 from '@src/assets/img/bg/bg-right-27.png';
import gallery35 from '@src/assets/img/gallery/35.png';
import gallery36 from '@src/assets/img/gallery/36.png';
import gallery37 from '@src/assets/img/gallery/37.png';
import gallery38 from '@src/assets/img/gallery/38.png';
import Button from '@globals/g-components/base/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
const ImageZoomHoverCard = _a => {
  var { src, title, subTitle, imgClass = 'h-100' } = _a,
    rest = __rest(_a, ['src', 'title', 'subTitle', 'imgClass']);
  return (
    <div className="img-zoom-hover position-relative h-100 rounded-3 overflow-hidden">
      <Link to="#!">
        <img
          className={`w-100 object-fit-cover ${imgClass}`}
          src={src}
          alt=""
          {...rest}
        />
      </Link>
      <div className="backdrop-faded">
        <Link to="#!" className="fw-bold fs-7 text-white streched-link">
          {title}
        </Link>
        <p className="mb-0 text-white fs-9">{subTitle}</p>
      </div>
    </div>
  );
};
const SeasonOfTour = () => {
  return (
    <section className="pt-6 pt-md-10 pb-10">
      <div className="container-medium">
        <div
          className="bg-holder d-none d-xl-block bg-left"
          style={{
            backgroundImage: `url(${bgLeft27})`,
            backgroundSize: 'auto'
          }}
        />
        <div
          className="bg-holder d-none d-xl-block bg-right"
          style={{
            backgroundImage: `url(${bgRight27})`,
            backgroundSize: 'auto'
          }}
        />
        <Row className="g-3 position-relative">
          <Col lg={6}>
            <Row className="g-3">
              <Col md={7}>
                <h4 className="fw-semibold mb-3">Season of </h4>
                <h2 className="fs-4 fw-semibold mb-3 mb-md-4">
                  Tour &{' '}
                  <span className="text-primary-light fw-bold">Travel</span>
                </h2>
                <p className="mb-3 mb-md-0 text-body-tertiary">
                  This is the perfect season for tours and travels. At Phoenix,
                  you can easily select the best travel option for your next
                  vacation
                  <span className="d-none d-lg-inline-block d-xl-none">
                    ...
                  </span>
                  <span className="d-lg-none d-xl-inline">
                    This will help you with the pricing that you’ll need, the
                    accommodation facilities, food and beverages, and water
                    rides.
                  </span>
                </p>
              </Col>

              <Col xs={6} md={5}>
                <ImageZoomHoverCard
                  src={gallery35}
                  title="New Zealand"
                  subTitle="17 Hotels"
                />
              </Col>
              <Col xs={6} md={5}>
                <ImageZoomHoverCard
                  src={gallery36}
                  title="London"
                  subTitle="17 Hotels"
                />
              </Col>
              <Col md={7}>
                <ImageZoomHoverCard
                  src={gallery37}
                  title="Maui"
                  subTitle="14 Hotels"
                  imgClass="h-md-100"
                />
              </Col>
            </Row>
          </Col>
          <Col lg={6}>
            <div className="d-flex flex-column gap-3 h-100">
              <ImageZoomHoverCard
                src={gallery38}
                title="Bali, Indonesia"
                subTitle="51 Hotels"
                imgClass="h-lg-100"
                style={{ height: 220 }}
              />
              <Button variant="primary" className="w-100 py-3 fs-8">
                Explore more
                <FontAwesomeIcon
                  className="ms-2"
                  icon={faChevronRight}
                  transform="down-2"
                />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};
export default SeasonOfTour;
