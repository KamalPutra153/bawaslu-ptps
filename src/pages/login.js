import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push("/dashboard"); // arahkan ke halaman dashboard
    }
  };

  return (
    <>
      <section className="login-section">
        <div className="text-center">
          <Image
            src="/assets/img/Logo_Bawaslu.png"
            alt="Deskripsi gambar"
            width={200}
            height={50}
            style={{ height: "auto" }}
            priority
          />
        </div>
        <div className="container mt-5">
          <h2 className="">Masuk</h2>
          <p className="">Silahkan masuk untuk melanjutkan</p>
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Kata Sandi *
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <div className="mb-3 text-center">
              <br />
              <Link href="/">Beranda</Link>
              <br />
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
