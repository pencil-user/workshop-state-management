import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { QueryKey } from 'react-query';
import { Employee, PageData } from '../../types/types';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EMPLOYEES_PER_PAGE = 10

const REFETCH_INTERVAL = 1000 * 60 * 3

const fetchEmployees = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { limit, skip } = queryKey[1] as { limit: number, skip: number };
  const employee = (await axios.get<PageData<Employee[]>>(`http://127.0.0.1:3001/api/employees?limit=${limit}&skip=${skip}`)).data
  return employee
}

export function PageListEmployees() {
  const page = +(useParams<{ page: string | undefined }>().page || "1")

  const { isLoading, isError, data, isFetching, isRefetching } = useQuery(
    ['employees', { limit: EMPLOYEES_PER_PAGE, skip: (page - 1) * EMPLOYEES_PER_PAGE }],
    fetchEmployees,
    { refetchInterval: REFETCH_INTERVAL }
  )


   const queryClient = useQueryClient()
  
   useEffect(
     () => {
       const prefetchTimeout = setTimeout(
         () => (data && Math.ceil(data.count / EMPLOYEES_PER_PAGE) + 1 > page) &&
           queryClient.prefetchQuery(
             ['employees', { limit: EMPLOYEES_PER_PAGE, skip: (page) * EMPLOYEES_PER_PAGE }], 
             fetchEmployees)
         , 2000)
       return () => clearTimeout(prefetchTimeout)
     }, [data]
   )

  if (isLoading) {
    return <p>loading...</p>
  }

  if (isError || !data) {
    return <p>there was an error!</p>
  }

  return (
    <div className='divider'>
      <Pages count={Math.ceil(data.count / EMPLOYEES_PER_PAGE)} current={page} />
      <table style={{ width: 750 }} className={isFetching || isRefetching ? 'fetching' : ''}>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
          <th>edit</th>
          <th>delete</th>
        </tr>
        {data?.data.map((employee) =>
          <EmployeeRow employee={employee} limit={data.limit} skip={data.skip} key={employee.id} />
        )}
      </table>
      <Pages count={Math.ceil(data.count / EMPLOYEES_PER_PAGE)} current={page} />
    </div>)
}

function Pages({ count, current }: { count: number, current: number }) {
  return (
    <div style={{ margin: "6px" }}>
      {Array.from({ length: count }, (_, page) => page + 1).map((page) =>
      (<span style={{ margin: "3px" }} key={page}>
        {current !== page ?
          <Link style={{ margin: '5x' }} to={`/query/employees/${page}`}><button>{page}</button></Link> :
          <span style={{ margin: '5x' }}>{page}</span>}
      </span>))}
    </div>
  )
}

function EmployeeRow({ employee, limit, skip }: { employee: Employee, limit: number, skip: number }) {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(
    async (id: string) => {
      const deletedId = (await axios.delete<string>(`http://127.0.0.1:3001/api/employees/${id}`)).data
      return deletedId
    },
    {
      onMutate: (variables) => {
        queryClient.cancelQueries(['employees']);
        let previousValues = queryClient.getQueryData<PageData<Employee[]>>(['employees', { limit, skip }])
        if (previousValues) {
          let currentPage = previousValues.data.filter(x => x.id !== employee.id)
          queryClient.setQueryData<PageData<Employee[]>>(['employees', { limit, skip }], { ...previousValues, data: currentPage })
        }
        queryClient.invalidateQueries('employees')
      },
    })

  const clickHandler = async () => {
    await mutateAsync(employee.id)
  }

  return (
    <tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.Name}</td>
      <td>{employee.Phone}</td>
      <td>{employee.Email}</td>
      <td>
        <Link to={`/query/employee/update/${employee.id}`}>
          <button style={{ padding: "4px 18px" }} disabled={isLoading}>
            Edit
          </button>
        </Link>
      </td>

      <td>
        {isLoading ?
          <button
            style={{ padding: "4px 11px" }}
            disabled>
            Deleting
          </button>
          :
          <button
            style={{ padding: "4px 18px" }}
            className='delete'
            onClick={clickHandler}>
            Delete
          </button>
        }

      </td>
    </tr>
  )
}