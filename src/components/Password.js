import React from "react"
import "../styles/password.css"


const Password = () => {
    return (
        <>
         <div className="password-page">
           <div className="pass-outer">


               <div className="pass1">
                <h1>
                    Forgot Password
                </h1>
               </div>


               <div className="pass2">
                <h3>
                    Email Address
                </h3>
                <input type="name" required/>

                <button className="pass-button">
                   Reset Password
                 </button>
               </div>

                 
           </div>
         </div>
        
        </>
    )
}

export default Password