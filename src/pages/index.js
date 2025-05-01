import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="home-section">
        <div className="row">
          <div className="col-6 container py-5">
            <h1 className="mb-4">Selamat Datang di Portal Pendaftaran PTPS</h1>
            <p className="lead">
              Daftarkan diri anda sebagai Pengawas TPS untuk pemilu mendatang.
            </p>
            <a href="/login" className="btn btn-primary m-3">
              PTPS
            </a>
            <a href="#" className="btn btn-secondary m-3">
              ADMIN
            </a>
          </div>
          <div className="col-6 text-center ">
            <Image
              src="/assets/img/maskotbawaslu-removebg.png"
              alt=""
              width={500}
              height={250}
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
