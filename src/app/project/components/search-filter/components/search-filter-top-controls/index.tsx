// import { SelectDropdown } from "../../../../../../../../libs/Input/SelectDropdown";
import { BackClose } from "./back-close-icon";
import { categories } from "../../constant";
import styles from "./index.module.css";

export const SearchFilterTopControls = () => (
  <>
    <div className={styles.search_filter_top_controls}>
      <p className={styles.search_filter_text}>Search Filter</p>
      {/* <div className={styles.search_filter_top_right_section}>
        <SelectDropdown
          onSelect={() => {}}
          options={categories}
          placeholder={"Select Dataset"}
        />
        <button onClick={onPrev}>
          <BackClose />
        </button>
      </div> */}
    </div>
  </>
);
