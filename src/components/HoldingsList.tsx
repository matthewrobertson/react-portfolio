import * as React from 'react';
import { IHoldingDetails } from '../constants/types';
import HoldingListItem from './HoldingListItem';

interface IHoldingListProps {
    holdings: IHoldingDetails[],
};

const HoldingList: React.StatelessComponent<IHoldingListProps> = (props: IHoldingListProps) => {
    const holdingsItems = props.holdings.map(
      (x) => <HoldingListItem holding={x} key={x.ticker} />,
    );
    return (
      <table>
        {holdingsItems}
      </table>
    );
};

export default HoldingList;