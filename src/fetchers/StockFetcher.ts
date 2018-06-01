import { Dispatch } from 'react-redux';
import * as actions from '../actions';
import AlphaURLBuilder from './AlphaURLBuilder';

export default function fetchStockQuote(dispatch: Dispatch<actions.ActionType>, ticker: string): void {
    const url = (new AlphaURLBuilder())
        .setTicker(ticker)
        .toString();
    fetch(url)
        .then(r => r.json())
        .then((apiResp) => {
            const ts = apiResp["Time Series (1min)"];
            const fk = Object.keys(ts)[0];
            const raw = ts[fk];
            const quote = {
                close: parseFloat(raw['4. close']),
                open: parseFloat(raw['1. open']),
                ticker,
                volume: parseInt(raw['5. volume'], 10),
            };
            dispatch(actions.fetchStockQuoteSuccess(ticker, quote));
            dispatch(actions.addHolding(ticker)); 
        }).catch((error) => { 
            dispatch(actions.fetchStockQuoteError(ticker, 'Invalid Ticker'));
        });
}

