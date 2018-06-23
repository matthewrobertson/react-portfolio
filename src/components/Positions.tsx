import * as React from "react";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import EquitiesContainer from "../containers/EquitiesContainer";
import CashContainer from "../containers/CashContainer";

const Positions: React.StatelessComponent<{}> = (props: {}) => {
  return (
    <div>
      <h2 className="ms-font-xl">
        Equities
        <DefaultButton
          iconProps={{ iconName: "Add" }}
          title="Add Equity"
          ariaLabel="Add Equity"
          // onClick={this.showModal}
          style={{ float: "right" }}
        >
          Add
        </DefaultButton>
      </h2>

      <EquitiesContainer />
      <h2 className="ms-font-xl">Cash</h2>
      <CashContainer />
    </div>
  );
};

export default Positions;
