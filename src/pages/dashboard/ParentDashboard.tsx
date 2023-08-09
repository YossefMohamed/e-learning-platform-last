import React from 'react';
import { useQuery } from 'react-query';
import request from '@/endpoints/request';

const ParentDashboard = () => {
  const { data, isLoading, error } = useQuery('childProgress', async () => {
    const res = await request({
      url: '/api/child-progress',
      method: 'get',
    });

    return res.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div>
      <h1>Child's Progress</h1>
      <table>
        <thead>
          <tr>
            <th>Assignment</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.name}</td>
              <td>{assignment.dueDate}</td>
              <td>{assignment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParentDashboard;