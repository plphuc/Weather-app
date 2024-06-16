import MainSection from "components/MainSection/MainSection";
import DetailsSection from "components/DetailsSection/DetailsSection";
import SearchSection from "components/SearchSection/SearchSection";

import styles from "./App.module.css";
import classNames from "classnames";

function App() {
  return (
    <div className="w-screen h-screen">
      <div className={styles.wrapper}>
        <div className={classNames(styles.mainSectionWrapper, "min-w-[350px]")}>
          <SearchSection />
          <MainSection />
        </div>
        <div
          className={classNames(
            styles.detailsSectionWrapper,
            "bg-red-200 flex-1",
          )}
        >
          <DetailsSection />
        </div>
      </div>
    </div>
  );
}

export default App;
