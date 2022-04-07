import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Settings } from '../../types/types';

export function ShowSettings() {
  const { isLoading, isError, data } = useQuery(
    'settings',
    async () => {
      return (await axios.get<Settings>('http://127.0.0.1:3001/api/settings')).data
    }
  )

  if (isLoading)
    return <p>loading settings...</p>

  if (isError || !data)
    return <p>there was an error!</p>

  return (
    <div>
      <div>FOO:{data.foo}</div>
      <div>BAR:{data.bar}</div>
      <div>BAZ:{data.baz}</div>
    </div>
  )
}
