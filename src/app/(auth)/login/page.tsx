"use client";
import Link from 'next/link';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';

import MainLayout from '@/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

type LoginFormValues = {
    email: string;
    password: string;
}

export default function LoginPage() {
    const methods = useForm<LoginFormValues>({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const { handleSubmit } = methods;
    
    const router = useRouter();

    const { isPending, mutate } = useMutation<void, Error, LoginFormValues>({
        mutationFn: async (data: LoginFormValues) => {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            });

            if (error) {
                throw new Error(error.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success('Login berhasil');
            router.push('/');
        }
    })

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        mutate(data);
    }

    return (
        <MainLayout 
            withNavbar 
            containerSize='720'
        >
            <div className='py-24'>
                <div className='mb-12'>
                    <h1 className='md:text-3xl font-semibold'>
                        Login
                    </h1>
                    <p className='mt-2 text-muted-foreground'>Login untuk melanjutkan</p>
                </div>
                
                <FormProvider {...methods}>
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className='space-y-5'
                    >
                        <Input 
                            id='email'
                            type='email'
                            label='Email'
                            placeholder='cth: example@gmail.com'
                            validation={{
                                required: 'Email wajib diisi',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address'
                                }
                            }}
                        />
                        <Input 
                            id='password'
                            type='password'
                            label='Password'
                            placeholder='Masukkan password Anda'
                            validation={{
                                required: 'Password wajib diisi',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            }}
                        />

                        <Button 
                            type='submit' 
                            className='w-full mt-5'
                        >
                            Login
                            {isPending && (
                                <Loader2Icon className='animate-spin' />
                            )}
                        </Button>

                        <div>
                            <p className='text-center text-sm text-muted-foreground'>
                                Belum Punya Akun?
                                <Link href="/sign-up" className='ml-1 text-primary underline'>
                                    SignUp
                                </Link>
                            </p>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </MainLayout>
    )
}