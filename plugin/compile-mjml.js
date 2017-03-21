/* global Plugin */
/* global CachingCompiler */
/* eslint-disable no-console */
const mjml2html = Npm.require('mjml').mjml2html;

class MJMLCompiler extends CachingCompiler {
  constructor() {
    super({
      compilerName: 'mjml',
      defaultCacheSize: 1024 * 1024 * 10,
    });
  }
  compileOneFile(file) {
    const output = this.compileHandlebar(file);
    file.addJavaScript({
      data: output,
      path: `${file.getPathInPackage()}.js`,
    });
  }
  getCacheKey(file) { return [file.getSourceHash()]; } // eslint-disable-line
  compileHandlebar(file) { // eslint-disable-line
    const templateName = file.getBasename().replace(/(.mjml)/, '');
    const html = mjml2html(file.getContentsAsString(), { minify: true });
    if (html.errors) html.errors.forEach(error => console.warn(error.formattedMessage));
    if (!html.html) return console.error(`could not compile${templateName}`);
    const content = EJSON.stringify(html.html);
    const output = `
      MJML.templates = MJML.templates || {};
      var template = OriginalHandlebars.compile(${content});
      MJML.templates['${templateName}'] = function(data, partials){
        return template(data || {}, {
          helpers: OriginalHandlebars.helpers,
          partials: partials || {},
          name: '${templateName}'
         });
      }`;
    return output;
  }
}

Plugin.registerCompiler({
  extensions: ['mjml'],
  archMatching: 'os',
}, () => new MJMLCompiler());
