import * as React from "react";

import * as styles from "./WhizBang.module.scss";

export class WhizBang extends React.Component {
    render() {
        return (
            <div className={styles.whizBang}>
                <p>
                    WhizBang! This text should appear with red background,
                    otherwise the SCSS modules are not working.
                </p>
                <p>
                    Try editing this text (packages/components/src/WhizBang.tsx)
                    while watching to see if the HMR and rebuilding works.
                </p>{" "}
                <p>
                    Also try editing the
                    (packages/components/src/WhizBang.module.scss) to see that
                    SCSS module changes are also updated live.
                </p>
            </div>
        );
    }
}
