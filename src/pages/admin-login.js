// pages/admin-login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import bcrypt from "bcryptjs";
import Footer from "@/components/Footer";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !data) {
      setErrorMsg("Username tidak ditemukan");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, data.password_hash);

    if (!passwordMatch) {
      setErrorMsg("Password salah");
      return;
    }

    localStorage.setItem("isAdmin", "true");
    router.push("/admin-dashboard");
  };

  const hashPassword = async () => {
    const hash = await bcrypt.hash("admin123", 10);
    console.log(hash); // <-- copy hasil ini ke Supabase
  };

  hashPassword();
  return (
    <>
      <section className="login-admin">
        <div className="container mt-5">
          <h2>Login Admin</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
