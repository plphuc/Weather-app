import styles from './ProgressBar.module.css';

function ProgressBar(props) {
  const { humidityPercentage, progressBarClass } = props ;
  return (
    <div className={styles.wrapper}>
      <div className={styles.percentageNumber}>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
      <div className={`${styles.container} + ${progressBarClass}`}>
        <div style={{ width: humidityPercentage + '%' }} className={styles.pastProgress}></div>
      </div>
      <div className={styles.percentageChar}>
        <span>%</span>
      </div>
    </div>
  );
}

export default ProgressBar;
