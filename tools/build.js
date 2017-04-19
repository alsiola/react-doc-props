const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const pkg = require('../package.json');

const bundles = [
    {
        format: 'cjs', ext: '.js', plugins: [],
        babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [
            'transform-es2015-destructuring',
            'transform-es2015-function-name',
            'transform-es2015-parameters',
        ]
    },
    {
        format: 'es', ext: '.mjs', plugins: [],
        babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [
            'transform-es2015-destructuring',
            'transform-es2015-function-name',
            'transform-es2015-parameters'
        ]
    },
    {
        format: 'cjs', ext: '.browser.js', plugins: [],
        babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: []
    },
    {
        format: 'umd', ext: '.js', plugins: [],
        babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
        moduleName: 'my-library'
    },
    {
        format: 'umd', ext: '.min.js', plugins: [uglify()],
        babelPresets: ['es2015-rollup', 'stage-1'], babelPlugins: [],
        moduleName: 'my-library', minify: true
    }
];

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel and Rollup
for (const config of bundles) {
    promise = promise.then(() => rollup.rollup({
        entry: 'src/index.js',
        external: Object.keys(pkg.dependencies),
        plugins: [
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: config.babelPresets,
                plugins: config.babelPlugins,
                runtimeHelpers: true
            })
        ].concat(config.plugins),
    }).then(bundle => bundle.write({
        dest: `dist/${config.moduleName || 'main'}${config.ext}`,
        format: config.format,
        sourceMap: !config.minify,
        moduleName: config.moduleName,
    })));
}

promise.catch(err => console.error(err.stack));