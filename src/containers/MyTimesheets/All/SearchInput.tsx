import React from "react"
import { Input, Popover, Button, Select, Checkbox } from "antd"
import styles from "./All.module.scss"
const { Search } = Input
const { Option } = Select

function SearchInput(props: any) {
  const optionsFromPropsMOQ = [
    {
      dateFrom: "09.02.2020",
      dateTo: "14.02.2020",
    },
    {
      dateFrom: "23.02.2020",
      dateTo: "27.02.2020",
    },
  ]
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
        <Checkbox className={styles.curChekBox} value={"Draft"}>Draft</Checkbox>
      </div>
    </div>
  )

  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={() =>
          console.log(
            "записываем значение в стейт и фильтруем значения таблицы"
          )
        }
        style={{ width: 200 }}
      />
      <Popover content={content} trigger="click">
        <Button>Click me</Button>
      </Popover>
    </>
  )
}

export default SearchInput
