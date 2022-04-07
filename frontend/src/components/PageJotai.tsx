import React, { Suspense } from 'react';
import { atom, useAtom, useSetAtom, PrimitiveAtom } from "jotai";
import { splitAtom } from 'jotai/utils'
import axios from 'axios';
import { Settings } from '../types/types';
import { ErrorBoundary } from './Jotai/Jotai';
/// EXAMPLE 1

const nameAtom = atom('')

const surnameAtom = atom('')

const fullNameAtom = atom((get) => `${get(nameAtom)} ${get(surnameAtom)}`)

const fullNameUppercaseAtom = atom(
  (get) => get(fullNameAtom).toUpperCase())

function NameComponent() {
  const [name, setName] = useAtom(nameAtom)
  const [surname, setSurname] = useAtom(surnameAtom)

  return (
    <div>
      <div>Name</div>
      <input onChange={(e) => setName(e.target.value)} value={name} />
      <div>Surname</div>
      <input onChange={(e) => setSurname(e.target.value)} value={surname} />
    </div>
  )
}

function FullNameComponent() {
  const [fullName] = useAtom(fullNameAtom)
  const [fullNameUppercase] = useAtom(fullNameUppercaseAtom)

  return (<div>
    <div>{fullName}</div>
    <div>{fullNameUppercase}</div>
  </div>)
}

//SUM EXAMPLES:

const numbersAtom = atom([1, 2, 3])

const sumAtom = atom((get) => get(numbersAtom).reduce((sum, x) => sum + x, 0))

// BASIC: 

function BasicNumbers() {
  const [numbers, setNumbers] = useAtom(numbersAtom)

  const removeNumber = (myIndex: number) =>
    setNumbers((numbers) => numbers.filter((val, index) => index !== myIndex))

  const newNumber = () => setNumbers((numbers) => [...numbers, 0])

  return (
    <div>
      <div>
        {numbers.map((number, index) =>
          <div key={index}>
            <div>
              {number}
              <button
                onClick={() => setNumbers((numbers) => {
                  const newArray = numbers.slice(0);
                  newArray[index] = number + 1;
                  return newArray;
                })}
              >
                add one
              </button>
              <button
                className={'delete'}
                onClick={() => removeNumber(index)}
              >
                delete
              </button>
            </div>
          </div>)}
      </div>
      <button onClick={newNumber}>New number</button>
    </div>
  )
}

// ADVANCED:

function AdvancedNumbers() {
  const setNumbers = useSetAtom(numbersAtom)
  const [splitNumbers] = useAtom(splitAtom(numbersAtom))

  const removeNumber = (myIndex: number) => setNumbers((numbers) => numbers.filter((val, index) => index !== myIndex))

  const newNumber = () => setNumbers((numbers) => [...numbers, 0])

  return (
    <div>
      <div>{splitNumbers.map((x, index) =>
        <AdvancedNumberElement numberAtom={x} index={index} key={index} removeHandler={removeNumber} />)}
      </div>
      <button onClick={newNumber}>New number</button>
    </div>
  )
}

function AdvancedNumberElement({ numberAtom, index, removeHandler }: { numberAtom: PrimitiveAtom<number>, index: number, removeHandler: (arg0: number) => void }) {
  const [number, setNumber] = useAtom(numberAtom)
  return (
    <div>
      {number}
      <button
        onClick={() => setNumber((num) => num + 1)}
      >
        add one
      </button>
      <button
        className={'delete'}
        onClick={() => removeHandler(index)}
      >
        delete
      </button>
    </div>
  )
}

function SumComponent() {
  const [sum] = useAtom(sumAtom)

  return (
    <div>Total Sum: {sum}</div>
  )
}

/// async atom

const settingsAtom = atom(async () => 
  (await axios.get<Settings>(`http://127.0.0.1:3001/api/settings`)).data
)

function SettingsComponent() {
  const [settings] = useAtom(settingsAtom)

  if (!settings)
    return <div>There was an error</div>

  return (
    <div className='divider'>
      <h3>Async action example</h3>
      <div>FOO:{settings.foo}</div>
      <div>BAR:{settings.bar}</div>
      <div>BAZ:{settings.baz}</div>
    </div>
  )
}

export function PageJotai() {
  return (
    <div className="App">
      <div className="title">
        Jotai Example
      </div>
      <div className="App-content">
        <div className='divider'>
          <h3>Form Example</h3>
          <NameComponent />
          <FullNameComponent />
        </div>
        <div className='divider'>
          <h3>Basic List</h3>
          <BasicNumbers />
          <SumComponent />
        </div>
        <div className='divider'>
          <h3>Advanced List</h3>
          <AdvancedNumbers />
          <SumComponent />
        </div>
        <div className='divider'>
          <h3>Async Atom With Suspense</h3>
          <ErrorBoundary>
          <Suspense fallback={<h2>Loading...</h2>}>
            <SettingsComponent />
          </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}