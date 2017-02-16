This package helps you to use mjml and handlebars in a easy way. As mjml is a pretty big dependency,
loading it all up just for in-time conversion seems the wrong approach, this package compiles .mjml files to .js files at compile-time and makes them available as handlebar templates.

This package is based on cmather:handlebars-server.

## Install the package
`> meteor add pozylon:mjml-server`

## Usage

Any files with a .mjml will be available as functions under
the `MJML.templates` namespace.

The templates need to be accessible to the server (i.e. put them inside your
/server directory).

The files should just be regular mjml files.

## License
MIT
