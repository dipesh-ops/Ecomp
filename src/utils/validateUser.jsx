import { toast } from "react-toastify";

export const validateUser = (email, password) =>{
    const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isEmailValid) return toast.error('Email is not valid');
    if(!isPasswordValid) return toast.error('Password is not valid');
}