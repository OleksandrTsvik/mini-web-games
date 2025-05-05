import queryString, { StringifyOptions } from 'query-string';

import { BotLevel } from './tic-tac-toe/local/_types/game.types';

const stringifyOptions: StringifyOptions = { skipNull: true, skipEmptyString: true };

export const ROUTING = {
  TIC_TAC_TOE: '/tic-tac-toe',
  TIC_TAC_TOE_LOCAL: (level?: BotLevel) =>
    queryString.stringifyUrl({ url: '/tic-tac-toe/local', query: { level } }, stringifyOptions),
};
