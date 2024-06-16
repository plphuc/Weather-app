import classNames from "classnames";
import styles from "./HighlightCard.module.css";

function HighlightCard(props) {
  const { title, children } = props;
  return (
    <div className={classNames(styles.wrapper, "card")}>
      <span className={styles.title}>{title}</span>
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  );
}

export default HighlightCard;
