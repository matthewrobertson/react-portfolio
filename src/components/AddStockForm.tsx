import * as React from 'react';

interface IAddStockFormProps {
    ticker: string,
    onAddStock: (ticker: string) => any,
    onUpdateTicker: (ticker: string) => any,
};

const AddStockForm: React.StatelessComponent<IAddStockFormProps> = (props: IAddStockFormProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => props.onUpdateTicker(e.target.value);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onAddStock(props.ticker);
    };
    return (
      <form>
        <input type="text" name="new-stock-ticker" onChange={onChange} value={props.ticker} />
        <button onClick={onClick}>Add Stock</button>
      </form>
    );
};

export default AddStockForm;
