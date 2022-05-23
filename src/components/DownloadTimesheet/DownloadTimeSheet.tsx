import React, { FC } from "react";
import { DatePicker, Select, Modal, Button, Form } from "antd";
const { Option } = Select;

interface IDownloadTimeSheet {
  reportModalVisible: boolean;
  setReportModalVisible: (state: boolean) => void;
}

const DownloadTimeSheet: FC<IDownloadTimeSheet> = ({
  reportModalVisible,
  setReportModalVisible,
}) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    console.log("Download file", form.getFieldsValue());

    setReportModalVisible(false);
  };

  const handleCancel = () => {
    setReportModalVisible(false);
  };

  const project = [];
  const resources = [];
  for (let i = 10; i < 36; i++) {
    project.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  for (let i = 10; i < 36; i++) {
    resources.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      visible={reportModalVisible}
      title="Title"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Export to excel
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="timesheetReport"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item name="date">
          <DatePicker.RangePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="project">
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
        </Form.Item>

        <Form.Item name="resources">
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
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DownloadTimeSheet;
