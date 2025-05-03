// pages/admin-dashboard.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin-login");
    } else {
      fetchProfiles();
    }
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (data) setData(data);
  };

  const downloadCSV = () => {
    const headers = Object.keys(data[0] || {});
    const csv = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((field) => `"${row[field] ?? ""}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data_profiles.csv";
    a.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin-login");
  };

  return (
    <>
      <Navbar />
      <section className="admin-dashboard">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Dashboard Admin</h3>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <button className="btn btn-success mb-3" onClick={downloadCSV}>
            Unduh Data CSV
          </button>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {data[0] &&
                    Object.keys(data[0])
                      .filter(
                        (key) =>
                          ![
                            "id",
                            "created_at",
                            "updated_at",
                            "jenis_identitas",
                          ].includes(key)
                      )
                      .map((key) => <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    {Object.keys(row)
                      .filter(
                        (key) =>
                          ![
                            "id",
                            "created_at",
                            "updated_at",
                            "jenis_identitas",
                          ].includes(key)
                      )
                      .map((key) => (
                        <td key={key}>{row[key]}</td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
