import { IHoldingDetails } from '../../constants/types';
import { initializeHolding, recomputeHolding } from '../HoldingHelpers';

describe('initializeHolding', () => {
    it('initializes the defaults correctly', () => {
        const holding = initializeHolding('FB', 123.12);
        expect(holding.currentPercentage).toEqual(0);
        expect(holding.shareCount).toEqual(0);
        expect(holding.sharePrice).toEqual(123.12);
        expect(holding.targetPercent).toEqual(0);
        expect(holding.ticker).toEqual('FB');
        expect(holding.totalValue).toEqual(0);
        expect(holding.sharePrice).toEqual(123.12);
    });
});


describe('recomputeHolding', () => {
    let holding: IHoldingDetails;
    beforeEach(() => holding = initializeHolding('FB', 100.00));
    
    it ('computes total value', () => {
        const newHolding = recomputeHolding(holding, 1000.00, 5);
        expect(newHolding.totalValue).toEqual(500.00);
    });

    it ('computes portfolio precentage', () => {
        const newHolding = recomputeHolding(holding, 1000.00, 1);
        expect(newHolding.currentPercentage).toEqual(10);
    });
});

