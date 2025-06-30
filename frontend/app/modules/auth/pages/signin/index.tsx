import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import type { AuthInputType, ResponseType } from "../../utils/validators/types";
import { emailValidator } from "../../utils/validators/email_validator";
import { passwordValidator } from "../../utils/validators/password_validator";
import Loader from "~/shared/ui/louder";
import api from '~/shared/api/client';
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth";
import GuestGuard from "../../hooks/guest_guard";

function Signin() {

    const [email, setEmail] = useState<AuthInputType>({
        value: '',
        status: 'idle',
        error: ''
    });

    const [password, setPassword] = useState<AuthInputType>({
        value: '',
        status: 'idle',
        error: ''
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const {login} = useAuth();

    const updateField = (
        setter: React.Dispatch<React.SetStateAction<AuthInputType>>,
        value: string,
        status: AuthInputType['status'],
        error: string = ''
    ) => {
        setter({ value, status, error });
    };

    const handleValidation = (
        setter: React.Dispatch<React.SetStateAction<AuthInputType>>,
        validator: (val: string) => ResponseType,
        value: string
    ) => {
        const validation = validator(value);
        
        if(!validation.isValid) {
            updateField(setter, value, 'error', validation.error);
            return;
        }
        
        updateField(setter, value, 'valid');
        return true;
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleValidation(setEmail, emailValidator, value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleValidation (setPassword, passwordValidator, value );
    }

    const isFormValid = () =>
        email.status === 'valid' && password.status === 'valid';

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        setIsLoading(true);

        api.post(
            '/auth/signin', {
                email: email.value,
                password: password.value
            }            
        )
        .then(res => {
            login({
                user: res.data.user.email,
                token: res.data.token
            })
            toast.success(res.message);
        })
        .catch(rej => {
            toast.error(rej.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
    }

    if(isLoading) 
        return <Loader/>

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-5">
                    <div className="mb-8">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                        <div className="mt-2 d-flex">
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                autoComplete="email" 
                                value={email.value}
                                required 
                                className={
                                    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    + (email.status === 'error' ? ' border-red-500 outline-red-500 focus:outline-red-600' : '')
                                } 
                                onChange={handleEmailInput}
                            />
                            {email.status === 'error' && <span className="text-xs text-red-600"> {email.error} </span>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input 
                                type="password" 
                                name="password" 
                                id="password1" 
                                required 
                                value={password.value}
                                className={
                                    "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    + (password.status === 'error' ? ' border-red-500 outline-red-500 focus:outline-red-600' : '')
                                } 
                                onChange={handlePasswordInput}
                            />
                            {password.status === 'error' && <span className="text-xs text-red-600"> {password.error} </span>}
                        </div>
                    </div>

                    <div>
                        <button onClick={handleSubmit} disabled={!isFormValid()} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    I don't have an account: 
                    <Link to="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

function SigninPage() {
  return (
    <GuestGuard>
      <Signin />
    </GuestGuard>
  );
}

export default SigninPage;