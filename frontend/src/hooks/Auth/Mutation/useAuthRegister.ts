import AuthServices from "@/services/auth.service"
import { RegisterFormData } from "@/validation/Auth/Auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

export const useAuthRegister = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['REGISTER'],
        mutationFn: (body: RegisterFormData)=>{
            const payload = {
                email: body.email,
                name: body.name,
                password: body.password,
                phone: body.phone
            }
            return AuthServices.register(payload)
        },
        onSuccess: (data: any)=>{
            toast.success(data.message)
            navigate('/login')
        },
        onError: (error: any)=>{
            toast.error(`${error.response.data.message}`)
        }
    })
}