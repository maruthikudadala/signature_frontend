// import React from "react";
// import '../../App'

// const Register =()=>{
//     return(
//        <div className="parent">
//         <form action="">
//         <h2>User Registration</h2>
//             <label htmlFor="">UserName:</label>
//             <input type="text" name="username" value="username" placeholder="enter user name"/>
//             <label htmlFor="">Email:</label>
//             <input type="email" name="email" value="email" placeholder="example@gmail.com" />
//             <label htmlFor="">Password:</label>
//             <input type="password" name="password" value="password" placeholder="enter a password" />
//             <button>Submit</button>
//         </form>
//        </div>

//     )
// }





// export default Register


// import React,{useState} from "react";
// import { API_URL } from "../../utils/apiPath";

// const Register = ({showLoginHandler}) => {
//   const [username, setUsername] = useState("")
//   const [email,setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, serError] = useState("")
//   const [loading, setLoading] = useState(true)

// const handleSubmit = async(e)=>{
//   e.preventDefault();
//   try{
//     const response = await fetch(`${API_URL}/user/register`,{
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body:JSON.stringify({name:username,email,password}) //name:username bcs backend userSchema is "name"
//     })
//     const data = await response.json()
//     if(response.ok){
//       console.log(data)
//       setUsername("")
//       setEmail("")
//       setPassword("")
//       alert("user register successfully")
//       showLoginHandler(); //regitration after,login page automatic open avvataniki
//     }else if (response.status === 404) {
//       alert("Email already exists");
//     } else {
//       alert(data.message || "Registration failed");
//     }

     
//   }
//   catch(error){
//     console.error("registration failed ",error)
//     alert("registration failed")
//   }
// }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
//       <div className="w-[420px] backdrop-blur-md bg-white/10 border border-white/30 text-white shadow-lg rounded-xl px-10 py-8">
//         <h2 className="text-3xl font-bold text-center mb-8">User Registration</h2>

//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Username Field */}
//           <div>
//             <label  className="block mb-2 text-sm font-medium">
//               Username
//             </label>
//             <input
//               type="text"
//                name="username"
//               //id="username"
//               value={username}
//               onChange={(e)=>setUsername(e.target.value)}
//               placeholder="Enter username"
//               required
//               className="w-full px-4 py-3 rounded-md bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block mb-2 text-sm font-medium">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={email}
//               onChange={(e)=>setEmail(e.target.value)}
//               placeholder="example@gmail.com"
//               required
//               className="w-full px-4 py-3 rounded-md bg-white/80 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block mb-2 text-sm font-medium">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               value={password}
//               onChange={(e)=>setPassword(e.target.value)}
//               placeholder="Enter a password"
//               required
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

// export default Register;

import React, { useState } from "react";
import { API_URL } from "../../utils/apiPath";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        alert("User registered successfully");
        showLoginHandler();
      } else if (response.status === 404) {
        alert("Email already exists");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[600px] h-[450px] bg-white border border-gray-300 rounded-lg shadow-lg p-10 flex flex-col items-center rounded-[8px]">
        <h2 className="text-[28px] font-medium text-gray-800 mb-6 text-center">
          Create new account
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">

{/* Name Label + Input */}
<div className="mb-[10px] w-full max-w-[480px]">
  <label className="block text-[18px] font-bold mb-1" htmlFor="username">
    Username
  </label>
  <input
    id="username"
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="Enter your name"
    className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

{/* Email Label + Input */}
<div className="mb-[10px] w-full max-w-[480px]">
  <label className="block text-[18px] font-bold mb-1" htmlFor="email">
    Email
  </label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="example@gmail.com"
    className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

{/* Password Label + Input */}
<div className="mb-[20px] w-full max-w-[480px]">
  <label className="block text-[18px] font-bold mb-1" htmlFor="password">
    Password
  </label>
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    className="w-full h-[40px] px-4 border border-gray-300 rounded text-[16px] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

{/* Submit Button + Login Link */}
<div className="w-full flex flex-col items-center mt-4">
  <button
    type="submit"
    className="btn text-white bg-[#e5322d] hover:bg-red-600 text-[18px] leading-[26px] font-semibold rounded-[8px] py-[10px] px-[20px]"
  >
    Sign up
  </button>

  <p className="mt-4 text-sm text-gray-700">
    Already a member?{" "}
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        showLoginHandler();
      }}
      className="text-blue-600 hover:underline cursor-pointer"
    >
      Log in
    </a>
  </p>
</div>
</form>

        
      </div>
    </div>
  );
};

export default Register;
