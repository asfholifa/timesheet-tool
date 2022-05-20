import React from "react";
import { Typography } from "antd";
import { pageTitles } from "@helpers/const";
import { useLocation, Link } from "react-router-dom";
import { Table, Tag } from "antd";
import SearchInput from "../../../components/SearchInput/SearchInput";
import styles from "./All.module.scss";

const All = () => {
  const { pathname } = useLocation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => (
        <Link to="/">{`${text} ${record.dateFrom}-${record.dateTo}`}</Link>
      ),
      sorter: true,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status: any) => (
        <>
          {status.map((curStatus: any) => {
            let color = curStatus === "Submitted" ? "#389e0d" : "gray";

            return (
              <Tag color={color} key={curStatus}>
                {curStatus}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Date from",
      dataIndex: "dateFrom",
      key: "dateFrom",
    },
    {
      title: "Date to",
      key: "dateTo",
      dataIndex: "dateTo",
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
      render: (total: any) => `${total} h.`,
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      status: ["Submitted"],
      dateFrom: "01.02.2022",
      dateTo: "20.02.2022",
      total: 90,
      color: "gray",
    },
    {
      key: "2",
      name: "Jim Green",
      status: ["Submitted"],
      total: 80,
      dateFrom: "01.02.2022",
      dateTo: "20.02.2022",
    },
    {
      key: "3",
      name: "Joe Black",
      status: ["Draft"],
      total: 60,
      dateFrom: "01.02.2022",
      dateTo: "20.02.2022",
    },
  ];

  // для сортировки
  // const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  //   setSorteredState(sorter)
  //   switch (sorter.order) {
  //       case 'descend':
  //           sorter.order = 'DESC'
  //           break
  //       case 'ascend':
  //           sorter.order = 'ASC'
  //           break
  //       case undefined:
  //           sorter.field = undefined
  //           break
  //   }

  return (
    <>
      <Typography.Title level={5} className={styles.title}>
        {pageTitles[pathname]}
      </Typography.Title>
      <SearchInput />
      <div className={styles.tableWrapper}>
        <Table
          rowClassName={(_, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default All;
