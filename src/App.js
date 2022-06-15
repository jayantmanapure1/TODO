import React, { useState,useEffect } from 'react'
import todo from "./image/todo.svg";
import './App.css';

function App() {
  const getLocalItem =()=>{
    let list = localStorage.getItem('lists');
    if(list){
      return JSON.parse(list)
    }
  }
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItem());
  const [toogleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

 
  
  const addItem = () => {
    if (!inputData) {
      alert('plz fill the data');
    }else if (inputData && !toogleSubmit) {
      // alert('I am clicked ');
      
      setItems(
          items.map((elem) => {
              if (elem.id === isEditItem) {
                  return { ...elem, name:inputData };
              }
              return elem;
          })
      );

      setToggleSubmit(true);

      setInputData('');

      setIsEditItem(null);
  } else {
      const allInputData = {id:new Date().getTime().toString(),name:inputData}
      setItems([...items, allInputData]);
      setInputData('');
    }

  }
  const editItem =(id)=>{
    

      let newEditItem = items.find((elem) => {
          return elem.id === id;
      })
      console.log(newEditItem.name);
      setToggleSubmit(false);
      setInputData(newEditItem.name);
      setIsEditItem(id);



  
  }
  const  deleteItem = (id) => {
    
    const updatedItems = items.filter((elem) => {
        return elem.id !== id;
    })
    setItems(updatedItems);
}
 const removeAll=()=>{
  setItems([]);
 }
 useEffect(()=>{
  localStorage.setItem('lists',JSON.stringify(items))
 },[items]);

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src={todo} alt="todologo" />
          <figcaption>Add Your List Here ✌</figcaption>
        </figure>
        <div className="addItems">
          <input type="text" placeholder="✍ Add Items..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}

          />
          { toogleSubmit ? <i className="fa fa-plus add-btn" title="Add item" onClick={() => addItem()}></i> :  <i className="far fa-edit add-btn" title="Edit item" onClick={addItem}></i> }
                        

        </div>
        <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3> {elem.name} </h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" title="Edit item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                        
                    </div>
        <div className="showItems">
          <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll} ><span> CHECK LIST </span> </button>
        </div>

      </div>
    </div>
  );
}

export default App;
