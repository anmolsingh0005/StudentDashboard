import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Collapse, Descriptions, List, Avatar } from 'antd';
import { UserOutlined, BookOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useSelector,useDispatch } from 'react-redux'
import { addcoursedetail,addheadername } from '../../store/studentdata'

const { Panel } = Collapse;

function CourseDetail() {
  const { id } = useParams();
  const course = useSelector((state:any) => state.counter.coursedetail)
  const dispatch = useDispatch()

  const fetchCourseById = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/data/${id}`);
      const data = await response.json();
      dispatch(addcoursedetail(data));
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  useEffect(() => {
    fetchCourseById();
    setTimeout(() => {
        
        dispatch(addheadername("Course Detail"));
    }, 500);
  }, [id]);

  return (
    <div className="course-detail-container">
      {course ? (
        <div className="course-details">
          <h2>{course.name}</h2>
          <Descriptions bordered>
            <Descriptions.Item label="Instructor">{course.instructor}</Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>{course.description}</Descriptions.Item>
            <Descriptions.Item label="Enrollment Status">{course.enrollmentStatus}</Descriptions.Item>
            <Descriptions.Item label="Duration">{course.duration}</Descriptions.Item>
            <Descriptions.Item label="Schedule">{course.schedule}</Descriptions.Item>
            <Descriptions.Item label="Location">{course.location}</Descriptions.Item>
          </Descriptions>
          <Collapse accordion>
            <Panel header={<span><BookOutlined /> Prerequisites</span>} key="1">
              <List
                dataSource={course.prerequisites}
                renderItem={(item:any, index) => (
                  <List.Item key={index}>{item}</List.Item>
                )}
              />
            </Panel>
            <Panel header={<span><UnorderedListOutlined /> Syllabus</span>} key="2">
              <List
                dataSource={course.syllabus}
                renderItem={(item:any, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      title={`Week ${item.week}: ${item.topic}`}
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
            </Panel>
            <Panel header={<span><UserOutlined /> Students</span>} key="3">
              <List
                dataSource={course.students}
                renderItem={(student:any, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={student.name}
                      description={student.email}
                    />
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CourseDetail;
