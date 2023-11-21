import {useState} from "react"

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function loginUser(event){
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/login", {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword
      }),
    })

    const data = await response.json();
    console.log(data.user);
    console.log(data);

    if(data.user) {
      localStorage.setItem("token", data.user)
      alert('Login Successfull')
      window.location.href = "/dashboard"
    }
    else  {
      let match = document.getElementById("match")
      match.innerHTML = "Passwords didn't match"
      alert("Please check your username and password")
    }
    console.log(data);
  }

  return (
    <div className="App">
      <h1>Login</h1>
      <p id="match"></p>
      <form onSubmit={loginUser}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
        <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /> <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
export default App;