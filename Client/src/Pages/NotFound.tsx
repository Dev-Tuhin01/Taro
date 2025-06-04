import { Link } from "react-router-dom";

const NotFound = () =>{
  return (
    <>
    <div className="">404 Not Found 😔</div>
    <Link to="/auth">Let's Get Back</Link>
    </>

  )
}

export default NotFound;