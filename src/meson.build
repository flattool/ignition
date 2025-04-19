pkgdatadir = get_option('datadir') / meson.project_name()
gnome = import('gnome')

blueprints = custom_target('blueprints',
  input: files(
    'first_run_page/first-run-page.blp',
    'gtk/entry-group.blp',
    'gtk/entry-row.blp',
    'gtk/help-overlay.blp',
    'main_view/app-list-page.blp',
    'main_view/choices-page.blp',
    'main_view/details-page.blp',
    'main_view/entries-page.blp',
    'main_view/main-view.blp',
    'window/window.blp',
  ),
  output: '.',
  command: [find_program('blueprint-compiler'), 'batch-compile', '@OUTPUT@', '@CURRENT_SOURCE_DIR@', '@INPUT@'],
)

data_res = gnome.compile_resources('io.github.flattool.Ignition.data',
  'io.github.flattool.Ignition.data.gresource.xml',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
  dependencies: blueprints,
)

bin_conf = configuration_data()
bin_conf.set('GJS', find_program('gjs').full_path())
bin_conf.set('PACKAGE_VERSION', meson.project_version())
bin_conf.set('PACKAGE_NAME', meson.project_name())
bin_conf.set('prefix', get_option('prefix'))
bin_conf.set('libdir', get_option('prefix') / get_option('libdir'))
bin_conf.set('datadir', get_option('prefix') / get_option('datadir'))
bin_conf.set('resource_path', '/io/github/flattool/Ignition')

bin_conf.set('APP_ID', 'io.github.flattool.Ignition')
bin_conf.set('PROFILE', profile)
if get_option('profile') == 'development'
  vcs_tag = run_command('git', 'rev-parse', '--short', 'HEAD').stdout().strip()
  bin_conf.set('VERSION', meson.project_version() + '.dev-' + vcs_tag)
else
  bin_conf.set('VERSION', meson.project_version())
endif

const_js = configure_file(
  input: 'config.js',
  output: 'config.js',
  configuration: bin_conf,
)

src_res = gnome.compile_resources('io.github.flattool.Ignition.src',
  'io.github.flattool.Ignition.src.gresource.xml',
  gresource_bundle: true,
  install: true,
  install_dir: pkgdatadir,
  dependencies: [
    const_js
  ],
)

configure_file(
  input: 'io.github.flattool.Ignition.in',
  output: 'io.github.flattool.Ignition',
  configuration: bin_conf,
  install: true,
  install_dir: get_option('bindir')
)
