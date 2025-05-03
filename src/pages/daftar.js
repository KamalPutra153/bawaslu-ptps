import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

export default function Daftar() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDaftar = async (e) => {
    e.preventDefault();

    // 1. Daftarkan ke Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    });

    if (authError) {
      alert("Gagal mendaftar: " + authError.message);
      return;
    }

    // 2. Simpan ke tabel `users`
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .insert([
        {
          id: authData.user.id,
          email: form.email,
        },
      ]);

    if (userError) {
      alert("Gagal menyimpan data pengguna: " + userError.message);
      return;
    }

    // 3. Tampilkan modal sukses
    setShowModal(true);
  };
  return (
    <>
      <section className="daftar-section">
        <div className="container">
          <h4 className="mb-4">Daftar</h4>
          <form onSubmit={handleDaftar}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Kata Sandi</label>
              <div className="input-group">
                <input
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Masukkan kata sandi"
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
                  ></i>{" "}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Ulangi Kata Sandi</label>
              <div className="input-group">
                <input
                  name="confirmPassword"
                  className="form-control"
                  value={form.confirmPassword || ""}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Ulangi kata sandi"
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  <i
                    className={`fa-solid ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Daftar
            </button>
            <div className="text-center mt-3">
              <Link href="/login">Sudah punya akun? Login</Link>
            </div>
          </form>
        </div>
      </section>
      {/* MODAL Sukses */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center p-4">
              <div className="modal-body">
                <h5 className="modal-title text-success">✓ Berhasil</h5>
                <p>Pendaftaran berhasil.</p>
                <p className="text-muted">
                  Silakan login menggunakan alamat email dan password yang telah
                  Anda register, pastikan sebelum itu verifikasi terlebih dahulu
                  di gmail Anda.
                </p>
                <button
                  className="btn btn-danger"
                  onClick={() => router.push("/login")}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
