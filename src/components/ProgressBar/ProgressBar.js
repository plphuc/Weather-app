import classNames from "classnames";

import styles from "./ProgressBar.module.css";

function ProgressBar(props) {
  const { humidityPercentage, progressBarClassName } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.percentageNumber}>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className={classNames(styles.container, progressBarClassName)}>
        <div
          style={{ width: humidityPercentage + "%" }}
          className={styles.pastProgress}
        ></div>
      </div>
      <div className={styles.percentageChar}>
        <span>%</span>
      </div>
    </div>
  );
}

export default ProgressBar;
