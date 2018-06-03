import * as React from 'react';
import { IHoldingDetails } from '../constants/types';
import { formatCurrency } from '../utils/Utils';
import HoldingListItem from './HoldingListItem';

interface IHoldingListProps {
    holdings: IHoldingDetails[],
    onShareCountChange: (ticker: string, count: number) => any,
    netWorth: number,
};

const HoldingList: React.StatelessComponent<IHoldingListProps> = (props: IHoldingListProps) => {
    const netWorthRow = props.holdings.length > 0 
      ? <NetWorthRow netWorth={props.netWorth} /> 
      : null;
    return (
      <table style={{width: '500px', margin: '20px auto'}}>
        <tbody>
          {props.holdings.map(
            (x) => <HoldingListItem 
              holding={x} key={x.ticker} 
              onShareCountChange={props.onShareCountChange} 
            />
          )}
          {netWorthRow}
        </tbody>
      </table>
    );
};

interface INetWorthProps {
  netWorth: number,
};

const NetWorthRow: React.StatelessComponent<INetWorthProps> = (props: INetWorthProps) => {
  return (
    <tr>
      <td/>
      <td/>
      <td>Net Worth:</td>
      <td>{formatCurrency(props.netWorth)}</td>
    </tr>
  );
};

export default HoldingList;