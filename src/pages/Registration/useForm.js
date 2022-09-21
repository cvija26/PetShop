import { useState, useEffect } from "react";
import * as api from "../../api/api";
import { ApiConfig } from "../../config/ApiConfig";

const useForm = (callback, validate) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        password2: ''
    })

    const [userId, setUserId] = useState();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value

        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            password: values.password,
            email: values.email,
            contact: values.phone,
            address: values.address,
            role: 'USER'
        }

        // async function uploadPhoto(file){

        //     await api.apiFile("api/add/photo/userId/" + userId, "file", file).then(res => {
        
        //         console.log(res);
                
        //         if(res.status ==="error" || res.status === "login"){
        
        //             setMessage(message, {
        //                 photo: "Došlo je do greške prilikom dodavanja fotografije, pokušajte je dodati naknadno u slučaju da je ljubimac uspješno dodat.."
        //             })
        //             return;
        //         }
        
        //         setMessage(Object.assign(message, {
        //             photo: "Fotografija je uspješno dodata.."
        //         }))
        //     }).catch(err => {
        //         console.log(err);
        //     });
        
        // }
        
        // async function pickPhoto(){
        
        //     const filePicker = document.getElementById('image');
        
        //     if (filePicker?.files.length === 0) {
        //         setMessage(Object.assign(message, {
        //             photo: "Izaberite sliku za upload.."
        //         }));
        
        //     return;
        //     }
        
        
        
        //     await uploadPhoto(files[0]);
        
        
        //     // this.getPhotos();
        //     }

        await api.api("api/user/registration", 'post', body ).then(res => {
            console.log(res.data);
            setUserId(res.data.userId);
        })
    
        setErrors(validate(values));
        setIsSubmitting(true)

        // pickPhoto();
    }
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            callback()
        }    
    },[errors])
    




    return {handleChange, values, handleSubmit, errors, 
        // pickPhoto, uploadPhoto 
    }
}



export default useForm