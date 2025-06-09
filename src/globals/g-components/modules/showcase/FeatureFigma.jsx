import { useRef } from 'react';
import figmaIcon from '@src/assets/img/icons/figma.png';
import figmaBg from '@src/assets/img/bg/figma.png';
import useParallaxHooks from 'hooks/useParallaxHooks';
const FeatureFigma = () => {
  const containerRef = useRef(null);
  const parallaxElRef = useRef([]);
  useParallaxHooks(containerRef, parallaxElRef);
  return (
    <section
      className="py-12 position-relative overflow-hidden bg-body-highlight"
      ref={containerRef}
    >
      <div
        className="bg-gradient-figma"
        ref={el => {
          var _a;
          return (_a = parallaxElRef.current) === null || _a === void 0
            ? void 0
            : _a.push(el);
        }}
        data-parallax={JSON.stringify({
          y: '-90%',
          scrollTrigger: { end: 'top -20%' }
        })}
      />
      <img
        className="feature-figma-img"
        src={figmaBg}
        alt=""
        ref={el => {
          var _a;
          return (_a = parallaxElRef.current) === null || _a === void 0
            ? void 0
            : _a.push(el);
        }}
        data-parallax={JSON.stringify({ y: '-50%' })}
      />
      <div className="position-relative container-small text-center">
        <div className="d-flex gap-3 justify-content-center mb-3">
          <img src={figmaIcon} alt="" />
          <h1 className="text-white">Figma design files</h1>
        </div>
        <p className="mb-0 text-white">
          Modern &amp; highly customizable, simple and user-friendly UI
          components 🎨 based on Bootstrap design system only for you!
        </p>
      </div>
    </section>
  );
};
export default FeatureFigma;
