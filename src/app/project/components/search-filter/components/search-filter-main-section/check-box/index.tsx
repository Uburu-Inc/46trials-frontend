import styles from "./index.module.css";

interface Props {
  label: string;
  className?: string;
  labelClassName?: string;
  checkBoxClassName?: string;
}

export const CheckBox = ({
  label,
  labelClassName,
  className,
  checkBoxClassName,
}: Props) => (
  <label className={`${styles.container} ${className ?? ""}`}>
    <span className={`${styles.label_check_box} ${labelClassName ?? ""}`}>{label}</span>
    <input type="checkbox" />
    <span className={`${styles.checkmark} ${checkBoxClassName ?? ""}`}></span>
  </label>
);
