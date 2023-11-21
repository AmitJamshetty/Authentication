import {useState} from "react"
import {useNavigate} from"react-router-dom";

function App() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function registerUser(event){
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/register", {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name, 
        email,
        password,
      }),
    })
    
    const data = await response.json()

		if (data.status === 'Register successfull') {
			navigate("/login")
		}
    if(data.status = "Duplicate Error") {
      const error = document.getElementById("error")
      error.innerHTML = "Duplicate Email !!"
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
  }
  return (
    <div className="App">
      <h1>Register</h1>
      <p id="error"></p>
      <form onSubmit={registerUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
export default App;