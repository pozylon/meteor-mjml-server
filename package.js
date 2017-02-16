Package.describe({
  name: 'pozylon:mjml-server',
  version: '0.1.0',
  summary: 'Allows MJML templates to be defined on the server in .mjml files',
  git: 'https://github.com/pozylon/meteor-mjml-server.git',
  documentation: 'README.md',
});

Npm.depends({
  handlebars: '4.0.4',
});

Package.registerBuildPlugin({
  name: 'compileServerMjmlTemplates',

  use: [
    'caching-compiler@1.0.0',
    'ecmascript',
    'ejson@1.0.7',
  ],

  sources: [
    'plugin/compile-mjml.js',
  ],

  npmDependencies: {
    handlebars: '4.0.4',
    mjml: '3.2.2',
  },
});

Package.onUse((api) => {
  api.versionsFrom('1.2.0.1');

  api.use([
    'ecmascript',
    'underscore',
    'isobuild:compiler-plugin@1.0.0',
  ], 'server');

  api.addFiles('mjml-server.js', 'server');

  api.export([
    'MJML',
    'OriginalHandlebars',
  ], 'server');
});

Package.onTest((api) => {
  api.use([
    'tinytest',
    'pozylon:mjml-server',
    'test-helpers',
  ], 'server');

  api.addFiles([
    'mjml-server-tests.mjml',
    'mjml-server-tests-2.mjml',
    'mjml-server-tests.js',
  ], 'server');
});
