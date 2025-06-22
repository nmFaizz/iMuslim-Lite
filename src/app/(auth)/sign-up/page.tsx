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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import apiMuslim from "@/lib/apiMuslim";
import { Kota, PilihKotaResponse } from "@/types/jadwal";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";

type SignUpFormValues = {
    username: string;
    email: string;
    password: string;
    kota: string;
}

export default function SignUpPage() {
    const [selectedKota, setSelectedKota] = useState<string>('1632');

    const methods = useForm<SignUpFormValues>({
        mode: 'onBlur',
        defaultValues: {
            username: '',
            email: '',
            password: '',
            kota: "",
        }
    })
    const { handleSubmit, control } = methods;
    
    const router = useRouter();

    const { isPending, mutate } = useMutation<void, Error, SignUpFormValues>({
        mutationFn: async (data: SignUpFormValues) => {
            const { data: authRes, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        username: data.username,
                        kota: data.kota,
                    },
                },
            })

            if (error) {
                toast.error("SignUp Error: " + error.message);
                return;
            }

            const user = authRes.user;

            const { error: insertError } = await supabase
                .from('user')
                .insert([
                    {
                        id: user?.id,             
                        email: data.email,
                        username: data.username,
                        password: data.password,
                        kota_id: data.kota,
                    },
                ]);

            if (insertError) {
                toast.error("Failed to retrieve user data");
                return
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

    const { data: pilihanKota, isLoading: isPilihanLoading } = useQuery<Kota[]>({
        queryKey: ['pilihan-kota'],
        queryFn: async () => {
            const res = await apiMuslim.get<PilihKotaResponse>('/sholat/kota/semua');
            return res.data.data;
        },
        refetchInterval: 60000,
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

                        <FormField 
                            control={control}
                            name='kota'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pilih Kota</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih kota" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Pilih Kota</SelectLabel>
                                                {pilihanKota?.map((kota) => (
                                                    <SelectItem 
                                                        key={kota.id} 
                                                        value={kota.id}
                                                    >
                                                        {kota.lokasi}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
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