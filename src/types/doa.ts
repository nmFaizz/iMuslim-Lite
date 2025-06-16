export type AllDoaResponse = {
    status: boolean;
    data: Doa[];
}

export type SingleDoaResponse = {
    status: boolean;
    data: Doa;  
}

export type Doa = {
    arab: string;
    indo: string;
    judul: string;
    source: string;
    artinya: string;
};