module.exports = [
    '.eslintrc',
    '.gitignore',
    'package.json',
    'webpack.config.common.js',
    'webpack.config.dev.js',
    'webpack.config.prod.js',
    {
        name: 'client',
        children: [
            'index.html',
            {
                name: 'script',
                children: [
                    'app.jsx',
                    'polyfills.js',
                    {
                        name: 'reducers.js',
                        onlyIf: 'redux',
                    },
                    {
                        name: 'store.js',
                        onlyIf: 'redux',
                    },
                    {
                        name: 'components',
                        children: [
                            'App.jsx',
                        ],
                    },
                    {
                        name: 'actions',
                        children: [],
                        onlyIf: 'redux',
                    },
                    {
                        name: 'reducers',
                        children: [],
                        onlyIf: 'redux',
                    },
                ],
            },
            {
                name: 'style',
                children: [
                    'app.sass',
                ],
            },
        ],
    },
    {
        name: 'public',
        children: [
            'index.html',
        ],
    },
];
