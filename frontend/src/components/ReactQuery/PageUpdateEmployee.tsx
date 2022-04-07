import React from 'react';
import { CreateUpdateEmployee } from './CreateUpdateEmployee';
import { useParams } from 'react-router-dom';
import { useQuery, QueryKey } from 'react-query';
import axios from 'axios';
import { Employee } from '../../types/types';

const fetchEmployee = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { id } = queryKey[1] as { id: string };
  const employee = (await axios.get<Employee>(`http://127.0.0.1:3001/api/employees/${id}`)).data
  return employee
}

export function PageUpdateEmployee( ) {
  const id = +(useParams<{ id: string }>().id)
  const { isLoading, isError, data } = useQuery(['employee', { id: id }], fetchEmployee)


  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError || !data) {
    return <p>there was an error!</p>
  }

  return (
    <div className='divider'>
      <h3>
        Update Employee #{id}
      </h3>
      <CreateUpdateEmployee action='update' employee={data} />
    </div>

  )
}

