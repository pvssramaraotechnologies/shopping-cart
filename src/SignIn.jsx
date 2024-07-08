import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {

     const navigate = useNavigate();

     const [value,setValue] = useState("");

     function handleOnChange(e) {
        setValue({
            ...value,
            [e.target.name] : e.target.value
        })
     }
    
     function handleClick() {
        if(value!=='') {
            navigate('/');
        }else{
            alert("Enter login details");
        }
    }

  return (
    <div>
        <label>Email</label><input onChange={handleOnChange}></input><br></br>
        <label>Password</label><input onChange={handleOnChange}></input><br></br>
        <button onClick={handleClick}>SignIn</button>
    </div>
  )
}
