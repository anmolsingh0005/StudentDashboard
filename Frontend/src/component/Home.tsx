import { Button, Card,    Image, Progress,  Table, TableProps, Tag, Tooltip } from 'antd'
import React, { useEffect } from 'react';
import {CheckOutlined } from '@ant-design/icons';
import './Home.css'
import { useSelector,useDispatch } from 'react-redux'
import { addenrolleddata } from '../store/studentdata'
import BarChart from '../chart/Barchart';

function Home() {
  const data = useSelector((state:any) => state.counter.enrolleddata)
  const dispatch = useDispatch()
  const fetchdata=async()=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/enrolled`);
    const data=await response.json();
    const newdata=data.map((item:any)=>{
      return {...item,disabled:item.complete==='true'}
    });
    dispatch(addenrolleddata(newdata));
  };

  const updatedisable=(record:any)=>{
    const reqbody={
      progress:100,
      complete:true
    }
    fetch(`${process.env.REACT_APP_API_URL}/enrolled/${record._id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(reqbody)
    }).then(()=>{
      fetchdata();
    }).catch((error)=>{
      console.error('Error:',error);
    });
  };




  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: '',
      key: 'name',
      render: (record) =>{
        return(
          <div className={record.disabled?'disabled-row':""} style={{cursor:"pointer",color:"blue"}} >{record.name}</div>
        )
      }
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Due Date',
      dataIndex: 'duedate',
      key: 'duedate',
      render: (text:string) => {
        return(
          <Tag color='orange' >
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (text) => {
        return(
          <Progress percent={text} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} />
        )
      },
    },
    {
      title: 'Thumbnail',
      dataIndex: '',
      key: 'thumbnail',
      render: (text:any) => {
        return(
          <Image
            preview={!text.disabled}
            width={100}
            src={text.thumbnail}
            />
        )
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      render: (text:any) => {
        return(
          <Tooltip placement="topRight" title={'Mark as completed'} >
            <Button onClick={()=>{!text.disabled&&updatedisable(text)}} disabled={text.disabled} shape="circle" icon={<CheckOutlined />}/>    
          </Tooltip>
        )
      },
    },
  ];

  useEffect(()=>{
    fetchdata();
  },[]);


    const rowClassName = (record:any) => {
      return record.complete==='true' ? 'disabled-row' : '';
    };

  return (
    <div>
    <div className='dashboardheader' style={{width:"100%",display:'flex'}} >
      <div className='barchart' style={{width:'70%'}} >
    <BarChart/>
      </div>
      <div className='activitystatus' style={{width:'30%'}} >
      <Card title="Activity status" bordered={false} style={{ width: '100%',height:'100%' }}>
      <Tooltip title="Actively learning">
      <Progress type="dashboard" percent={75} />
      </Tooltip>
      <Tooltip title="Actively Taking assignments ">
      <Progress type="dashboard" percent={75} gapDegree={30} />
      </Tooltip>
    </Card>
      </div>
    </div>
    <div>

    <Table 
    style={{width:"100vw",overflowY:"auto",padding:'0'}} 
    columns={columns} 
    dataSource={data}
    rowClassName={rowClassName}
    />
    </div>
    </div>
  )
}

export default Home