import * as React from 'react';
import { Currency, IHoldingDetails } from '../constants/types';
import { formatCurrency, formatPercent, parseInteger } from '../utils/Utils';

interface IHoldingListItemProps {
    holding: IHoldingDetails,
    onShareCountChange: (ticker: string, count: number) => any,
    onUpdateCurrency: (ticker: string, currency: Currency) => any,
    onUpdateTarget: (ticker: string, targetPrecent: number) => any,
};

const HoldingListItem: React.StatelessComponent<IHoldingListItemProps> = (props: IHoldingListItemProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { ticker } = props.holding;
      const count = parseInteger(e.target.value);
      props.onShareCountChange(ticker, count);
    };
    const onCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const { ticker } = props.holding;
      props.onUpdateCurrency(ticker, value as Currency)
    };
    const onTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = parseFloat(e.target.value) || 0;
      const { ticker } = props.holding;
      props.onUpdateTarget(ticker, target)
    };
    const { holding } = props;
    return (
      <tr>
        <td>{holding.ticker}</td>
        <td>{formatCurrency(holding.sharePrice)}</td>
        <td>
          <input 
            min="0" 
            onChange={onChange} 
            type="number" 
            value={holding.shareCount} />
        </td>
        <td>
          <label>
            <input type="radio" value={Currency.USD} checked={holding.currency === Currency.USD} onChange={onCurrencyChange}/>
            {Currency.USD}
          </label>
          <label>
            <input type="radio" value={Currency.CAD} checked={holding.currency === Currency.CAD} onChange={onCurrencyChange} />
            {Currency.CAD}
          </label>
        </td>
        <td>{formatCurrency(holding.usdValue)}</td>
        <td>{formatCurrency(holding.cadValue)}</td>
        <td>{formatPercent(holding.currentPercentage)}</td>
        <td>
          <input 
            min="0" 
            onChange={onTargetChange} 
            type="number" 
            value={holding.targetPercent} />
        </td>
        <td>
          {holding.shareDiff}
        </td>
      </tr>
    );
};

export default HoldingListItem;