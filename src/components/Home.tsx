import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
import styled from "styled-components";
import { Container } from "../styled-componet/home.style";

const StyledButton = styled(Button)`
  margin-bottom: 16px;
`;

const CustomTable = styled(Table)`
  margin-top: 16px;
`;

interface DataSourceItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const Home: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([
    { key: "1", name: "John Doe", age: 32, address: "10 Downing Street" },
    {
      key: "2",
      name: "Jane Smith",
      age: 28,
      address: "Somewhere in the world",
    },
  ]);

  const [visible, setVisible] = useState(false);
  const [modalName, setModalName] = useState("");
  const [recordToUpdate, setRecordToUpdate] = useState<DataSourceItem | null>(
    null
  );

  const columns: any[] = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      key: "action",
      render: (_text: any, record: DataSourceItem) => (
        <div>
          <StyledButton
            onClick={() => handleUpdate(record)}
            style={{ marginRight: "1rem" }}
          >
            Update
          </StyledButton>
          <Button onClick={() => handleDelete(record.key)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleAdd = (value: string) => {
    setModalName(value);
    setVisible(true);
  };

  const handleUpdate = (record: DataSourceItem) => {
    setRecordToUpdate(record);
    setVisible(true);
  };

  const handleDelete = (key: string) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleOk = (values: DataSourceItem) => {
    if (recordToUpdate) {
      // Update existing record
      setDataSource(
        dataSource.map((item) =>
          item.key === recordToUpdate.key ? { ...item, ...values } : item
        )
      );
    } else {
      // Add new record
      const newRecord = { ...values, key: (dataSource.length + 1).toString() };
      setDataSource([...dataSource, newRecord]);
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Container>
      <StyledButton onClick={() => handleAdd("Doctor")} type="primary">
        Add New Doctor
      </StyledButton>
      <StyledButton
        style={{ marginLeft: "1rem" }}
        onClick={() => handleAdd("Ambulance")}
        type="primary"
      >
        Add New Ambulance
      </StyledButton>
      <div>
        <span>Doctor List</span>
      </div>

      <CustomTable dataSource={dataSource} columns={columns} />

      <Modal
        title={modalName === "Doctor" ? "Add Doctor" : "Add Ambulance"}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        {modalName === "Doctor" ? (
          <>
            <UserForm record={recordToUpdate} onFinish={handleOk} />
          </>
        ) : (
          <>
            <UserFormAmbulance record={recordToUpdate} onFinish={handleOk} />
          </>
        )}
      </Modal>
    </Container>
  );
};

interface UserFormProps {
  record: DataSourceItem | null;
  onFinish: (values: DataSourceItem) => void;
}

const UserForm: React.FC<UserFormProps> = ({ record, onFinish }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [form, record]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onFinish(values as DataSourceItem);
      form.resetFields();
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ required: true }]}>
        <Input type="number" />
      </Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {record ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

const UserFormAmbulance: React.FC<UserFormProps> = ({ record, onFinish }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    }
  }, [form, record]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onFinish(values as DataSourceItem);
      form.resetFields();
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Vehicle Number" label="Vehicle No" rules={[{ required: true }]}>
        <Input type="text" />
      </Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {record ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Home;
