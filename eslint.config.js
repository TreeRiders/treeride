import antfu from '@antfu/eslint-config'

const config = antfu(
  {
    typescript: {
      parserOptions: {
        project: [
          './tsconfig.json',
          './apps/*/tsconfig.json',
          './apps/*/tsconfig.web.json',
          './apps/*/tsconfig.node.json',
          './packages/*/tsconfig.json',
          './packages/*/tsconfig.web.json',
          './packages/*/tsconfig.node.json',
        ],
      },
      overrides: {
        'ts/consistent-type-definitions': 'off',
        'id-length': ['error', { min: 2, exceptions: ['i', 'j', 'k', 'x', 'y', 'z', '_'] }],
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'Don\'t declare enums',
          },
        ],
      },
    },
    react: {
      overrides: {
        'react/prop-types': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.mdx'] }],
        'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
        'react/jsx-first-prop-new-line': ['error', 'always'],
        'react/jsx-sort-props': [
          1,
          {
            callbacksLast: true,
            shorthandFirst: true,
            shorthandLast: false,
            ignoreCase: false,
            noSortAlphabetically: false,
            reservedFirst: false,
          },
        ],
      },
    },
    ignores: [
      '**/node_modules/',
      'node_modules',
      '**/dist/',
      '**/out/',
    ],
  },
  {
    rules: {
      'antfu/top-level-function': 'off',
      'curly': ['error', 'all'],
    },
  },
  {
    files: [
      'packages/**',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

)

export default config
