import { useState, type FormEvent } from "react";

const Login = () => {

  const [data,setData] = useState({
    userName:"",
    password:""
  })

  const onReset =() =>{
    setData({
      userName: "",
      password:""
    });
  }

  const onSubmit = (e:FormEvent) =>{
    e.preventDefault();
    console.log(data);
  }

  return (
    <form onSubmit={onSubmit} className="w-full h-full px-4 py-6 flex flex-col justify-self-center">
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="name" className="md:text-8xl text-4xl text-Accent-Secondary mr-2">Name:</label>
        <input type="text" placeholder="Enter Your Name" value={data.userName} onChange={(e)=>setData({...data,userName:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="password" className="md:text-8xl text-4xl text-Accent-Secondary mr-2">Password: </label>
        <input type="password" placeholder="Enter Your password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="flex justify-around mt-12">
        <button type="submit" className="min-w-1/3 min-h-12 bg-UI-8 font-extrabold text-2xl rounded-full cursor-pointer">Submit</button>
        <button type="reset" onClick={onReset} className="min-w-1/3 min-h-12 bg-UI-3 rounded-full text-2xl cursor-pointer">Reset</button>
      </div>
    </form>
  )
}

export default Login;