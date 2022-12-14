import './App.css';

import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react'

import NewList from './components/NewList'
import EditList from './components/EditList'

import NewItem from './components/NewItem'
import EditItem from './components/EditItem'


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
      setItems ([...items, response.data])
    })
}

const handleDeleteItems = (deletedItems) => {
  axios.delete('https://stark-dusk-04018.herokuapp.com/api/items/' + deletedItems.id)
  .then ((response) => {
    setItems (items.filter( item => item.id !== deletedItems.id))
  })
}

const handleUpdateItems = (editItem) => {
  axios
    .put('https://stark-dusk-04018.herokuapp.com/api/items/' + editItem.id, editItem)
    .then((response) => {
      setItems(items.map((item) => {
        return item.id !== editItem.id ? item : editItem
      }))
    })
}





  useEffect(() => {
    getBoards()
    getLists()
    getItems()
  }, []) 


  return (
    <div className="App bg-teal-400">
        {boards.map((board) => {
          return(
            <div className="board " key={board.id}>
              <h1 className="text-gray-900 text-xl font-bold leading-tight font-medium mb-2">{board.title}</h1>
              <h2>{board.description}</h2>
              <div className="flex flex-wrap text-center justify-around">
                {lists.map((list) => {
                  return(
                    <div className="mt-4 p-1 space-y-2 bg-gray-200 max-w-sm rounded overflow-hidden shadow-lg" key={list.id}>
                      <h3 className ="font-bold text-xl mb-2">{list.title}</h3>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => {handleDeleteLists(list)}} value={list.id}>Delete</button>
                      <EditList handleUpdateLists={handleUpdateLists} list={list}/>
                      {items.filter((item) => {
                        if (item.list == list.id){
                          return item
                        }
                      })
                      .map((item) => {
                        return(
                          <div key={item.id}>
                            <h5 className="text-gray-700 text-base">{item.title}</h5>
                            <h6 className="text-gray-700 text-base">{item.description}</h6>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => {handleDeleteItems(item)}} value={item.id}>Delete</button>
                            <EditItem handleUpdateItems={handleUpdateItems} item={item}/>
                          </div>
                        )
                      })}
                      <br/>
                      Add a New Item To the List
                      <NewItem list={list} handleCreateItems={handleCreateItems}/>
                    </div>
                  )
                })}
                <div className="mt-4 p-1 space-y-2 bg-gray-200 max-w-sm rounded overflow-hidden shadow-lg ">
                  <h4>Add a New List</h4>
                  <NewList board={board} handleCreateLists={handleCreateLists}/>
                </div>
                </div>
            </div>
          )
        })}
    </div>
  );
}

export default App;
