const API_KEY: string = 'YSNPPW3VRX4K0TP4';

class AlphaURLBuilder {
    private ticker: string;

    constructor(
        private domain: string = 'www.alphavantage.co',
        private apiKey: string = API_KEY,
        private method: string = 'TIME_SERIES_INTRADAY',
    ) {}

    public setTicker(ticker: string): AlphaURLBuilder {
        this.ticker = ticker;
        return this;
    }

    public toString(): string {
        return `https://${this.domain}/query?interval=1min&apikey=${this.apiKey}&function=${this.method}&symbol=${this.ticker}`;
    }
}

export default AlphaURLBuilder;