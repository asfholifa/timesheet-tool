import React, { useState } from "react"
import { DatePicker, Select, Modal, Button } from "antd"
const { Option } = Select

const DownloadTimeSheet = () => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    console.log("Download file")

    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const project = []
  const resources = []
  for (let i = 10; i < 36; i++) {
    project.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
  }
  for (let i = 10; i < 36; i++) {
    resources.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    )
  }
  function handleChange(value: string[]) {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <h1>{"Timesheet report"}</h1>

      <Button type="primary" onClick={showModal}>
        OPEN
      </Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <DatePicker.RangePicker style={{ width: "70%" }} />
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={["Project"]}
          onChange={handleChange}
        >
          {project}
        </Select>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={["Resources"]}
          onChange={handleChange}
        >
          {resources}
        </Select>
      </Modal>
    </>
  )
}

export default DownloadTimeSheet
