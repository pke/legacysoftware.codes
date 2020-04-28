import React, { useState, useRef, useCallback } from "react"

import { parts, description } from "../src/legacyCode"

const Input = ({ name, value, label, selected }) => {
  const [ checked, setChecked ] = useState(selected)
  const onChange = useCallback((event) => {
    setChecked(event.target.checked)
  }, [])
  const id = value.toLowerCase()
  return (<>
    <input type="radio" id={id} name={name} value={value} _checked={checked} _onChange={onChange}/>
    <label htmlFor={id}>{label}</label><br/>
  </>)
}

const Part = ({ title, name, items, selected }) => (
  <details>
    <summary>{title}</summary>
    { items.map(values => {
        const [ value, label ] = values
        return <Input
          key={name+value}
          name={name}
          value={value} 
          label={label} 
          selected={selected === value}/>
      })
    }
  </details>
)

const Code = ({ parts, describe }) => (
  parts.length
    ? parts.map(part => <span key={part} title={describe(part)}>{part}</span>)
    : <span>Please select options below to create a code.</span>
)

export default function Index({ checked }) {
  const [code, setCode] = useState(Object.values(checked))
  console.log("checked", checked)
  
  const onChange = useCallback((event) => {
    const form = event.currentTarget
    const code = Array
      .prototype
      .filter
      .call(form.elements, e => e.checked)
      .map(e => e.value)
    setCode(code)
  }, [])

  return (
    <>
      <div className="result"><Code parts={code} describe={description}/></div>
      <form onChange={onChange} action="/" method="GET">
        <noscript>
          <input type="submit" value="Get Codes"/>
        </noscript>
        { parts.map(({title, name, items}) => 
            <Part key={name} title={title} name={name} items={items} selected={checked[name]}/>)
        }
      </form>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      checked: context.query
    }, // will be passed to the page component as props
  }
}