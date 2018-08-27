import * as React from "react";
import * as ReactDOM from "react-dom";

import { WhizBang } from "@yourcompany/components";

class App extends React.Component {
    render() {
        return (
            <div>
                This is the admin app
                <WhizBang />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
