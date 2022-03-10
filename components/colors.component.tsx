import axios from "axios";
import { ChangeEvent, FunctionComponent, useCallback, useState } from "react";
import useSWR from "swr";
import { ChromePicker } from "react-color";
import styles from "../styles/Color.module.css";
import { Settings, SettingsType } from "@prisma/client";
import { nanoid } from "nanoid";
import { useDebouncedCallback } from "use-debounce";

export interface ColorProps {
  colorHex: string;
}

const fetcher = (url: string) =>
  axios.get<Settings>(url).then((res) => res.data);

interface Picker {
  id: string;
  settingsType: SettingsType;
  name: string;
}
const pickers: Picker[] = [
  { id: nanoid(), settingsType: SettingsType.COLOR_BELCA, name: "Bělča" },
  { id: nanoid(), settingsType: SettingsType.COLOR_JIRI, name: "Jiří" },
  {
    id: nanoid(),
    settingsType: SettingsType.COLOR_DASHBOARD,
    name: "Dashboard",
  },
];

export const ColorComponent: FunctionComponent<ColorProps> = (props) => {
  const [select, setSelect] = useState<SettingsType>(
    SettingsType.COLOR_DASHBOARD
  );
  const {
    data: color,
    error,
    mutate,
  } = useSWR(`/api/settings?type=${select}`, fetcher, {
    refreshInterval: 10000,
  });

  const [showPicker, setShowPicker] = useState<boolean>(false);
  let colorHex;
  if (!color || error || !color.value) {
    colorHex = props.colorHex;
  } else {
    colorHex = color.value;
  }

  const handleClose = () => {
    setShowPicker(false);
  };

  const handleClick = () => {
    setShowPicker(!showPicker);
  };

  const sendColor = useDebouncedCallback(
    (colorHex: string, type: SettingsType) => {
      axios
        .post<Settings>("/api/settings", {
          type: type,
          value: colorHex,
        })
        .then((res) => res.data)
        .then((color) => {
          mutate({ ...color, value: color.value });
        })
        .then(() => axios.get("/api/change-color"));
    },
    1000
  );

  const changeColor = (colorHex: string) => {
    if (color) {
      mutate({ ...color, value: colorHex }, false);
      sendColor(colorHex, select);
    }
  };

  const changeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value in SettingsType) {
      setSelect(value as SettingsType);
    }
  };

  return (
    <>
      <div className={styles.color}>
        <div
          style={{
            backgroundColor: colorHex,
            height: "200px",
            width: "200px",
            borderRadius: "5px",
          }}
          onClick={handleClick}
        ></div>
        {showPicker ? (
          <div className={styles.popover}>
            <div className={styles.cover} onClick={handleClose} />
            <ChromePicker
              color={colorHex}
              onChange={(color) => changeColor(color.hex)}
            />
          </div>
        ) : null}
        <select
          className={styles.picker}
          value={select}
          onChange={(event) => changeSelect(event)}
        >
          {" "}
          {pickers.map((key) => (
            <option
              className={styles.option}
              key={key.id}
              value={key.settingsType}
            >
              {key.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
