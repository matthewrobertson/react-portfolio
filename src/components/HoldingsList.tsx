import * as React from 'react';
import { Currency, IHoldingDetails } from '../constants/types';
import { formatCurrency } from '../utils/Utils';
import HoldingListItem from './HoldingListItem';

interface IHoldingListProps {
    holdings: IHoldingDetails[],
    onShareCountChange: (ticker: string, count: number) => any,
    onUpdateCurrency: (ticker: string, currency: Currency) => any,
    onUpdateTarget: (ticker: string, targetPrecent: number) => any,
    netWorthCAD: number,
    netWorthUSD: number,
};

const HoldingList: React.StatelessComponent<IHoldingListProps> = (props: IHoldingListProps) => {
    const netWorthRow = props.holdings.length > 0 
      ? <NetWorthRow netWorthCAD={props.netWorthCAD} netWorthUSD={props.netWorthUSD} /> 
      : null;
    return (
      <table style={{width: '1200px', margin: '20px auto'}}>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Currency</th>
            <th>Value (USD)</th>
            <th>Value (CAD)</th>
            <th>% port</th>
            <th>% target</th>
            <th>Buy / Sell</th>
          </tr>
        </thead>
        <tbody>
          {props.holdings.map(
            (x) => <HoldingListItem 
              holding={x} key={x.ticker} 
              onShareCountChange={props.onShareCountChange}
              onUpdateCurrency={props.onUpdateCurrency}
              onUpdateTarget={props.onUpdateTarget}
            />
          )}
          {netWorthRow}
        </tbody>
      </table>
    );
};

interface INetWorthProps {
  netWorthCAD: number,
  netWorthUSD: number,
};

const NetWorthRow: React.StatelessComponent<INetWorthProps> = (props: INetWorthProps) => {
  return (
    <tr>
      <td/>
      <td/>
      <td/>
      <td>Net:</td>
      <td>{formatCurrency(props.netWorthUSD)}</td>
      <td>{formatCurrency(props.netWorthCAD)}</td>
    </tr>
  );
};

export default HoldingList;