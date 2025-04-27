const { series } = require('gulp');
const fs = require('fs');
const gulp = require('gulp');
const zip = require('gulp-zip');
const merge = require('merge-stream');
const esbuild = require('esbuild');

const filesToCopy = [
    'extension.js',
    'package.json',
    'icon.png',
    'LICENSE.md',
    'README.md'
];

function build(done) {
    esbuild.build({
        bundle: true,
        entryPoints: ['./src/extension.ts'],
        outfile: './dist/extension.js',
        platform: 'node',
        external: ['flashpoint-launcher', '*.css'],
    })
    .catch(console.error)
    .then(async () => {
        try {
            return await esbuild.build({
                bundle: true,
                entryPoints: ['./src/components.ts'],
                outfile: './static/components.js',
                format: 'esm',
                target: ['es2020'],
                platform: 'browser',
                external: ['flashpoint-launcher', '*.css'],
            });
        } catch (message) {
            return console.error(message);
        }
    })
    .finally(done);
}

async function watch() {
    const ctx = await esbuild.context({
        bundle: true,
        entryPoints: ['./src/extension.ts'],
        outfile: './dist/extension.js',
        platform: 'node',
        external: ['flashpoint-launcher', '*.css'],
    });

    const ctx2 = await esbuild.context({
        bundle: true,
        entryPoints: ['./src/components.ts'],
        outfile: './static/components.js',
        format: 'esm',
        target: ['es2020'],
        platform: 'browser',
        external: ['flashpoint-launcher', '*.css'],
    });

    return Promise.all([ctx.watch(), ctx2.watch()]);
}

function clean(cb) {
    fs.rm('./package', { recursive: true }, (err) => {
        if (err) { console.log('Clean', err); }
        cb();
    });
}

function stage() {
    const streams = filesToCopy.map(file => {
        if (fs.existsSync(file)) {
            return gulp.src(file).pipe(gulp.dest('package/core-nga'));
        }
    }).filter(s => s !== undefined);
    return merge([
        ...streams,
        gulp.src('out/**/*').pipe(gulp.dest('package/core-nga/out')),
        gulp.src('dist/**/*').pipe(gulp.dest('package/core-nga/dist')),
        gulp.src('static/**/*').pipe(gulp.dest('package/core-nga/static')),
    ]);
}

function package() {
    return gulp.src('package/**/*').pipe(zip('core-nga.fplx')).pipe(gulp.dest('.'));
}

exports.build = series(build);
exports.watch = series(watch);
exports.package = series(clean, stage, package);