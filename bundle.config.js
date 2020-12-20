module.exports = {
    input: './src/core.js',
    output: './dist/core.js',
    namespace: 'B',
    namespaceFunction: null,
    adjustConfigPhp: false,
    protected: true,
    concat: {
        js: [
            './src/internal/wrap-start.js',
            './dist/core.js',
            './src/internal/wrap-end.js',
        ],
    },

};

