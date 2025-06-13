'use client';
// kerjain disini buat doa page, jadi di response api ntar
// hasilnya di map return 
// pake endpoint '/v2/doa/sumber/<nama-sumber>'
// dapetin list nama sumber nya dari endpoint '/v2/doa/sumber' 
// nanti di page nya ada dropdown buat pilih sumber doa
// list sumbernya ada 'quran, hadist, haji, harian, pilihan, ibadah, lainnya'
// fokus integrasi apinya dlu, UI nya belakangan

// src/pages/DoaPage.tsx

import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Doa } from "@/types/doa";
import { fetchDoaBySumber, fetchSumberList } from "@/services/doa";
import MainLayout from "@/layouts/MainLayout";

const DoaPage: React.FC = () => {
  const [selectedSumber, setSelectedSumber] = useState<string>("quran");

  const {
    data: sumberList = [],
    isLoading: loadingSumber,
    error: errorSumber,
  } = useQuery({
    queryKey: ["sumber-list"],
    queryFn: fetchSumberList,
  });

  const {
    data: doaList = [],
    isLoading: loadingDoa,
    error: errorDoa,
  } = useQuery({
    queryKey: ["doa", selectedSumber],
    queryFn: () => fetchDoaBySumber(selectedSumber),
    enabled: !!selectedSumber, // hanya fetch kalau sudah ada pilihan
  });

  return (
    <div>
      <h1>Doa Berdasarkan Sumber</h1>

      {/* Dropdown untuk pilih sumber */}
      {loadingSumber ? (
        <p>Memuat daftar sumber...</p>
      ) : errorSumber ? (
        <p>Gagal memuat sumber</p>
      ) : (
        <select
          value={selectedSumber}
          onChange={(e) => setSelectedSumber(e.target.value)}
        >
          {sumberList.map((sumber) => (
            <option key={sumber} value={sumber}>
              {sumber.toUpperCase()}
            </option>
          ))}
        </select>
      )}

      {/* Tampilkan list doa */}
      {loadingDoa ? (
        <p>Memuat doa...</p>
      ) : errorDoa ? (
        <p>Gagal memuat doa</p>
      ) : (
        <ul>
          {doaList.map((item) => (
            <li key={item.id}>
              <h3>{item.doa}</h3>
              <p>{item.ayat}</p>
              <p><i>{item.latin}</i></p>
              <p><b>{item.artinya}</b></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoaPage;
