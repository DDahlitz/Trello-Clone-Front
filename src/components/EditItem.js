import { useState } from "react";

const EditItem = (props) => {
    const [item,setItem] = useState({...props.item})

    const handleChange = (e) => {
        setItem({...item, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleUpdateItems(item)
    }

    return(
        <>
            <details>
                <summary>Edit Item</summary>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input className="rounded border-gray-300" type="text " name = "title" value = {item.title} onChange={handleChange} />
                    <br/>
                    <label htmlFor="description">Description:</label>
                    <input className="rounded mt-2 border-gray-300" type="text" name="description" value={item.description} onChange={handleChange}/>
                    <br/>
                    <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" type="submit"/> 
                </form>
            </details>
        </>
    )

}

export default EditItem