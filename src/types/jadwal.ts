export type JadwalShalatResponse = {
    status: boolean;
    data: JadwalShalat[];
}

export type JadwalShalatBulananResponse = {
    status: boolean;
    data: JadwalShalatBulanan;
}

export type PilihKotaResponse = {
    status: boolean;
    data: Kota[]
}

export type Kota = {
    id: string;
    lokasi: string;
}

export type JadwalShalat = {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: {
        tanggal: string;
        imsak: string;
        subuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashar: string;
        maghrib: string;
        isya: string;
        date: string;
    };
}

export type JadwalShalatBulanan = {
    id: number;
    lokasi: string;
    daerah: string;
    jadwal: {
        tanggal: string;
        imsak: string;
        subuh: string;
        terbit: string;
        dhuha: string;
        dzuhur: string;
        ashar: string;
        maghrib: string;
        isya: string;
        date: string;
    }[];
}