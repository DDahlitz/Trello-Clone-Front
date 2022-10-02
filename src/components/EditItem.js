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
                    <input type="text" name = "title" value = {item.title} onChange={handleChange} />
                    <br/>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" value={item.description} onChange={handleChange}/>
                    <br/>
                    <input type="submit"/> 
                </form>
            </details>
        </>
    )

}

export default EditItem