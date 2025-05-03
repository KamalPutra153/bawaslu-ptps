import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <section className="kontak-section">
        <div className="container mt-5 mb-5">
          {/* <h2 className="mb-4">Tentang Bawaslu</h2>
          <p>
            Badan Pengawas Pemilihan Umum (Bawaslu) adalah lembaga yang bertugas
            mengawasi seluruh tahapan penyelenggaraan pemilihan umum di
            Indonesia. Bawaslu berwenang menangani pelanggaran pemilu,
            menyelesaikan sengketa proses pemilu, serta memastikan jalannya
            pemilu yang jujur, adil, dan demokratis.
          </p>
          <p>
            Dalam pelaksanaan tugasnya, Bawaslu bekerja sama dengan berbagai
            pihak dan membuka partisipasi masyarakat dalam pengawasan pemilu,
            termasuk melalui program perekrutan Pengawas Tempat Pemungutan Suara
            (PTPS).
          </p> */}

          <h3 className="mt-5">Hubungi Kontak Kami</h3>
          <ul className="list-unstyled">
            <ul className="list-unstyled">
              <li>
                <strong>Alamat:</strong> Jalan Tegar Beriman 38, Kelurahan
                Tengah, Kecamatan Cibinong, Kabupaten Bogor, Jawa Barat 16914
              </li>
              <li>
                <strong>Email:</strong> info@bawaslu.go.id
              </li>
              <li>
                <strong>Telepon:</strong> (021) 123-4567
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.bawaslu.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.bawaslu.go.id
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
