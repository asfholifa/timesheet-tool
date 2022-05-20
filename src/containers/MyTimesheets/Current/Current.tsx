import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Dropdown, Button, Menu, Space, message } from "antd";
import {
  DownOutlined,
  RightOutlined,
  LeftOutlined,
  ClockCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { pageTitles } from "@helpers/const";
import { ICurrentDate, ITask, ITaskWeeks } from "./Current.types";
import Grid from "@components/Grid/Grid";
import { useDebounce } from "@helpers/hooks";
import styles from "./Current.module.scss";

const options = [
  {
    id: 0,
    projectName: "PCDLN",
    taskName: "PCDLN BFF Design",
    remainingTime: 10,
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
    total: null,
  },
  {
    id: 1,
    projectName: "LES",
    taskName: "LES Wave 3 Analysis",
    remainingTime: 3,
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
    total: null,
  },
  {
    id: 2,
    projectName: "CBD",
    taskName: "CBD Wave 3",
    remainingTime: 5,
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
    total: null,
  },
  {
    id: 3,
    projectName: "Non Project",
    taskName: "OP.374.001 Build",
    remainingTime: 1,
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
    total: null,
  },
];

const dateFormat = "DD-MM-YYYY";

const Current = () => {
  const { pathname } = useLocation();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [total, setTotal] = useState<ITaskWeeks>({
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
    total: null,
  });
  const [date, setDate] = useState<ICurrentDate>({
    startDate: moment("25-04-2022", dateFormat),
    endDate: moment("01-05-2022", dateFormat),
  });
  const debouncedTasks = useDebounce(tasks, 2000);

  const onDropDownItemClick = (task: ITask) => {
    setTasks((state) => [...state, task]);
  };

  const saveTimeseet = () => {
    message.success("Your timesheet was saved.", 3);
  };

  useEffect(() => {
    if (debouncedTasks.length) {
      saveTimeseet();
    }
  }, [debouncedTasks]);

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

  const onSave = () => {
    saveTimeseet();
  };

  const onSubmit = () => {
    console.log("onSubmit");
  };

  const onRecall = () => {
    console.log("onRecall");
  };

  const onPrevDate = () => {
    setDate({
      startDate: moment(date.startDate, dateFormat).subtract(7, "days"),
      endDate: moment(date.endDate, dateFormat).subtract(7, "days"),
    });
  };

  const onNextDate = () => {
    setDate({
      startDate: moment(date.startDate, dateFormat).add(7, "days"),
      endDate: moment(date.endDate, dateFormat).add(7, "days"),
    });
  };

  return (
    <>
      <div className={styles["title-block"]}>
        <div className={styles["title-wrapper"]}>
          <Typography.Title level={5} className={styles.title}>
            {pageTitles[pathname]}
          </Typography.Title>
          <div>
            <Button onClick={onSave} icon={<SaveOutlined />} />
          </div>
        </div>
        <div className={styles.hidden} />
      </div>
      <div className={styles["date-block"]}>
        <Button
          type="primary"
          shape="circle"
          onClick={onPrevDate}
          icon={<LeftOutlined />}
        />
        <div className={styles["date-info"]}>
          <Typography.Title level={5}>
            {date.startDate.format("MMM DD YY")}
          </Typography.Title>
          <span>—</span>
          <Typography.Title level={5} className={styles.date}>
            {date.endDate.format("MMM DD YY")}
          </Typography.Title>
        </div>
        <Button
          type="primary"
          shape="circle"
          onClick={onNextDate}
          icon={<RightOutlined />}
        />
      </div>
      <div className={styles.actions}>
        <div className={styles["button-wrapper"]}>
          <Button type="primary" onClick={onSubmit}>
            <Space>Submit</Space>
          </Button>

          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="primary">
              <Space>
                Add Task
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <div className={styles["total-button-wrapper"]}>
          <Button danger onClick={onRecall}>
            <Space>Recall</Space>
          </Button>
          <div className={styles["total-info"]}>
            <ClockCircleOutlined />
            <Typography.Title level={5}>
              Total {total.total === null && 0} h.
            </Typography.Title>
          </div>
        </div>
        <div className={styles.hidden} />
      </div>

      <Grid
        tasks={tasks}
        setTasks={setTasks}
        date={date}
        total={total}
        setTotal={setTotal}
      />
    </>
  );
};

export default Current;
