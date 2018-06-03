import * as React from 'react';
import { IHoldingDetails } from '../constants/types';

interface IHoldingListItemProps {
    holding: IHoldingDetails,
};

const HoldingListItem: React.StatelessComponent<IHoldingListItemProps> = (props: IHoldingListItemProps) => {
    const { holding } = props;
    return (
      <tr>
        <td>{holding.ticker}</td>
        <td>{holding.sharePrice}</td>
        <td><input type="text" value={holding.shareCount} /></td>
        <td>{holding.totalValue}</td>
      </tr>
    );
};

export default HoldingListItem;