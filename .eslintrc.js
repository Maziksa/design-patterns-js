module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
    }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off', // Разрешаем именованные экспорты
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-useless-constructor': 'off', // TypeScript конструкторы с параметрами полезны
    'no-empty-function': 'off', // Разрешаем пустые конструкторы TypeScript
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'max-len': ['error', { code: 120, ignoreComments: true }],
    'lines-between-class-members': ['error', 'always', {
      exceptAfterSingleLine: true,
    }],
    'no-restricted-syntax': 'off',
    'linebreak-style': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
