import './App.css';

import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'

import NewList from './components/NewList'
import EditList from './components/EditList'

import NewItem from './components/NewItem'



const App = () => {
  const [boards, setBoards] = useState([])
  const [lists, setLists] = useState([])
  const [items, setItems] = useState([])

  const getBoards = () => {
    axios.get('https://stark-dusk-04018.herokuapp.com/api/board').then(
      (response) => setBoards(response.data),
      (err) => console.error(err),
    ).catch((error) => console.error(error))
  }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const getLists = () => {
    axios.get('https://stark-dusk-04018.herokuapp.com/api/lists').then(
        (response) => setLists(response.data),
        (err) => console.error(err),
    ).catch((error) => console.error(error))
}

const handleCreateLists = (addList) => {
  axios.post('https://stark-dusk-04018.herokuapp.com/api/lists/', addList)
    .then((response) => {
      setLists([...lists, response.data])
    })
}

const handleDeleteLists = (deletedLists) => {
  axios.delete('https://stark-dusk-04018.herokuapp.com/api/lists/' + deletedLists.id)
  .then ((response) => {
    setLists (lists.filter( list => list.id !== deletedLists.id))
  })
}

//wait for TA hours to get help
//Moving on to the items until it opens
const handleUpdateLists = (editList) => {
  axios
    .put('https://stark-dusk-04018.herokuapp.com/api/lists/' + editList.id, editList)
    .then((response) => {
      setLists(lists.map((list) => {
        return list.id !== editList.id ? list : editList
      }))
    })
}

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const getItems = () => {
  axios.get('https://stark-dusk-04018.herokuapp.com/api/items').then(
      (response) => setItems(response.data),
      (err) => console.error(err),
  ).catch((error) => console.error(error))
}

const handleCreateItems = (addItem) => {
  axios.post('https://stark-dusk-04018.herokuapp.com/api/items/', addItem)
    .then((response) => {
      setItems([...items, response.data])
    })
}





  useEffect(() => {
    getBoards()
    getLists()
    getItems()
  }, []) 


  return (
    <div className="App">
        {boards.map((board) => {
          return(
            <div key={board.id}>
              <h1>{board.title}</h1>
              <h3>{board.description}</h3>

                {lists.map((list) => {
                  return(
                    <div key={list.id}>
                      <h3>{list.title}</h3>
                      <EditList handleUpdateLists={handleUpdateLists} list={list}/>
                      <button onClick={() => {handleDeleteLists(list)}} value={list.id}>Delete</button>

                      {items.filter((item) => {
                        if (item.list == list.id){
                          return item
                        }
                      })
                      .map((item) => {
                        return(
                          <div key={item.id}>
                            <h4>{item.title}</h4>
                            <h5>{item.description}</h5>
                          </div>
                        )
                      })}
                      Add a New Item To the List
                      <NewItem list={list} handleCreateItems={handleCreateItems}/>
                    </div>
                  )
                })}
                <h4>Add a New List</h4>
                <NewList board={board} handleCreateLists={handleCreateLists}/>
            </div>
          )
        })}
    </div>
  );
}

export default App;


// Backend
  // https://stark-dusk-04018.herokuapp.com/

// Frontend
  // https://rocky-caverns-64581.herokuapp.com/


