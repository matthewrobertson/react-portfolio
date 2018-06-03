import * as React from 'react';
import { IHoldingDetails } from '../constants/types';
import { formatCurrency, parseInteger } from '../utils/Utils';

interface IHoldingListItemProps {
    holding: IHoldingDetails,
    onShareCountChange: (ticker: string, count: number) => any,
};

const HoldingListItem: React.StatelessComponent<IHoldingListItemProps> = (props: IHoldingListItemProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { ticker } = props.holding;
      const count = parseInteger(e.target.value);
      props.onShareCountChange(ticker, count);
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
        <td>{formatCurrency(holding.totalValue)}</td>
      </tr>
    );
};

export default HoldingListItem;