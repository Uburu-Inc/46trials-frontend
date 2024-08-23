import { useState } from "react";
import { TextInput } from "@/app/components/reusable-components/input/text-input";
import { sqlQueryOperators } from "./constant";
import toast from "react-hot-toast";

interface Props {
  value: string;
  onChange: (payload: string) => void;
}

export function AgeInput({ value, onChange }: Props) {
  const [openDropdown, setOpenDropDown] = useState(false);

  const [startPoint, setStartPoint] = useState(0);
  const [endpoint, setEndPoint] = useState(0);

  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [operator, setOperator] = useState("");

  const [end, setEnd] = useState(false);

  function handleSendAgeQuery() {
    if (!operator && !startPoint) {
      toast.error("Provide a start point and operator", {
        position: "top-right",
      });
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
  }

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
          className={"w-full rounded-[0.7rem]"}
          onFocus={() => setOpenDropDown(!openDropdown)}
          value={value}
        />

        {openDropdown && (
          <div
            className={
              "w-full bg-white shadow-xl rounded-[0.7rem] z-10 absolute border border-[gray] -mt-[15px] p-[0.5rem]"
            }
          >
            <div className={"flex gap-[5px]"}>
              <input
                type={"number"}
                className={
                  "p-[0.4rem] border border-[gray] rounded-[0.3rem] outline-none text-[0.7rem] font-bold"
                }
                placeholder={"Start point"}
                onChange={(e) => setStartPoint(Number(e.target.value))}
                style={{ width: end ? "48%" : "100%" }}
              />

              {end && (
                <input
                  className={
                    "p-[0.4rem] border border-[gray] rounded-[0.3rem] outline-none text-[0.7rem] font-bold"
                  }
                  type={"number"}
                  placeholder={"End point"}
                  onChange={(e) => setEndPoint(Number(e.target.value))}
                  style={{ width: "48%" }}
                />
              )}
            </div>

            <ul className={"mt-[1rem]"}>
              {sqlQueryOperators.map(({ text, operator }, index) => (
                <li
                  key={`${operator}-${index}`}
                  className={
                    "text-[0.8rem] cursor-pointer w-full border border-[f2eaea] py-[10px] px-[8px] hover:bg-[#e6e3e3]"
                  }
                  onClick={() => initOperator(index, operator)}
                  style={{ background: index === activeIndex ? "#e6e3e3" : "" }}
                >
                  <p>
                    <strong>{operator}</strong>
                  </p>
                  <p>{text}</p>
                </li>
              ))}
            </ul>

            <div className={"flex justify-center"}>
              <div className={"flex gap-[10px] p-[10px]"}>
                <button
                  className={"font-bold text-[gray]"}
                  onClick={() => setOpenDropDown(!openDropdown)}
                >
                  Cancel
                </button>
                <button
                  className={"text-[#fb5806] font-bold"}
                  onClick={handleSendAgeQuery}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
