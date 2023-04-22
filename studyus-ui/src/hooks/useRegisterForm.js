import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ApiClient from "../services/ApiClient"

export const useRegisterForm = ({ user, setUser}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
      email: "",
      name:"",
      password: "",
      passwordConfirm: "",
    });

    useEffect(() => {
        if (user?.email) {
          navigate("/dashboard")
        }
      }, [user, navigate])
  
    const handleOnInputChange = (event) => {
      if (event.target.name === "password") {
        if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
          setErrors((e) => ({
            ...e,
            passwordConfirm: "Passwords do not match",
          }));
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }));
        }
      }
      if (event.target.name === "passwordConfirm") {
        if (form.password && form.password !== event.target.value) {
          setErrors((e) => ({
            ...e,
            passwordConfirm: "Passwords do not match",
          }));
        } else {
          setErrors((e) => ({ ...e, passwordConfirm: null }));
        }
      }


      if (event.target.name === "email") {
        if (!event.target.value.endsWith(".edu")) {
          setErrors((e) => ({ ...e, email: "Please enter a valid email ending with .edu" }));
        } else {
          setErrors((e) => ({ ...e, email: null }));
        }
      }
  
      setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    };
  
    const handleOnSubmit = async () => {
      setIsLoading(true);
      setErrors((e) => ({ ...e, form: null }));
      console.log("Handle on submit running!")
      

      if (form.passwordConfirm !== form.password) {
        setErrors((e) => ({ ...e, form: "Passwords do not match." }));
        setIsLoading(false);
        return;
      } else {
        setErrors((e) => ({ ...e, form: null }));
      }
      if (form.password == "" || form.passwordConfirm == "") {
        setErrors((e) => ({ ...e, form: "Please enter a password in both fields." }));
        setIsLoading(false);
        return;
      } else {
        setErrors((e) => ({ ...e, form: null }));
      }

      if (form.name == "") {
        setErrors((e) => ({ ...e, form: "Please enter a name." }));
        setIsLoading(false);
        return;
      } else {
        setErrors((e) => ({ ...e, form: null }));
      }
  
      const { data, error } = await ApiClient.signup({
        email: form.email,
        name: form.name,
        password: form.password,
      });
      if (data) {
        setUser(data.user);
        ApiClient.setToken(data.token);
        navigate('/dashboard')
      }
      if (error) {
        setErrors((e) => ({ ...e, form: error }));
      }
      setIsLoading(false);
    };

    return {
        form, 
        errors, 
        isLoading, 
        handleOnInputChange, 
        handleOnSubmit
    }
}