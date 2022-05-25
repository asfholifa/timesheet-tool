import React, { FC } from "react"
import { Select, Modal, Button, Form, Input } from "antd"

interface IAddResource {
  addResourceModalVisible: boolean
  setAddResourceModalVisible: (state: boolean) => void
}

const { Option } = Select
const AddResource: FC<IAddResource> = ({
  addResourceModalVisible,
  setAddResourceModalVisible,
}) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    console.log("form data:", form.getFieldsValue())
    setAddResourceModalVisible(false)
    form.resetFields()
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  const handleCancel = () => {
    setAddResourceModalVisible(false)
  }

  return (
    <Modal
      visible={addResourceModalVisible}
      title="Add resource"
      onCancel={handleCancel}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Create Resource
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="addResource"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item name="email">
          <Input  placeholder="Resource email" />
        </Form.Item>
        <Form.Item name="ID ">
          <Input placeholder="Resource Enterprise ID" />
        </Form.Item>
        <Form.Item name="Role">
          <Select placeholder="Choose Resource Role" onChange={handleChange}>
            <Option value="User">User</Option>
            <Option value="Administrator">Administrator</Option>
          </Select>
        </Form.Item>
        <Form.Item name="load">
          <Input  placeholder="Enter resource load(hours)" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddResource
