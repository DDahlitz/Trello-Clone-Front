import {useState} from 'react'

const NewList = (props) => {
    let emptyList = {title: ''}
    const [list, setList] = useState(emptyList)

    const handleChange = (event) => {
        setList({...list, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.handleCreateLists(list)
        setList({title: '', board: ''})
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='hidden'>
                    {list.board = props.board.id}
                </div>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={list.title} onChange={handleChange} />
                    <br />
                <input type="submit"/>
            </form>
        </>
    )
}

export default NewList