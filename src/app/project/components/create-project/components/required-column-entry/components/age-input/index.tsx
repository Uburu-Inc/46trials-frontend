import { useState, FC } from "react";
import { TextInput } from "@/components/input/text-input";
import styles from "../../index.module.css";
import dropdown_style from "./index.module.css";
import { sqlQueryOperators } from "./constant";
import toast from "react-hot-toast";

interface Props {
  value: string;
  onChange: (payload: string) => void;
}

export const AgeInput: FC<Props> = ({ value, onChange }) => {
  const [openDropdown, setOpenDropDown] = useState(false);

  const [startPoint, setStartPoint] = useState(0);
  const [endpoint, setEndPoint] = useState(0);

  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [operator, setOperator] = useState("");

  const [end, setEnd] = useState(false);

  const handleSendAgeQuery = () => {
    if (!operator && !startPoint) {
      toast.error("Provide a start point and operator", { position: "top-right" });
      return;
    }

    if (operator === "BETWEEN") {
      const operationValue = `${operator} ${startPoint} AND ${endpoint}`;
      onChange(operationValue);
      setOpenDropDown(false);
    }

    if (operator === ">=") {
      const operationValue = `${operator} ${startPoint}`;
      onChange(operationValue);
      setOpenDropDown(false);
    }

    if (operator === "=") {
      const operationValue = `${operator} ${startPoint}`;
      onChange(operationValue);
      setOpenDropDown(false);
    }

    if (operator === "<") {
      const operationValue = `${operator} ${startPoint}`;
      onChange(operationValue);
      setOpenDropDown(false);
    }

    if (operator === "!=") {
      const operationValue = `${operator} ${startPoint}`;
      onChange(operationValue);
      setOpenDropDown(false);
    }
  };

  const initOperator = (index: number, operator: string) => {
    setActiveIndex(index);
    setOperator(operator);
    if (operator !== "BETWEEN") setEnd(false);
    else setEnd(true);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <TextInput
          label={"Required column"}
          readOnly
          className={styles.element_entry_input}
          onFocus={() => setOpenDropDown(!openDropdown)}
          value={value}
        />

        {openDropdown && (
          <div className={dropdown_style.age_input_dropdown}>
            <div className={dropdown_style.age_inputs_container}>
              <input
                type={"number"}
                className={dropdown_style.age_input_dropdown_start_end}
                placeholder={"Start point"}
                onChange={(e) => setStartPoint(Number(e.target.value))}
                style={{ width: end ? "48%" : "100%" }}
              />

              {end && (
                <input
                  className={dropdown_style.age_input_dropdown_start_end}
                  type={"number"}
                  placeholder={"End point"}
                  onChange={(e) => setEndPoint(Number(e.target.value))}
                  style={{ width: "48%" }}
                />
              )}
            </div>

            <ul className={dropdown_style.age_ul}>
              {sqlQueryOperators.map(({ text, operator }, index) => (
                <li
                  key={`${operator}-${index}`}
                  className={dropdown_style.age_li}
                  onClick={() => initOperator(index, operator)}
                  style={{ background: index === activeIndex ? "#e6e3e3" : "" }}>
                  <p>
                    <strong>{operator}</strong>
                  </p>
                  <p>{text}</p>
                </li>
              ))}
            </ul>

            <div className={dropdown_style.done_cancel_button_control}>
              <div className={dropdown_style.done_cancel_main_control}>
                <button
                  className={dropdown_style.age_cancel_button}
                  onClick={() => setOpenDropDown(!openDropdown)}>
                  Cancel
                </button>
                <button
                  className={dropdown_style.age_done_button}
                  onClick={handleSendAgeQuery}>
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
