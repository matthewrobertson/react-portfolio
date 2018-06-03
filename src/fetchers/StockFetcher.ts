import { Dispatch } from 'react-redux';
import * as actions from '../actions';
import { Currency } from '../constants/types';
import { parseInteger } from '../utils/Utils';
import AlphaURLBuilder from './AlphaURLBuilder';

export default function fetchStockQuote(dispatch: Dispatch<actions.ActionType>, ticker: string): void {
    const url = AlphaURLBuilder.getStockQuoteURL(ticker);
    fetch(url)
        .then(r => r.json())
        .then((apiResp) => {
            const ts = apiResp["Time Series (1min)"];
            const fk = Object.keys(ts)[0];
            const raw = ts[fk];
            const quote = {
                close: parseFloat(raw['4. close']),
                currency: Currency.USD,
                open: parseFloat(raw['1. open']),
                ticker,
                volume: parseInteger(raw['5. volume']),
            };
            dispatch(actions.fetchStockQuoteSuccess(ticker, quote));
            dispatch(actions.addHolding(ticker, quote.close));
        }).catch((error) => { 
            dispatch(actions.fetchStockQuoteError(ticker, 'Invalid Ticker'));
        });
}

const DEFAULT_EXCHANGE_RATE: number = 1.25;
export function fetchExchangeRate(dispatch: Dispatch<actions.ActionType>): void {
    dispatch(actions.fetchExchangeRateStart());
    const url = AlphaURLBuilder.getCurrencyExchange('CAD');
    fetch(url)
        .then(r => r.json())
        .then((apiResp) => {
            const rate = parseFloat(
                apiResp['Realtime Currency Exchange Rate']['5. Exchange Rate'],
            );
            dispatch(actions.fetchExchangeRateSuccess(rate));
        }).catch((error) => { 
            dispatch(actions.fetchExchangeRateError(DEFAULT_EXCHANGE_RATE));
        });
}
