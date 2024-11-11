import  {useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from '@/utils/constant'
import { useDispatch, useSelector } from "react-redux";
import { setloading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loading} = useSelector(store=>store.auth)
  const [input, setInput] = useState(
    {
      email: "",
      password: "",
      role: "",
    },
  );
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      dispatch(setloading(true))
      const res = await axios.post(`${USER_API_ENDPOINT}/login`,input,{
          headers:{
              "Content-Type":"application/json"
          },
          withCredentials:true,
      })
      if(res.data.success){
          navigate("/")
          toast.success(res.data.message)
      }
  } catch (error) {
      console.log (`the error is ${error.message}`)
      toast.error(error.res.data.message)
  } finally{
    dispatch(setloading(false))
  }
  }
  

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
               value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
  
          <span className="text-sm">
            Do not have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
