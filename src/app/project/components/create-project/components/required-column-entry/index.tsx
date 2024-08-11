import { ChangeEvent } from "react";
import { TrashIcon } from "./components/trash-icon";
import { TextInput } from "@/components/input/text-input";
import { useState, FC } from "react";
import { RequiredColumnProps } from "../../utils/type";
import { dictionaryConverter } from "../../utils/constant";
import { AgeInput } from "./components/age-input";

interface Props {
  requiredColumn?: string;
  requiredEntry?: string;
  excludedEntry?: string;
  onChange: (payload: RequiredColumnProps) => void;
  id: string;
}

export function RequiredColumnEntry({
  requiredColumn,
  onChange,
  requiredEntry,
  excludedEntry,
  id,
}: Props) {
  const [withExcluded, setWithExcluded] = useState(false);
  return (
    <>
      <div className={"flex gap-[1rem] w-full -mt-[2rem]"}>
        <div className={"w-[24%]"}>
          <TextInput
            className={"w-full rounded-xl"}
            label={"Required Column"}
            value={requiredColumn}
            readOnly={true}
          />
        </div>
        <div className={"w-[35%]"}>
          {requiredColumn === "age" ? (
            <AgeInput
              value={requiredEntry ?? ""}
              onChange={(payload) =>
                onChange({
                  id,
                  entries: payload ?? "",
                  dictionaryKeys: dictionaryConverter,
                })
              }
            />
          ) : (
            <TextInput
              className={"w-full rounded-xl"}
              label={"Required Entry"}
              value={requiredEntry ?? ""}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onChange({
                  id,
                  entries: event.target.value ?? "",
                  dictionaryKeys: dictionaryConverter,
                })
              }
            />
          )}
        </div>
        <div className={''}>
          {!withExcluded ? (
            <button
              type={"button"}
              className={
                "border border-[#fb5806] text-[#fb5806] align-self mt-[3rem] px-[3rem] py-[0.7rem] font-[600]"
              }
              onClick={() => setWithExcluded(true)}
            >
              Excluded Entries
            </button>
          ) : (
            <>
              {requiredColumn === "age" ? (
                <AgeInput
                  value={excludedEntry ?? ""}
                  onChange={(payload) =>
                    onChange({
                      id,
                      exclude: payload ?? "",
                      dictionaryKeys: dictionaryConverter,
                    })
                  }
                />
              ) : (
                <TextInput
                  className={"w-full rounded-xl"}
                  label={"Excluded Entry"}
                  value={excludedEntry ?? ""}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    onChange({
                      id,
                      exclude: event.target.value ?? "",
                      dictionaryKeys: dictionaryConverter,
                    })
                  }
                />
              )}

              <button
                className={"mt-[1.5rem]"}
                onClick={() => setWithExcluded(false)}
                type={"button"}
              >
                <TrashIcon className={'h-[24px] w-[24px]'} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
