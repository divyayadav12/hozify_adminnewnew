import reactPlugin from 'eslint-plugin-react';

export default [
  {
    files: ['src/pages/Partners/**/*.jsx', 'src/pages/PartnerDetails/**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    plugins: {
      react: reactPlugin
    },
    rules: {
      'no-undef': 'error'
    }
  }
];
