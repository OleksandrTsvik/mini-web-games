import queryString, { StringifyOptions } from 'query-string';

import { BotLevel } from './tic-tac-toe/_types/game.types';

const stringifyOptions: StringifyOptions = { skipNull: true, skipEmptyString: true };

export const ROUTING = {
  TIC_TAC_TOE: (level?: BotLevel) =>
    queryString.stringifyUrl({ url: '/tic-tac-toe', query: { level } }, stringifyOptions),
  TIC_TAC_TOE_SETTINGS: '/tic-tac-toe/settings',
};
