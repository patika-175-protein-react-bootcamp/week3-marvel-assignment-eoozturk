import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import './App.css';

function App() {

  const[items, setItems] = useState([])
  const[characters, setCharacters] = useState('')
  const[page,setPage] = useState('')
  let dataCount

  useEffect(() => {
    getData()
  },[])

  const getData = () =>{

    const characters = JSON.parse(localStorage.getItem('characters'));

    if(characters){
      setItems(characters)
    }else{
      axios
          .get("http://gateway.marvel.com/v1/public/characters?&limit=12&ts=1&apikey=899b78a376c3ebe37255206ba7d3fb27&hash=bff67cc98e1fdaa7c50f0b2f82d92959")
          .then(list => {

            if(items.length > 0){
                setItems([...setItems(...list.data.data.results), ...items])
                localStorage.setItem('characters',JSON.stringify([...items,...list.data.data.results]))
                
            }else{
              setItems(list.data.data.results)
              dataCount = list.data.data.total
              setPage(dataCount / 20)
              localStorage.setItem('characters',JSON.stringify(list.data.data.results))
            }
            localStorage.setItem('characters',JSON.stringify(list.data.data.results))
          })
    }  

  }
  const handlePageClick = (data) =>{

    let offset= (data.selected +1) * 20
    getData(offset)  
  }
  return (

    <div className="App">
  
        <div className="header">
            <img className = "header-image" src="images/mrvl.jpeg" alt="Marvel Header"/>
            <img className = "logo" src="images/logo.jpeg" alt="Marvel Logo"/>
        </div>
        
      <div className='row'>
      {items.map(item => {

        return (
          
          <div className='container'>
              <div className='cardContainer '>
                  <div className='card' key={item.id}>
                      <div className='thumbnail'>
                          <img src={item.thumbnail.path + "/portrait_xlarge.jpg"}/>                   
                      </div>
                      <div className='card-title'> <p>{item.name}</p></div>
                  </div>
              </div>
          </div>
          
        );
      })}
    </div>
    <div class="pagination-align">
            <div class="pagination">
              <ReactPaginate
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={'...'}
                pageCount={78}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                onClick={handlePageClick}
              />         
            </div>
        </div>
      <div className ="footer">Marvel Studios - 2022</div>
    </div>
  );
}
export default App;
