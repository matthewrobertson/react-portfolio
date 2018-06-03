const API_KEY: string = 'YSNPPW3VRX4K0TP4';

class AlphaURLBuilder {

    public static getCurrencyExchange(currency: string = 'CDN'): string {
        return (new AlphaURLBuilder()).getBaseURL('CURRENCY_EXCHANGE_RATE', {
            from_currency: 'USD',
            to_currency: currency,
        });
    }

    public static getStockQuoteURL(ticker: string): string {
        return (new AlphaURLBuilder()).getBaseURL('TIME_SERIES_INTRADAY', {
            interval: '1min',
            symbol: ticker,
        });
    }

    constructor(
        private domain: string = 'www.alphavantage.co',
        private apiKey: string = API_KEY,
    ) {}

    public getBaseURL(method: string, params: {[k: string]: string}): string {
        const paramString = [];
        for (const key of Object.keys(params)) {
            paramString.push(`${key}=${params[key]}`)
        }
        return `https://${this.domain}/query?apikey=${this.apiKey}&function=${method}&${paramString.join('&')}`;
    }
}


// https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo

export default AlphaURLBuilder;