import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Image
          src="/assets/img/Logo_Bawaslu.png"
          alt="Deskripsi gambar"
          width={200}
          height={50}
          style={{ height: "auto" }}
          priority
        />

        <div className="collapse navbar-collapse ms-5">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Beranda
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/pendaftaran">
                Daftar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/kontak">
                Hubungi Kami
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
