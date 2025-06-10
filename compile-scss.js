import path from 'path';
import fs from 'fs';
import * as sass from 'sass';
import rtlcss from 'rtlcss';

const compileSCSS = () => ({
  name: 'compile-scss',
  configureServer(server) {
    const scssWatcher = server.watcher;
    const scssGlob = path.resolve(process.cwd(), 'src/assets/scss/**/*.scss');
    scssWatcher.add(scssGlob);

    const scssFiles = [
      path.resolve(process.cwd(), 'src/assets/scss/theme.scss')
    ];

    const compileSCSSToCSS = async file => {
      const result = await sass.compileAsync(file, { style: 'expanded' });
      const fileName = path.basename(file, path.extname(file));

      // LTR CSS output
      const cssPath = path.resolve(process.cwd(), `public/css/${fileName}.css`);
      fs.mkdirSync(path.dirname(cssPath), { recursive: true });
      fs.writeFileSync(cssPath, result.css);

      // RTL CSS output
      const rtlResult = rtlcss.process(result.css);
      const rtlCssPath = path.resolve(
        process.cwd(),
        `public/css/${fileName}.rtl.css`
      );
      fs.writeFileSync(rtlCssPath, rtlResult);
    };

    scssWatcher.on('change', file => {
      if (file.endsWith('.scss')) {
        scssFiles.forEach(scssFile => compileSCSSToCSS(scssFile));
        server.hot.send({ type: 'full-reload' });
      }
    });

    // Initial build
    scssFiles.forEach(scssFile => compileSCSSToCSS(scssFile));
  }
});

export default compileSCSS;
