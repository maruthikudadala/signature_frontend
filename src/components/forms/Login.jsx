// import React from "react";

// const Login =()=>{
//     return(
//         <div >
//             <form action="">
//             <h2>User Login</h2>
//             <label htmlFor="">UserName:</label>
//             <input type="text" name="username" value="username" placeholder="enter user name"/>
//             <label htmlFor="">Password:</label>
//             <input type="password" name="password" value="password" placeholder="enter a password" />
//             <button>Submit</button>
//             </form>

//         </div>
//     )
// }
// export default Login

// import React,{useState} from "react";
// import { API_URL } from "../../utils/apiPath";

// const Login = ({showMainPageHandler}) => {
//     const [email,setEmail]=useState('')
//     const [password,setPassword]=useState('')

// const loginhandler=async(e)=>{
//   e.preventDefault();
//   try{
//     const response = await fetch(`${API_URL}/user/login`,{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body:JSON.stringify({email,password})
//     })
//     const data = await response.json()
//     if(response.ok){
//       console.log(data);
//       setEmail('')
//       setPassword('')
//       alert('login successfully')
//       localStorage.setItem('loginToken',data.token)
//       showMainPageHandler();
//     }
//   }
//   catch(err){
//     console.error("Login failed ",err)
//     alert("Login failed")
//   }
// }


//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       <div className="w-[420px] backdrop-blur-md bg-white/10 border border-white/30 text-white shadow-lg rounded-xl px-10 py-8">
//         <h2 className="text-3xl font-bold text-center mb-8">User Login</h2>

//         <form className="space-y-6" onSubmit={loginhandler}>
//           {/* Username Field */}
//           <div>
//             <label  className="block mb-2 text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
             
//               value={email}
//               onChange={(e)=>setEmail(e.target.value)}
//               placeholder="Enter email"
//               className="w-full px-4 py-3 rounded-md bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label  className="block mb-2 text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
              
//               value={password}
//               onChange={(e)=>setPassword(e.target.value)}
//               placeholder="Enter password"
//               className="w-full px-4 py-3 rounded-md bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition duration-200"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { API_URL } from "../../utils/apiPath";

const Login = ({ showMainPageHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginhandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setEmail("");
        setPassword("");
        alert("Login successfully");
        localStorage.setItem("loginToken", data.token);
        showMainPageHandler();
      }
    } catch (err) {
      console.error("Login failed ", err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[600px] h-[450px] bg-white border border-gray-300 rounded-lg shadow-lg p-10 flex flex-col items-center rounded-[8px]">
        <h2 className="text-[28px] font-medium text-gray-800 mb-6 text-center">
          Welcome back!
        </h2>

        <form onSubmit={loginhandler} className="flex flex-col items-center w-full">
          {/* Email */}
          <div className="mb-[10px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-[20px] w-full max-w-[480px]">
            <label className="block text-[18px] font-bold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="w-full flex flex-col items-center mt-4">
            <button
              type="submit"
              className="btn text-white bg-[#e5322d] hover:bg-red-600 text-[18px] leading-[26px] font-semibold rounded-[8px] py-[10px] px-[20px]"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
