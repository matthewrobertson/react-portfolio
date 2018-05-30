import * as React from 'react';

interface IHoldingListProps {
    holdings: string[],
};

const HoldingList: React.StatelessComponent<IHoldingListProps> = (props: IHoldingListProps) => {
    const holdingsItems = props.holdings.map((x) => <li key={x}>{x}</li>);
    return (
      <ul>
        {holdingsItems}
      </ul>
    );
};

export default HoldingList;