import * as React from 'react';

interface IAddStockFormProps {
    ticker: string,
    onAddStock: any,
    onUpdateTicker: any,
};

const AddStockForm: React.StatelessComponent<IAddStockFormProps> = (props: IAddStockFormProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => props.onUpdateTicker(e.target.value);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onAddStock();
    };
    return (
      <form>
        <input type="text" name="new-stock-ticker" onChange={onChange} value={props.ticker} />
        <button onClick={onClick}>Add Stock</button>
      </form>
    );
};

export default AddStockForm;
