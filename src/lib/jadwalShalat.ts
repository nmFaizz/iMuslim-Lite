import { JadwalShalat } from "@/types/jadwal";

export function getCurrentPrayer(jadwal: JadwalShalat['jadwal'], currentTime: string) {
    if (!jadwal) return null;
    
    const timeToMinutes = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const currentMinutes = timeToMinutes(currentTime);
    
    const prayers = [
        { name: 'IMSAK', time: jadwal.imsak, key: 'imsak' },
        { name: 'SUBUH', time: jadwal.subuh, key: 'subuh' },
        { name: 'DZUHUR', time: jadwal.dzuhur, key: 'dzuhur' },
        { name: 'ASHAR', time: jadwal.ashar, key: 'ashar' },
        { name: 'MAGHRIB', time: jadwal.maghrib, key: 'maghrib' },
        { name: 'ISYA', time: jadwal.isya, key: 'isya' }
    ];

    for (let i = prayers.length - 1; i >= 0; i--) {
        const prayerMinutes = timeToMinutes(prayers[i].time);
        if (currentMinutes >= prayerMinutes) {
            return {
                current: prayers[i],
                next: prayers[(i + 1) % prayers.length]
            };
        }
    }
    
    return {
        current: prayers[prayers.length - 1],
        next: prayers[0] 
    };
}

export function getTimeUntilNext(nextPrayerTime: string, currentTime: string) {
    const timeToMinutes = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const currentMinutes = timeToMinutes(currentTime);
    let nextMinutes = timeToMinutes(nextPrayerTime);

    if (nextMinutes <= currentMinutes) {
        nextMinutes += 24 * 60; 
    }
    
    const diffMinutes = nextMinutes - currentMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return { hours, minutes };
}
