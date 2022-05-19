import React, { useEffect, useState } from "react";
import { Typography, Dropdown, Button, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { pageTitles } from "@helpers/const";
import { useLocation } from "react-router-dom";
import { ITask } from "./Current.types";
import Grid from "@components/Grid/Grid";
import styles from "./Current.module.scss";

const options = [
  {
    projectName: "PCDLN",
    taskName: "PCDLN BFF Design",
    remainingTime: 10,
    mon: undefined,
    tue: undefined,
    wed: undefined,
    thu: undefined,
    fri: undefined,
    sat: undefined,
    sun: undefined,
    total: undefined,
  },
  {
    projectName: "LES",
    taskName: "LES Wave 3 Analysis",
    remainingTime: 3,
    mon: undefined,
    tue: undefined,
    wed: undefined,
    thu: undefined,
    fri: undefined,
    sat: undefined,
    sun: undefined,
    total: undefined,
  },
  {
    projectName: "CBD",
    taskName: "CBD Wave 3",
    remainingTime: 5,
    mon: undefined,
    tue: undefined,
    wed: undefined,
    thu: undefined,
    fri: undefined,
    sat: undefined,
    sun: undefined,
    total: undefined,
  },
  {
    projectName: "Non Project",
    taskName: "OP.374.001 Build",
    remainingTime: 1,
    mon: undefined,
    tue: undefined,
    wed: undefined,
    thu: undefined,
    fri: undefined,
    sat: undefined,
    sun: undefined,
    total: undefined,
  },
];

const Current = () => {
  const { pathname } = useLocation();
  const [tasks, setTasks] = useState<ITask[]>([]);

  const onDropDownItemClick = (task: ITask) => {
    setTasks((state) => [...state, task]);
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const menu = (
    <Menu
      items={options.map((el) => ({
        label: (
          <Button
            onClick={() => onDropDownItemClick(el)}
            className={styles.button}
            type="link"
          >
            {el.taskName}
          </Button>
        ),
        key: el.taskName,
      }))}
    />
  );

  return (
    <>
      <Typography.Title level={5} className={styles.title}>
        {pageTitles[pathname]}
      </Typography.Title>
      <div className={styles.actions}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button>
            <Space>
              Button
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <Grid tasks={tasks} />
    </>
  );
};

export default Current;
