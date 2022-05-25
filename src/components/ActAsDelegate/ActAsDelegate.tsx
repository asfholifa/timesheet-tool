import { Button, Form, Input, Modal } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IActAsDelegate {
  delegateModalVisible: boolean
  setDelegateModalVisible: (state: boolean) => void
}

const ActAsDelegate: FC<IActAsDelegate> = ({
  delegateModalVisible,
  setDelegateModalVisible,
}) => {
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const handleOk = () => {
    console.log("Download file", form.getFieldsValue())
    setDelegateModalVisible(false)
    form.resetFields()
    navigate('/my-timesheets/all')
  }

  const handleCancel = () => {
    setDelegateModalVisible(false)
  }

  return (
    <>
      <Modal
        visible={delegateModalVisible}
        title="Act as delegate"
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="actAsDelegate"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item name="LDAP">
            <Input  placeholder="Введите LDAP" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ActAsDelegate
