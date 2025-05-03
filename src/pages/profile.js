import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Gagal mendapatkan user:", userError);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Gagal mengambil profil:", error);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  if (!profile)
    return <p className="text-center mt-5">Memuat data profil...</p>;

  return (
    <>
      <Navbar />
      <section className="profile-section">
        <div className="container mt-5">
          <div className="card shadow-sm p-4">
            <h5 className="mb-1 fw-bold">{profile.nama_lengkap}</h5>
            <p className="text-muted mb-3">{profile.email}</p>

            <div className="d-flex gap-3 flex-wrap">
              <a href="/dashboard" className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-person"></i> Profil
              </a>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
