import React, { FC } from "react";
import { Row, Col, Input } from "antd";
import styles from "./Grid.module.scss";
import { ITask } from "@containers/MyTimesheets/Current/Current.types";

interface IGrid {
  tasks: ITask[];
}

const Grid: FC<IGrid> = ({ tasks }) => (
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
    <Col span={2} className={styles.col}>
      MON
    </Col>
    <Col span={2} className={styles.col}>
      TUE
    </Col>
    <Col span={2} className={styles.col}>
      WED
    </Col>
    <Col span={2} className={styles.col}>
      THU
    </Col>
    <Col span={2} className={styles.col}>
      FRI
    </Col>
    <Col span={2} className={styles.col__disabled}>
      SAT
    </Col>
    <Col span={2} className={styles.col__disabled}>
      SUN
    </Col>
    <Col span={2} className={styles.col__disabled}>
      Total
    </Col>
    <Col span={2} className={styles.col__hidden} />
    {/*            */}

    {/*    CONTENT    */}
    {tasks.map(
      ({
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
      }) => (
        <>
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
            <Input value={mon} />
          </Col>
          <Col span={2} className={styles.col__input}>
            <Input value={tue} />
          </Col>
          <Col span={2} className={styles.col__input}>
            <Input value={wed} />
          </Col>
          <Col span={2} className={styles.col__input}>
            <Input value={thu} />
          </Col>
          <Col span={2} className={styles.col__input}>
            <Input value={fri} />
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
        </>
      )
    )}
    {/*                */}

    {/*    FOOT    */}
    <Col span={6} className={styles.col__disabled}>
      Total
    </Col>
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__disabled} />
    <Col span={2} className={styles.col__hidden} />
    {/*            */}
  </Row>
);

export default Grid;
