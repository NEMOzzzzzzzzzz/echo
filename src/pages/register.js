import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful. Please log in.");
      router.push("/");
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="headdiv">
      <h1 className="login-heading">Register</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="box">
            <input
              type="text"
              name="name"
              className="input"
              required
              value={form.name}
              onChange={handleChange}
            />
            <label className="placeholder" htmlFor="name">Name</label>
          </div>
          <br />
          <div className="box">
            <input
              type="email"
              name="email"
              className="input"
              required
              value={form.email}
              onChange={handleChange}
            />
            <label className="placeholder" htmlFor="email">Email</label>
          </div>
          <br />
          <div className="box">
            <input
              type="password"
              name="password"
              className="input"
              required
              value={form.password}
              onChange={handleChange}
            />
            <label className="placeholder" htmlFor="password">Password</label>
          </div>
          <br />
          <div className="box">
            <input type="submit" value="Register" />
            <input
              type="button"
              value="Login   "
              onClick={() => router.push("/")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
