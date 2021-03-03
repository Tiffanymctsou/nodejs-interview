module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        semi: ['warn', 'always'],
        'semi-style': ['warn', 'last'],
        indent: ['warn', 4]
    }
};
