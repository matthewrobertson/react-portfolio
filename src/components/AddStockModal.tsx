import * as React from "react";
import Modal from "office-ui-fabric-react/lib/Modal";
import AddStockForm from "../containers/AddStockContainer";
import { withRouter } from "react-router-dom";

// interface IModalProps {
//   history: History;
//   edit_ticker?: string;
// }

const AddStockModal = withRouter((props: any) => {
  const onDismiss = () => {
    props.history.push("/");
  };
  const routeParams: { [key: string]: string } = props.match.params;
  return (
    <Modal isOpen={true} onDismiss={onDismiss}>
      <AddStockForm editTicker={routeParams.edit_ticker} />
    </Modal>
  );
});

export default AddStockModal;
