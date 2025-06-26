import { useState, type FormEvent } from "react";

const Register = ({role}:{role:string}) => {
  const [data,setData] = useState({
    name:"",
    password:"",
    role:role,
    parentCode:""
  });

  const [cPassWord,setCPassword] = useState("")

  const onReset =() =>{
    setData({...data,
      name:"",
      password:"",
      parentCode:""
    });
  }


  const onSubmit = (e:FormEvent) =>{
      e.preventDefault();
      console.log(data);
    }

  return (
    <form className="w-full h-full px-4 py-6 " onSubmit={onSubmit}>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="name" className="md:text-8xl text-4xl text-Accent-Secondary mr-2">Name:</label>
        <input type="text" placeholder="Enter Your Name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="password" className="md:text-8xl text-4xl text-Accent-Secondary mr-2">Password: </label>
        <input type="password" placeholder="Enter Your Password" value={data.password} onChange={(e)=>setData({...data,password:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      <div className="w-full min-h-10 flex items-center">
        <label htmlFor="password" className="md:text-7xl text-2xl text-Accent-Secondary mr-2">Confirm Password: </label>
        <input type="password" placeholder="Re-enter Your Password" value={cPassWord} onChange={(e)=>setCPassword(e.target.value)}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
      {
        role === "child" && (
          <div className="w-full min-h-10 flex items-center">
        <label htmlFor="parentCode" className="md:text-6xl text-4xl text-Accent-Secondary mr-2">Enter Your Parent's Name: </label>
        <input type="text" placeholder="Enter Your password" value={data.parentCode} onChange={(e)=>setData({...data,parentCode:e.target.value})}
         className="border border-Accent-Secondary min-h-full w-full text-Text-Ligth text-xl md:text-6xl"/>
      </div>
        )
      }

      <div className="flex justify-around mt-12">
        <button type="submit" className="min-w-1/3 min-h-12 bg-UI-8 font-extrabold text-2xl rounded-full cursor-pointer">Submit</button>
        <button type="reset" onClick={onReset} className="min-w-1/3 min-h-12 bg-UI-3 rounded-full text-2xl cursor-pointer">Reset</button>
      </div>
    </form>
  )
}

export default Register;