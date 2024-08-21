import { ChangeEvent } from "react";
import { TextInput } from "@/app/components/reusable-components/input/text-input";
import { ButtonComponent } from "@/app/components/reusable-components/button";
import { useState } from "react";
import { TrashIcon } from "./components/trash-icon";
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
      <div className={"flex gap-[1rem] w-full"}>
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
        <div className={"flex"}>
          {!withExcluded ? (
            <ButtonComponent
              className="mt-9"
              onClick={() => setWithExcluded(true)}
            >
              Excluded Entries
            </ButtonComponent>
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
                <div className="mr-4">
                  <TextInput
                    className={"w-1/2 rounded-xl"}
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
                </div>
              )}

              <button
                className={"mt-[2rem]"}
                onClick={() => setWithExcluded(false)}
                type={"button"}
              >
                <TrashIcon className={"h-[24px] w-[24px]"} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
