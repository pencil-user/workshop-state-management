import React from 'react';
import { useStore } from '../zustandStore/store';
import { useEffect } from 'react';

function Counter() {
  const count = useStore(state => state.count)
  const increaseCount = useStore(state => state.actions.increaseCount)
  const setCount = useStore(state => state.actions.setCount)
  const clickHandler = () => increaseCount()
  const clickHandlerToZero = () => setCount(0)

  return (
    <div className='divider'>
      <h3>Counter example</h3>
      {count}
      <button onClick={clickHandler}>add one</button>
      <button onClick={clickHandlerToZero}>set to 0</button>
    </div>
  )
}

function AsyncAction() {
  const settings = useStore(state => state.settings)
  const fetchSettings = useStore(state => state.actions.fetchSettings)

  useEffect(() => {
    (async () => {
      await fetchSettings()
    })()
  }, [])

  if (!settings)
    return <p>loading...</p>

  return (
    <div className='divider'>
      <h3>Async action example</h3>
      <div>FOO:{settings.foo}</div>
      <div>BAR:{settings.bar}</div>
      <div>BAZ:{settings.baz}</div>
    </div>
  )
}

export function PageZustand() {
  return (
    <div className="App">
      <div className="title">
        Zustand Example
      </div>
      <div className="App-content">
        <Counter />
        <AsyncAction />
      </div>
    </div >
  );
}
