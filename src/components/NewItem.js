import {useState} from 'react'

const NewItem = (props) => {
    let emptyItem = {title: '', description: ''}
    const [item, setItem] = useState(emptyItem)

    const handleChange = (event) => {
        setItem({...item, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreateItems(item)
        setItem({title: '', description: ''})
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
            <div className='hidden'>
                    {item.list = props.list.id}
                </div>
                <label htmlFor="title">Title: </label>
                <input className="rounded border-black" type="text" name="title" value={item.title} onChange={handleChange} />
                    <br />
                <label htmlFor="description">Description: </label>
                <input className="rounded mt-2 border-black" type="text" name="description" value={item.description} onChange={handleChange} />
                    <br />
                <input className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded" type="submit"/>
            </form>
        </>
    )
}

export default NewItem