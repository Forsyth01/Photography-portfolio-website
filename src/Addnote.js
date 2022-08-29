import { useState, useEffect } from "react";
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../src/firebase'
import {useNavigate} from 'react-router-dom'


const Addnote = () => {
    const [title, SetTitle] = useState("")
    const [details, SetDetails] = useState("")
    const colRef = collection (db, 'Notes')
    const navigate = useNavigate()
    
    function handleSubmit(e){
        e.preventDefault()
        addDoc(colRef, {
           title: title,
           note: details
        })
        .then(()=>{
            SetTitle("")
            SetDetails("")
            navigate("/")
        })
      .catch(err =>{
        alert(err.message)
      })
    }
    
    return ( 
        <div className="addnote h-[100vh] bg-black text-white py-10">
            <div className="w-[90%] m-auto ">
            <form  className="" onSubmit={handleSubmit}>
                {title || details ? <div className="flex flex-end justify-end">
                <button type="submit" className="absolute bg-yellow-700 py-2 px-4 hover:scale-[102%] rounded-xl">Submit</button>
                </div> : null}
                
                <div className="my-10">
                <input type="text"
                value={title}
                onChange = {(e)=> SetTitle(e.target.value) }
                className="bg-black text-white w-[100%] px-3 py-3 outline-none text-xl "
                placeholder = "Title"
                />

                <textarea 
                value={details}
                onChange = {(e)=> SetDetails(e.target.value) }
                placeholder = "Start typing"
                className="bg-black h-[50vh] resize-none text-white w-[100%] px-3 py-3 outline-none"
                />
                </div>
            </form>
            </div>
        </div>
     );
}
 
export default Addnote;