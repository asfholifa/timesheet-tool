import React, { ReactNode, useCallback, useState } from "react";
import { Typography, Button, Table, Input, Dropdown, Space, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/lib/table";
import type { TableRowSelection } from "antd/lib/table/interface";
import { pageTitles } from "@helpers/const";
import { useLocation } from "react-router-dom";
import styles from "./TaskCreation.module.scss";
import { isNull } from "lodash";

interface DataType {
  key: React.ReactNode;
  taskName: string;
  baselineWork: number | null;
  remainingWork: number | null;
  actualWork: number;
  chargeCode: string;
  children?: DataType[];
}

const TaskCreation = () => {
  const { pathname } = useLocation();
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      taskName:
        "MDM.137 - Automatic creation of item_loc for Maxi PRO locations",
      baselineWork: 50,
      remainingWork: 35,
      actualWork: 15,
      chargeCode: "MP_Federal Clients",
      children: [
        {
          key: "1-1",
          taskName: "MDM.137 - Design",
          baselineWork: 10,
          remainingWork: 5,
          actualWork: 5,
          chargeCode: "MP_Federal Clients",
          children: [
            {
              key: "1-1-1",
              taskName: "maria.kotenko",
              baselineWork: 0,
              remainingWork: 0,
              actualWork: 2,
              chargeCode: "MP_Federal Clients",
            },
            {
              key: "1-1-2",
              taskName: "fedor.timakov",
              baselineWork: 0,
              remainingWork: 0,
              actualWork: 3,
              chargeCode: "MP_Federal Clients",
            },
            {
              key: "1-1-3",
              taskName: "TBD Team Member",
              baselineWork: 10,
              remainingWork: 5,
              actualWork: 0,
              chargeCode: "MP_Federal Clients",
            },
            {
              key: "1-1-999999",
              taskName: "",
              baselineWork: 0,
              remainingWork: 0,
              actualWork: 0,
              chargeCode: "",
            },
          ],
        },
        {
          key: "1-2",
          taskName: "MDM.137 - Build",
          baselineWork: 15,
          remainingWork: 10,
          actualWork: 5,
          chargeCode: "MP_Federal Clients",
        },
        {
          key: "1-3",
          taskName: "MDM.137 - Test",
          baselineWork: 20,
          remainingWork: 15,
          actualWork: 5,
          chargeCode: "MP_Federal Clients",
        },
        {
          key: "1-4",
          taskName: "MDM.137 - Warrantly",
          baselineWork: 5,
          remainingWork: 5,
          actualWork: 5,
          chargeCode: "MP_Federal Clients",
        },
      ],
    },
  ]);

  const onResourcesClick = useCallback(
    ({ key, colKey }: { key: string; colKey: ReactNode }) => {
      let newData = [...data];
      if (colKey) {
        const [firstIndex, childrenIndex] = colKey.toString().split("-");
        const [currentData] = newData.filter(({ key }) => key === firstIndex);
        if (currentData.children) {
          const currentChildrenData = currentData.children.filter(
            ({ key }) => key === `${firstIndex}-${childrenIndex}`
          );

          const resourcesData = currentChildrenData[0].children;

          if (resourcesData) {
            const key = resourcesData[resourcesData.length - 2].key
              ?.toString()
              .split("-");
            resourcesData.splice(resourcesData.length - 1, 0, {
              key: `${firstIndex}-${childrenIndex}-${+(key || [])[2] + 1}`,
              taskName: "TBD Team Member",
              baselineWork: 10,
              remainingWork: 5,
              actualWork: 0,
              chargeCode: "MP_Federal Clients",
            });

            setData(newData);
          }
        }
      }
    },
    [data]
  );

  const columns: ColumnsType<DataType> = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
      render: (val, col) => {
        if (col.key?.toString().includes("999999")) {
          return (
            <Dropdown
              overlay={
                <Menu
                  onClick={(e) => onResourcesClick({ ...e, colKey: col.key })}
                  items={[
                    {
                      label: "gleb.sukhorukov",
                      key: "gleb.sukhorukov",
                    },
                    {
                      label: "ivan.lisenko",
                      key: "ivan.lisenko",
                    },
                  ]}
                />
              }
              trigger={["click"]}
            >
              <Space>
                <Button className={styles.button} type="link" block>
                  Add Resources
                  <DownOutlined />
                </Button>
              </Space>
            </Dropdown>
          );
        }
        return val ? val : <Input />;
      },
    },
    {
      title: "Baseline Work",
      dataIndex: "baselineWork",
      key: "baselineWork",
      render: (val, col) => {
        if (col.key?.toString().includes("999999")) {
          return;
        }
        return isNull(val) ? <Input /> : val;
      },
    },
    {
      title: "Remaining Work",
      dataIndex: "remainingWork",
      key: "remainingWork",
      render: (val, col) => {
        if (col.key?.toString().includes("999999")) {
          return;
        }
        return isNull(val) ? <Input /> : val;
      },
    },
    {
      title: "Actual Work",
      dataIndex: "actualWork",
      key: "actualWork",
      render: (val, col) => {
        if (col.key?.toString().includes("999999")) {
          return;
        }
        return val;
      },
    },
    {
      title: "Charge Code",
      dataIndex: "chargeCode",
      key: "chargeCode",
      render: (val, col) => {
        if (col.key?.toString().includes("999999")) {
          return;
        }
        return val ? val : <Input />;
      },
    },
  ];

  const onCreateNewTask = useCallback(() => {
    const key = data[data.length - 1].key?.toString().split("-");
    setData([
      ...data,
      {
        key,
        taskName: "",
        baselineWork: null,
        remainingWork: null,
        actualWork: 0,
        chargeCode: "",
      },
    ]);
  }, [data]);

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <>
      <Typography.Title level={5} className={styles.title}>
        {pageTitles[pathname]}
      </Typography.Title>
      <div className={styles.actions}>
        <Button type="primary" onClick={onCreateNewTask}>
          + Creatre new task
        </Button>
        <Button danger>Delete task</Button>
      </div>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly: false }}
        dataSource={data}
      />
    </>
  );
};

export default TaskCreation;
