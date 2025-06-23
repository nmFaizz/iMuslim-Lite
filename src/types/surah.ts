export type AllSurahResponse = {
    code: number;
    message: string;
    data: Surah[];
}

export type SingleSurahResponse = {
    code: number;
    message: string;
    data: SurahDetail;
}

export type Surah = {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
        [key: string]: string;
    };
};

export type SurahDetail = {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
        [key: string]: string;
    };
    ayat: Ayat[];
    suratSelanjutnya: {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
    };
    suratSebelumnya: false | {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
    };
};

export type Ayat = {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: {
        [key: string]: string;
    };
}

export type SavedSurah = {
    id_user: string,
    id_surah: number,
    arab: string,
    description: string,
    indo: string,
    audio: string,
    latin: string,
}
