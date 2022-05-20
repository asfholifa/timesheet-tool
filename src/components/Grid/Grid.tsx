import React, { FC, useEffect, useState } from "react";
import { Row, Col, Input } from "antd";
import _ from "lodash";
import {
  ICurrentDate,
  ITask,
  ITaskWeeks,
} from "@containers/MyTimesheets/Current/Current.types";
import styles from "./Grid.module.scss";

interface IGrid {
  tasks: ITask[];
  date: ICurrentDate;
  total: ITaskWeeks;
  setTotal: (state: ITaskWeeks) => void;
  setTasks: (state: (state: ITask[]) => ITask[]) => void;
}

const Grid: FC<IGrid> = ({ tasks, setTasks, date, total, setTotal }) => {
  const [dateWeeks, setDateWeeks] = useState<string[]>([]);
  const onTaskChange = (key: string, taskIndex: number, value: string) => {
    setTasks((state) =>
      state.reduce((prev: ITask[], curr, index) => {
        if (index === taskIndex) {
          const currentRecord = {
            ...curr,
            [key]: +value,
            total:
              (curr.mon || 0) +
              (curr.tue || 0) +
              (curr.wed || 0) +
              (curr.thu || 0) +
              (curr.fri || 0) +
              (curr.sun || 0) +
              (curr.sat || 0),
          };
          currentRecord.total =
            (currentRecord.mon || 0) +
            (currentRecord.tue || 0) +
            (currentRecord.wed || 0) +
            (currentRecord.thu || 0) +
            (currentRecord.fri || 0) +
            (currentRecord.sun || 0) +
            (currentRecord.sat || 0);
          return [...prev, currentRecord];
        }
        return [...prev, curr];
      }, [])
    );
  };

  useEffect(() => {
    setTotal(
      tasks.reduce(
        (prev: ITaskWeeks, curr, index) => ({
          ...prev,
          mon: (prev.mon || 0) + (curr.mon || 0),
          tue: (prev.tue || 0) + (curr.tue || 0),
          wed: (prev.wed || 0) + (curr.wed || 0),
          thu: (prev.thu || 0) + (curr.thu || 0),
          fri: (prev.fri || 0) + (curr.fri || 0),
          sat: (prev.sat || 0) + (curr.sat || 0),
          sun: (prev.sun || 0) + (curr.sun || 0),
          total:
            (prev.mon || 0) +
            (prev.tue || 0) +
            (prev.wed || 0) +
            (prev.thu || 0) +
            (prev.fri || 0) +
            (prev.sun || 0) +
            (prev.sat || 0) +
            (index + 1 === tasks.length
              ? (curr.mon || 0) +
                (curr.tue || 0) +
                (curr.wed || 0) +
                (curr.thu || 0) +
                (curr.fri || 0) +
                (curr.sun || 0) +
                (curr.sat || 0)
              : 0),
        }),
        {
          mon: null,
          tue: null,
          wed: null,
          thu: null,
          fri: null,
          sat: null,
          sun: null,
          total: null,
        }
      )
    );
  }, [tasks, setTotal]);

  useEffect(() => {
    const newDate = _.cloneDeep(date);

    setDateWeeks(
      Array(6)
        .fill(newDate.startDate)
        .reduce(
          (prev, curr) => {
            return [...prev, curr.add(1, "days").format("DD/MM ddd")];
          },
          [newDate.startDate.format("DD/MM dd")]
        )
    );
  }, [date]);

  return (
    <>
      <Row>
        {/*    HEAD    */}
        <Col span={2} className={styles.col}>
          Project Name
        </Col>
        <Col span={2} className={styles.col}>
          Task Name
        </Col>
        <Col span={2} className={styles.col}>
          Remaining Time
        </Col>
        {dateWeeks.map((el) => (
          <Col
            key={el}
            span={2}
            className={
              el.includes("Sat") || el.includes("Sun")
                ? styles.col__disabled
                : styles.col
            }
          >
            {el}
          </Col>
        ))}
        <Col span={2} className={styles.col__disabled}>
          Total
        </Col>
        <Col span={2} className={styles.col__hidden} />
        {/*            */}

        {/*    CONTENT    */}
        {tasks.map(
          (
            {
              projectName,
              taskName,
              remainingTime,
              mon,
              tue,
              wed,
              thu,
              fri,
              sat,
              sun,
              total,
            },
            index
          ) => (
            <React.Fragment key={index}>
              <Col span={2} className={styles.col}>
                {projectName}
              </Col>
              <Col span={2} className={styles.col}>
                {taskName}
              </Col>
              <Col span={2} className={styles.col}>
                {remainingTime}
              </Col>
              <Col span={2} className={styles.col__input}>
                <Input
                  onChange={(e) => onTaskChange("mon", index, e.target.value)}
                  value={mon || ""}
                />
              </Col>
              <Col span={2} className={styles.col__input}>
                <Input
                  onChange={(e) => onTaskChange("tue", index, e.target.value)}
                  value={tue || ""}
                />
              </Col>
              <Col span={2} className={styles.col__input}>
                <Input
                  onChange={(e) => onTaskChange("wed", index, e.target.value)}
                  value={wed || ""}
                />
              </Col>
              <Col span={2} className={styles.col__input}>
                <Input
                  onChange={(e) => onTaskChange("thu", index, e.target.value)}
                  value={thu || ""}
                />
              </Col>
              <Col span={2} className={styles.col__input}>
                <Input
                  onChange={(e) => onTaskChange("fri", index, e.target.value)}
                  value={fri || ""}
                />
              </Col>
              <Col span={2} className={styles.col__disabled}>
                {sat}
              </Col>
              <Col span={2} className={styles.col__disabled}>
                {sun}
              </Col>
              <Col span={2} className={styles.col__disabled}>
                {total}
              </Col>
              <Col span={2} className={styles.col__hidden} />
            </React.Fragment>
          )
        )}
        {/*                */}

        {/*    FOOT    */}
        <Col span={6} className={styles.col__disabled}>
          Total
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.mon}
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.tue}
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.wed}
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.thu}
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.fri}
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.sat}
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.sun}
        </Col>
        <Col span={2} className={styles.col__disabled}>
          {total.total}
        </Col>
        <Col span={2} className={styles.col__hidden} />
        {/*            */}
      </Row>
    </>
  );
};

export default Grid;
