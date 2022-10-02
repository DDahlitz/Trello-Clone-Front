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
            <input type="text"  name="title" value={list.title} onChange={handleChange}/>
                <br/>
            <input type="submit"/> 
            </form>
        </details>
    </>
  )

}

export default EditList