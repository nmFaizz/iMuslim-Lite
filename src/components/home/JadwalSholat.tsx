"use client";
import Container from '@/layouts/Container';
import useTime from '@/hooks/useTime';


export default function JadwalSholat() {
  const { time } = useTime();

  return (
    <div className='my-6 md:my-8'>
        <div className='flex justify-center'>
            <Container className='w-max'>
                <p></p>
                <p className='text-4xl'>{time} WIB</p>
            </Container>
        </div>
    </div>
  );
}
