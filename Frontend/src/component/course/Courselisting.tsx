/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Input, Table, Tag, Tooltip  } from 'antd';
import type { TableProps } from 'antd';
import './Courselisting.css';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined  } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux'
import { addcoursedata,addsearchquery,addheadername } from '../../store/studentdata'
import {LikeOutlined } from '@ant-design/icons';



const Course: React.FC = () =>{
  const data = useSelector((state:any) => state.counter.coursedata)
  const dispatch = useDispatch()
  const fetchdata=async()=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/data`);
    const data=await response.json();
    dispatch(addcoursedata(data));
  };
  const searchvalue = useSelector((state:any) => state.counter.searchquery)

  const navigate=useNavigate();

  const updatelike=(record:any)=>{
    const reqbody={
      like:1
    }
    fetch(`${process.env.REACT_APP_API_URL}/course/${record._id}`,{
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
      title: 'Likes',
      dataIndex: 'like',
      key: 'likes',
      render: (record) =>{
        return(
          <div style={{cursor:"pointer",color:"blue"}} >{record}</div>
        )
      }
    },
    {
      title: 'Name',
      dataIndex: '',
      key: 'name',
      render: (record) =>{
        return(
          <div style={{cursor:"pointer",color:"blue"}} onClick={()=>navigate(`/course/${record._id}`)}>{record.name}</div>
        )
      }
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Status',
      dataIndex: 'enrollmentStatus',
      key: 'enrollmentStatus',
      render: (text) => {
        return(
          <Tag color='blue' >
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => {
        return(
          <Tag color='green' >
            {text}
          </Tag>
        )
      },
    },
    {
      title: 'location',
      dataIndex: 'location',
      key: 'location',
      render: (text) => {
        return(
          <Tag color='orange' >
            {text}
          </Tag>
        )
      },
    },
    {
      title:'Action',
      dataIndex:'',
      key:'action',
      render:(text)=>{
        return(
          <Tooltip placement="topRight" title={'Love this course'} >
          <Button onClick={()=>{!text.disabled&&updatelike(text)}} disabled={text.disabled} shape="circle" icon={<LikeOutlined />}/>    
        </Tooltip>
        )
      }
    }
  ];

  useEffect(()=>{
    fetchdata();
    setTimeout(() => {
      
      dispatch(addheadername('Course'));
    }, 500);
  },[])

  const filterData = (data:any, searchText:string) => {
    if (!searchText) {
      return data; 
    }
    
    const filteredData = data.filter((record:any) => {
      return record.name.toLowerCase().includes(searchText.toLowerCase()) ||
             record.instructor.toLowerCase().includes(searchText.toLowerCase());
    });
    
    return filteredData;
  };
  

  return (
    <>
  <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
    <Input placeholder='Search course and instructor...' style={{width:'20rem'}} onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(addsearchquery(event.target.value))} suffix={<SearchOutlined />} />
  </div>
    <Table 
    style={{width:"100vw",overflowY:"auto",padding:'0'}}
    columns={columns}
    dataSource={filterData(data, searchvalue)}
     />
     </>
  );
};

export default Course;