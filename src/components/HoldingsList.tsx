import * as React from 'react';
import { IHoldingDetails } from '../constants/types';
import HoldingListItem from './HoldingListItem';

interface IHoldingListProps {
    holdings: IHoldingDetails[],
    onShareCountChange: (ticker: string, count: number) => any,
};

const HoldingList: React.StatelessComponent<IHoldingListProps> = (props: IHoldingListProps) => {
    return (
      <table>
        <tbody>
        {props.holdings.map(
          (x) => <HoldingListItem holding={x} key={x.ticker} onShareCountChange={props.onShareCountChange} />
        )}
        </tbody>
      </table>
    );
};

export default HoldingList;