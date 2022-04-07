module.exports = {
    extends: [
        'plugin:@angular-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        files: ['*.ts', '*.json'], // Your TypeScript files extension
        sourceType: 'module',
        extraFileExtensions: ['.json'],
    },
    rules: {
        // ORIGINAL tslint.json -> "directive-selector": [true, "attribute", "app", "camelCase"],
        '@angular-eslint/directive-selector': [
            'error',
            { type: 'attribute', prefix: 'app', style: 'camelCase' },
        ],
        // ORIGINAL tslint.json -> "component-selector": [true, "element", "app", "kebab-case"],
        '@angular-eslint/component-selector': [
            'error',
            { type: 'element', prefix: 'app', style: 'kebab-case' },
        ],
    },
    ignorePatterns: ['.eslintrc.js'],
    overrides: [
        /**
         * This extra piece of configuration is only necessary if you make use of inline
         * templates within Component metadata, e.g.:
         */
        {
            files: ['*.component.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            plugins: ['@angular-eslint/template'],
            processor: '@angular-eslint/template/extract-inline-html',
        },
        // Custom rules for TypeScript
        {
            files: ['*.ts'],
            extends: [
                'airbnb-typescript/base',
                'plugin:prettier/recommended',
                "plugin:@angular-eslint/recommended",
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            rules: {
                "import/no-extraneous-dependencies": "off",
                "@angular-eslint/no-empty-lifecycle-method": "off",
                "@typescript-eslint/naming-convention": "off",
                "@typescript-eslint/no-unused-expressions": "off",
                "import/extensions": "off",
                'import/no-unresolved': 'off',
                'import/prefer-default-export': 'off',
                'class-methods-use-this': 'off',
                'lines-between-class-members': 'off',
                '@typescript-eslint/unbound-method': [
                    'error',
                    {
                        ignoreStatic: true,
                    },
                ],
            },
        },
    ]
}