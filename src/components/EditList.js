import { useState } from "react";

const EditList = (props) => {
  const [list,setList] = useState({...props.list})

  const handleChange = (e) => {
    setList({...list, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleUpdateLists(list)
  }

  return (
    <>
        <details>
            <summary>Edit List</summary>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input className="rounded border-black" type="text"  name="title" value={list.title} onChange={handleChange}/>
                <br/>
            <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="submit"/> 
            </form>
        </details>
    </>
  )

}

export default EditList