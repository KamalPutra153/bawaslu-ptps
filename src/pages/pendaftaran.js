import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pendaftaran() {
  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [formData, setFormData] = useState({
    posisi: "",
    riwayatHidup: "",
    fileBerkas: null,
    setuju: false,
    pemilu: false,
    pilkada: false,
    nomorPendaftaran: "",
    tipeAnggota: "",
    namaLengkap: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    pendidikanTerakhir: "",
    Jurusan: "",
  });

  const kelurahanKarangasihList = [
    "Karangasih",
    "Cigugur",
    "Cimahi",
    "Citeureup",
    "Cipayung",
    "Cijambu",
    "Cigalontang",
    "Cijawura",
    "Cihanjuang",
    "Cipayung",
    "Citarik",
    "Cijangkar",
    "Cilame",
    "Cigondewah",
    "Cikijing",
    "Cimulang",
    "Citeureup",
  ];

  const next = () => setStep((prev) => Math.min(prev + 1, 5));
  const prev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data lengkap:", formData);
  };

  const handleFileChange = (e, index) => {
    const newFiles = { ...uploadedFiles, [index]: e.target.files[0] };
    setUploadedFiles(newFiles);
  };

  const handleRemoveFile = (index) => {
    const newFiles = { ...uploadedFiles };
    delete newFiles[index];
    setUploadedFiles(newFiles);
  };

  const handleUploadFile = (index) => {
    const file = uploadedFiles[index];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("File berhasil diupload!");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <section className="pendaftaran-section">
        <div className="container">
          <div className="mb-4 d-flex justify-content-between">
            {[
              "Memilih Posisi Pendaftaran",
              "Mengisi Riwayat Hidup",
              "Melengkapi Persyaratan",
              "Mengirim Data",
              "Selesai",
            ].map((label, index) => (
              <div key={index} className="wrapper text-center flex-fill">
                <div
                  className={`indikator d-flex align-items-center justify-content-center gap-2 rounded-pill p px-2 py-1 mb-1 ${
                    step > index + 1
                      ? "bg-success text-white fw-bold"
                      : step === index + 1
                      ? "bg-danger text-white fw-bold"
                      : "bg-light border"
                  }`}
                  style={{ fontSize: "0.8rem", transition: "0.3s" }}
                >
                  {step > index + 1 && (
                    <i className="fas fa-check-circle me-1"></i>
                  )}
                  {label}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mb-4">Pendaftaran PTPS - Langkah {step}/5</h3>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="card mb-3">
                  <div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        name="pilkada"
                        className="form-check-input"
                        checked={formData.pilkada}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label">
                        <h6>PANWASLU PILKADA 2024 TPS</h6>
                        <a>
                          input data calon pengawas TPS (PTPS) Untuk pemilihan
                          2024
                        </a>
                        <br />
                        <a>
                          Tanggal Pendaftaran : 31 Desember 2024 s/d 20 Februari
                          2025
                        </a>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        name="pemilu"
                        className="form-check-input"
                        checked={formData.pemilu}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label">
                        <h6>PANWASLU PEMILU 2024 TPS</h6>
                        <a>
                          input data calon pengawas TPS (PTPS) Untuk pemilu 2024
                        </a>
                        <br />
                        <a>
                          Tanggal Pendaftaran : 31 Desember 2024 s/d 20 Februari
                          2025
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="card mb-3">
                  <label className="form-label">Pilih Wilayah</label>
                  <p>Kelurahan / Desa *</p>
                  <div className="">
                    <div className="select-with-icon">
                      <select
                        className="form-control"
                        name="posisi"
                        value={formData.posisi || ""}
                        onChange={handleChange}
                      >
                        <option value="">-- Pilih Kelurahan / Desa --</option>
                        {kelurahanKarangasihList.map((prov) => (
                          <option key={prov} value={prov}>
                            {prov}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="card mb-3">
                  <h5 className="form-label fw-bold">Info Pendaftaran</h5>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">
                      Nomor Pendaftaran *
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="nomorPendaftaran"
                        value={formData.nomorPendaftaran}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">
                      Tipe Anggota *
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="tipeAnggota"
                        value={formData.tipeAnggota}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="card mb-3">
                  <h5 className="form-label fw-bold">Identitas</h5>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">
                      Nama Lengkap *
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="namaLengkap"
                        value={formData.namaLengkap}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">
                      Jenis Kelamin *
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="jenisKelamin"
                        value={formData.jenisKelamin}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">
                      Tempat Lahir *
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="tempatLahir"
                        value={formData.tempatLahir}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">
                      Tanggal Lahir *
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="tanggalLahir"
                        value={formData.tanggalLahir}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">
                      Pendidikan Terakhir *
                    </label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="pendidikanTerakhir"
                        value={formData.pendidikanTerakhir}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label className="col-md-3 col-form-label">Jurusan *</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="Jurusan"
                        value={formData.Jurusan}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="card p-3 mb-4">
                <h5 className="form-label mb-3">Unggah Dokumen Persyaratan</h5>

                {[
                  "Surat Lamaran Pendaftaran",
                  "Daftar Riwayat Hidup",
                  "Foto copy Kartu Tanda Penduduk (KTP) yang masih berlaku",
                  "Pas foto warna terbaru ukuran 4 x 6 sebanyak 3 (tiga) lembar",
                  "Foto copy ijazah pendidikan terakhir yang disahkan/dilegalisir oleh pejabat yang berwenang/fotocopy",
                  "Surat keterangan sehat dari rumah sakit pemerintah, termasuk puskesmas",
                  "Surat izin dari atasan langsung untuk mengikuti seleksi dan bekerja penuh waktu apabila terpilih bagi yang menjalin profesi lain",
                  "Surat pernyataan bermeterai Rp 10.000, sesuai juknis",
                ].map((label, index) => (
                  <div className="row align-items-center mb-3" key={index}>
                    <div className="col-md-6">
                      <label className="">{label}</label>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="file"
                        className="form-control"
                        name={`document_${index}`}
                        onChange={(e) => handleFileChange(e, index)}
                        required
                      />
                    </div>
                    <div className="col-md-2 d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveFile(index)}
                      >
                        ❌
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleUploadFile(index)}
                      >
                        <i className="bi bi-cloud-upload-fill"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 4 && (
              <>
                <div className="card mb-3">
                  <h5 className="form-label fw-bold">
                    PERNYATAAN PESETUJUAN TERHADAP SYARAT DAN KETENTUAN
                  </h5>
                  <div className="row mb-3">
                    <p className="col-form-label">
                      Pastikan data yang anda input dan lampiran dokumen
                      persyaratan sudah sesuai. Data yang sudah dikirim tidak
                      dapat diubah kembali.
                    </p>
                    <p>
                      Dengan mengirim data ini berarti anda patuh pada
                      persyaratan dan ketentuan dalam proses pendaftaran{" "}
                      <span className="fw-bold">
                        PANWASLU PILKADA 2024 TPS Karangasih.
                      </span>{" "}
                      Setiap pelanggaran dan / atau tindak kriminal yang terjadi
                      atas data-data yang anda kirim akan dikenakan sanksi
                      sesuai dengan undang-undang yang berlaku.
                    </p>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      name="setuju"
                      className="form-check-input"
                      checked={formData.setuju}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">
                      Saya menyatakan bahwa semua data dan dokumen yang dikirim
                      adalah data sebenarnya
                    </label>
                  </div>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className="alert alert-success">
                  <strong>Data berhasil diisi!</strong> Silakan kirim formulir.
                </div>
              </>
            )}

            <div className="d-flex justify-content-between">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prev}
                >
                  Kembali
                </button>
              )}
              {step < 5 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={next}
                >
                  Lanjut
                </button>
              ) : (
                <button type="submit" className="btn btn-success">
                  Kirim
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
