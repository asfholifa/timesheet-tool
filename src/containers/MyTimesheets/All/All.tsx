import React from "react";
import { Typography } from "antd";
import { pageTitles } from "@helpers/const";
import { useLocation, Link } from "react-router-dom";
import { Table, Tag, Input } from 'antd';


const { Search } = Input;

const All = () => {
  const { pathname } = useLocation();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => <Link to='/'>{`${text} ${record.dateFrom}-${record.dateTo}`}</Link>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: any) => (
        <>
          {status.map((curStatus: any) => {
            let color = curStatus === 'Submitted' ? '#389e0d' : 'gray';
        
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
      title: 'Date from',
      dataIndex: 'dateFrom',
      key: 'dateFrom',
    },
    {
      title: 'Date to',
      key: 'dateTo',
      dataIndex: 'dateTo',
    },
    {
      title: 'Total',
      key: 'total',
      dataIndex: 'total',
      render: (total: any) => `${total} h.`
    }
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      status: ['Submitted'],
      dateFrom: '01.02.2022',
      dateTo: '20.02.2022',
      total: 90,
      color: 'gray'
    },
    {
      key: '2',
      name: 'Jim Green',
      status: ['Submitted'],
      total: 80,
      dateFrom: '01.02.2022',
      dateTo: '20.02.2022'

    },
    {
      key: '3',
      name: 'Joe Black',
      status: ['Draft'],
      total: 60,
      dateFrom: '01.02.2022',
      dateTo: '20.02.2022'

    },
  ];


  return (
    <>
      <Typography.Title level={5}>{pageTitles[pathname]}</Typography.Title>
      <Search placeholder="input search text" onSearch={()=> console.log('записываем значение в стейт и фильтруем значения таблицы')} style={{ width: 200 }} />
<div className="tableWrapper">
    
      <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'} columns={columns} dataSource={data} />;
      </div>
    </>
  );
};

export default All;
