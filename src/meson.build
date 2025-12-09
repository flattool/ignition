pkgdatadir = get_option('datadir') / meson.project_name()
gnome = import('gnome')

blueprint_compiler = find_program('blueprint-compiler')
python = find_program('python3')
python_blp_code = '''
import sys, subprocess
from pathlib import Path
blp_compiler = sys.argv[1]
src_dir = Path(sys.argv[2])
out_dir = sys.argv[3]
blps = [str(file) for file in src_dir.rglob("*.blp")]
subprocess.run([blp_compiler, "batch-compile", out_dir, src_dir] + blps, check=True)
'''

blueprints = custom_target(
	'blueprints',
	input: [],
	output: '.',
	build_by_default: true,
	build_always_stale: true,
	command: [
		python,
		'-c', python_blp_code,
		blueprint_compiler,
		meson.current_source_dir(),
		meson.current_build_dir(),
	],
)

tsc_out = meson.project_build_root() / 'tsc-out'

custom_target(
	'typescript-compile',
	build_by_default: true,
	build_always_stale: true,
	output: ['tsc-output'],
	command: [
		tsc,
		'-p', meson.project_source_root() / 'tsconfig.json',
		'--outDir', tsc_out,
	],
)

install_subdir(
	tsc_out,
	install_dir: get_option('bindir'),
	strip_directory: true,
	install_tag: 'tsc-js',
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

data_res = gnome.compile_resources(
	'io.github.flattool.Ignition.data',
	'io.github.flattool.Ignition.data.gresource.xml',
	gresource_bundle: true,
	install: true,
	install_dir: pkgdatadir,
	dependencies: [blueprints],
)

configure_file(
	input: 'io.github.flattool.Ignition.in',
	output: 'io.github.flattool.Ignition',
	configuration: bin_conf,
	install: true,
	install_dir: get_option('bindir'),
	install_mode: ['rwxr-xr-x', 'root', 'root'],
)
