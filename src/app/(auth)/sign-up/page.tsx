"use client";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { 
    FormProvider, 
    SubmitHandler, 
    useForm 
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/layouts/MainLayout";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type SignUpFormValues = {
    username: string;
    email: string;
    password: string;
}

export default function SignUpPage() {
    const methods = useForm<SignUpFormValues>({
        mode: 'onBlur',
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })
    const { handleSubmit } = methods;
    
    const router = useRouter();

    const { isPending, mutate } = useMutation<void, Error, SignUpFormValues>({
        mutationFn: async (data: SignUpFormValues) => {
            const { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
            });

            if (error) {
                throw new Error(error.message);
            }
        },
        onError: (error) => {
            toast.success(error.message);
        },
        onSuccess: () => {
            toast('Sign Up berhasil');
            router.push('/login');
        }
    })

    const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
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
                        Sign Up
                    </h1>
                    <p className='mt-2 text-muted-foreground'>Sign Up untuk membuat akun baru</p>
                </div>
                
                <FormProvider {...methods}>
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className='space-y-5'
                    >
                        <Input 
                            id='username'
                            type='text'
                            label='Username'
                            placeholder='cth: johndoe_'
                            validation={{
                                required: 'Username wajib diisi',
                                minLength: {
                                    value: 3,
                                    message: 'Username minimal 3 karakter'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Username maksimal 20 karakter'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: 'Username hanya boleh huruf, angka, dan underscore'
                                }
                            }}
                        />
                        <Input 
                            id='email'
                            type='email'
                            label='Email'
                            placeholder='cth: example@gmail.com'
                            validation={{
                                required: 'Email wajib diisi',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Alamat email tidak valid'
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
                                    message: 'Password minimal 6 karakter'
                                }
                            }}
                        />

                        <Button 
                            type='submit' 
                            className='w-full mt-5'
                        >
                            Sign Up
                            {isPending && (
                                <Loader2Icon className='animate-spin' />
                            )}
                        </Button>

                        <div>
                            <p className='text-center text-sm text-muted-foreground'>
                                Sudah Punya Akun?
                                <Link href="/sign-up" className='ml-1 text-primary underline'>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </MainLayout>
    )
}