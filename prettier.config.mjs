/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 120,
  endOfLine: 'auto',
  singleAttributePerLine: true,
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)(?<!\\.(svg|png|jpg|css|scss))$',
    '^\\.\\./(.*)(?<!\\.(svg|png|jpg|css|scss))$',
    '^\\./(.*)(?<!\\.(svg|png|jpg|css|scss))$',
    '\\.(svg|png|jpg)$',
    '\\.(css|scss)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};

export default config;
