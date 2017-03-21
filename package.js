Package.describe({
  name: 'kaufmae:mjml-server',
  version: '0.2.0',
  summary: 'Allows MJML templates to be defined on the server in .mjml files',
  git: 'https://github.com/pozylon/meteor-mjml-server.git',
  documentation: 'README.md',
});

Npm.depends({
  handlebars: '4.0.6',
});

Package.registerBuildPlugin({
  name: 'compileServerMjmlTemplates',
  use: [
    'caching-compiler@1.1.9',
    'ecmascript',
    'ejson@1.0.13',
  ],
  sources: [
    'plugin/compile-mjml.js',
  ],
  npmDependencies: {
    handlebars: '4.0.6',
    mjml: '3.3.0',
  },
});

Package.onUse((api) => {
  api.versionsFrom('1.4.3.2');

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
    'kaufmae:mjml-server',
    'test-helpers',
  ], 'server');

  api.addFiles([
    'mjml-server-tests.js',
  ], 'server');
});
