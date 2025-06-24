// pages/login.js
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => {
      document.body.classList.remove("login-page");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: username, 
      password,
    });

    if (res.ok) router.push("/practice");
    else alert("Invalid login credentials");
  };

  return (
    <div className="headdiv">
      <h1 className="login-heading">Login</h1>
      <div className="form">
        <form method="POST" onSubmit={handleLogin}>
          <div className="box">
            <input
              type="text"
              id="username"
              name="username"
              className="input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="placeholder" htmlFor="username">
              Username
            </label>
          </div>
          <br />
          <div className="box">
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="placeholder" htmlFor="password">
              Password
            </label>
          </div>
          <br />
          <div className="box">
            <input type="submit" value="Login" />
            <input
              type="button"
              value="Register"
              onClick={() => router.push("/register")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
