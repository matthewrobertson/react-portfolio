import * as React from 'react';
import { Currency, IHoldingDetails } from '../constants/types';
import { formatCurrency, parseInteger } from '../utils/Utils';

interface IHoldingListItemProps {
    holding: IHoldingDetails,
    onShareCountChange: (ticker: string, count: number) => any,
    onUpdateCurrency: (ticker: string, currency: Currency) => any, // BORIS QUESTION: THIS IS GETTING PLUMBED THROUGH A BUNCH OF LAYERS
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
        <td>{formatCurrency(holding.totalValue)}</td>
      </tr>
    );
};

export default HoldingListItem;