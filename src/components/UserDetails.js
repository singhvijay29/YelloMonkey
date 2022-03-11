import "./UserDetails.css";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./GlobalStyle";
import { lightTheme, darkTheme } from "./Theme";


  function UserDetails(currentPage) {

  const [product, setProduct] = useState([]);
  const [searchTerm , setSearchTerm] = useState('');
const [theme, setTheme] = useState("light");
const themeToggler = () => {
  theme === "light" ? setTheme("dark") : setTheme("light");
};

  const getProduct = async (currentPage) => {
    const response = await fetch(`https://randomuser.me/api/?results=25`, {
      mode: "cors",
    });
    const data = await response.json();
    console.log(data.results);

    setProduct(data.results);
  };
  useEffect(() => {
    getProduct();
  }, [currentPage]);


  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
  <GlobalStyles />
    <div className="whole-body">
  
          <label className="switch" style={{float:"right", margin:"2% 5%"}}> 
            <input
              type="checkbox"
              onClick={themeToggler}
              value="Switch Theme"
            />
            <span className="slider round"></span>
          </label>
   <div className="container">
   <div className="search-box">
      <input type="text" className="search-input" placeholder="Search.." onChange={event =>{setSearchTerm(event.target.value)}}/>
   </div>
   </div>

      <div className="inner-body">
          <div className="div-body">
              <div>Image:</div>
              <div>Name:</div>
              <div>Gender:</div>
              <div>DOB:</div>
              <div>Email:</div>
          </div>
      {product.filter((val)=>{
          if(searchTerm === ""){
              return val
          }else if(val.name.first.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
      }).map((data, ind)=>
          <ul className="ul-body" key={ind}>
            <li className="li-body">
            <div><img src={data.picture.medium} style={{borderRadius: "50%", width:"45px"}} /></div>
                <div>{data.name.first +" "+ data.name.last}</div>
                <div>{data.gender}</div>
                <div>{data.dob.date.substring(0,10)}</div>
                <div style={{display:"wrap", fontSize:"small", textAlign:"left", float:"left"}}>{data.email}</div>
            </li>
          </ul> 
        )}
      </div>

  </div>
  </ThemeProvider>
  );
}

export default UserDetails;
