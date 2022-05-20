import React from "react";
import { Input, Popover, Button, Select, Checkbox, Space } from "antd";
import styles from "./SearchInput.module.scss";
import { ControlOutlined } from "@ant-design/icons";
const { Option } = Select;

const SearchInput = () => {
  const optionsFromPropsMOQ = [
    {
      dateFrom: "09.02.2020",
      dateTo: "14.02.2020",
    },
    {
      dateFrom: "23.02.2020",
      dateTo: "27.02.2020",
    },
  ];
  const content = (
    <div className={styles.searchPopoverWrapper}>
      <div className={styles.selectBox}>
        <b>Period</b>
        <Select
          onChange={() => console.log("работает")}
          className={styles.selectBox}
          placeholder="Select a person"
        >
          {optionsFromPropsMOQ.map((el) => (
            <Option
              value={`${el.dateFrom} - ${el.dateTo}`}
            >{`${el.dateFrom} - ${el.dateTo}`}</Option>
          ))}
        </Select>
      </div>
      <div className={styles.checkBox}>
        <b>Type</b>
        <Checkbox value={"Submitted"}>Submitted</Checkbox>
        <Checkbox className={styles.curChekBox} value={"Draft"}>
          Draft
        </Checkbox>
      </div>
    </div>
  );

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("записываем значение в стейт и фильтруем значения таблицы");
    }
  };

  return (
    <>
      <Input.Group className={styles["input-group"]} compact>
        <Input
          placeholder="input search text"
          onKeyDown={(e) => onSearch(e)}
          style={{ width: 200 }}
        />
        <Popover placement="bottomLeft" content={content} trigger="click">
          <Space>
            <Button icon={<ControlOutlined />} />
          </Space>
        </Popover>
      </Input.Group>
    </>
  );
};

export default SearchInput;
