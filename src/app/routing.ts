import queryString, { StringifyOptions } from 'query-string';

const stringifyOptions: StringifyOptions = { skipNull: true, skipEmptyString: true };

export const ROUTING = {
  TIC_TAC_TOE: '/tic-tac-toe',
  TIC_TAC_TOE_LOCAL: (botLevel?: string) =>
    queryString.stringifyUrl({ url: '/tic-tac-toe/local', query: { level: botLevel } }, stringifyOptions),
};
