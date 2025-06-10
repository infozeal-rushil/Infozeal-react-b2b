import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parseData } from 'helpers/utils';
import merge from 'lodash.merge';
import { useLayoutEffect } from 'react';
gsap.registerPlugin(ScrollTrigger);
const useParallaxHooks = (containerRef, parallaxElRef, commonOptions) => {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const elRefs = Array.isArray(parallaxElRef.current)
                ? parallaxElRef.current
                : [parallaxElRef.current];
            elRefs.forEach(elRef => {
                const elOptions = parseData((elRef === null || elRef === void 0 ? void 0 : elRef.getAttribute('data-parallax')) || '');
                const options = merge({
                    ease: 'none',
                    scrollTrigger: {
                        trigger: elRef,
                        scrub: true,
                        start: 'top bottom',
                        toggleActions: 'play none none reverse'
                    }
                }, commonOptions, elOptions);
                gsap.to(elRef, options);
            });
        }, containerRef); //
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, []);
};
export default useParallaxHooks;
