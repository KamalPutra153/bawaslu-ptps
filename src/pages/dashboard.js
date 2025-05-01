import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    nik: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    agama: "",
    no_kk: "",
    no_hp: "",
    domisili: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
  });

  const provinsiList = [
    "DKI Jakarta",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Banten",
    "Yogyakarta",
    "Bali",
    "Sumatera Utara",
    "Sulawesi Selatan",
    "Kalimantan Timur",
    // Tambahkan lebih banyak sesuai kebutuhan
  ];

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setFormData((prev) => ({
        ...prev,
        nama_lengkap: user.user_metadata?.nama_lengkap || "",
        nik: user.user_metadata?.nik || "",
        ...profileData,
      }));
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <section className="dashboard-section p-4">
        <div className="container">
          <div className="card p-4 shadow-sm">
            <h5 className="mb-4 fw-bold">DETAIL PROFIL</h5>

            {[
              ["Nama *", "nama_lengkap", "text"],
              ["Nomor Induk kependudukan (KTP) *", "nik", "text"],
              ["Tempat Lahir *", "tempat_lahir", "text"],
              ["Tanggal Lahir *", "tanggal_lahir", "date"],
            ].map(([label, name, type, readOnly = false]) => (
              <div className="row mb-3" key={name}>
                <label className="col-md-3 col-form-label fw-bold">
                  {label}
                </label>
                <div className="col-md-9">
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            ))}

            {/* Jenis Kelamin */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Jenis Kelamin *
              </label>
              <div className="col-md-9">
                <select
                  className="form-control"
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin || ""}
                  onChange={handleChange}
                >
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            {[
              ["Agama *", "agama", "text"],
              ["Nomor KK", "no_kk", "text"],
              ["Nomor HP *", "no_hp", "text"],
            ].map(([label, name, type, readOnly = false]) => (
              <div className="row mb-3" key={name}>
                <label className="col-md-3 col-form-label fw-bold">
                  {label}
                </label>
                <div className="col-md-9">
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            ))}
            {/* Domisili */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Domisili tempat tinggal *
              </label>
              <div className="col-md-9">
                <select
                  className="form-control"
                  name="provinsi"
                  value={formData.provinsi || ""}
                  onChange={handleChange}
                >
                  <option value="">-- Pilih Domisili --</option>
                  <option value="Dalam Negri">Dalam Negri</option>
                  <option value="Luar Negri">Luar Negri</option>
                </select>
              </div>
            </div>
            {/* Provinsi */}
            <div className="row mb-3">
              <label className="col-md-3 col-form-label fw-bold">
                Provinsi *
              </label>
              <div className="col-md-9">
                <select
                  className="form-control"
                  name="provinsi"
                  value={formData.provinsi || ""}
                  onChange={handleChange}
                >
                  <option value="">-- Pilih Provinsi --</option>
                  {provinsiList.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {[
              ["Kota / Kabupaten *", "kabupaten", "text"],
              ["Kecamatan / Distrik *", "kecamatan", "text"],
            ].map(([label, name, type, readOnly = false]) => (
              <div className="row mb-3" key={name}>
                <label className="col-md-3 col-form-label fw-bold">
                  {label}
                </label>
                <div className="col-md-9">
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            ))}
            <div className="text-end">
              <button
                className="btn btn-success me-2"
                onClick={async () => {
                  const {
                    data: { user },
                  } = await supabase.auth.getUser();

                  const { error } = await supabase
                    .from("profiles")
                    .upsert({ ...formData, id: user.id });

                  if (!error) alert("Data berhasil disimpan!");
                }}
              >
                Simpan
              </button>

              <Link href="/pendaftaran" className="btn btn-primary">
                Lanjutkan Pendaftaran PTPS
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
