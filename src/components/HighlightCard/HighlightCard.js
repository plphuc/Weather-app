import classNames from "classnames";
import styles from "./HighlightCard.module.css";

function HighlightCard(props) {
  const { title, children } = props;
  return (
    <div className={classNames(styles.wrapper, "card")}>
      <div className="flex-col flex justify-center items-center hover:scale-105 duration-300 w-full h-full">
        <span className={styles.title}>{title}</span>
        <div className={styles.childrenWrapper}>{children}</div>
      </div>
    </div>
  );
}

export default HighlightCard;
