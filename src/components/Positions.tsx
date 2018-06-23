import * as React from "react";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import EquitiesContainer from "../containers/EquitiesContainer";
import CashContainer from "../containers/CashContainer";
import { Link } from "react-router-dom";

const Positions: React.StatelessComponent<{}> = (props: {}) => {
  return (
    <div>
      <h2 className="ms-font-xl">
        Equities
        <Link to="/add_holding">
          <DefaultButton
            iconProps={{ iconName: "Add" }}
            title="Add Equity"
            ariaLabel="Add Equity"
            href="/add_holding"
            style={{ float: "right" }}
          >
            Add
          </DefaultButton>
        </Link>
      </h2>

      <EquitiesContainer />
      <h2 className="ms-font-xl">Cash</h2>
      <CashContainer />
    </div>
  );
};

export default Positions;
