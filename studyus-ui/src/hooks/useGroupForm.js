import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import ApiClient from "../services/ApiClient"

export const useGroupForm = ({user}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "", 
    subject:  "",
    isbn:  "",
    school:  "",
    description:  "",
    capacity:  "",
  });

  const handleOnInputChange = (event) => {
    const { name, value } = event.target;
    let error = '';
  
    // Validate if isbn is a valid decimal number
    if (name === 'isbn' && !Number.isNaN(Number(value)) && !Number.isInteger(Number(value))) {
      error = 'ISBN must be a decimal number';
    }
  
    // Validate if capacity is a valid decimal number
    if (name === 'capacity' && !Number.isNaN(Number(value)) && !Number.isInteger(Number(value))) {
      error = 'Capacity must be a decimal number';
    }
  
    setForm((f) => ({ ...f, [name]: value }));
    
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
    try {
      const { data, error } = await ApiClient.createNewGroup({
        name: form.name, 
        subject: form.subject,
        isbn: form.isbn,
        school: form.school,
        description: form.description,
        capacity: form.capacity,
      });

      if (error){
        setErrors((e) => ({ ...e, [name]: error }));
      }
      else{
        navigate("/dashboard");
      }  

      if (error) {
        setErrors((e) => ({ ...e, form: error }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };
    
  return {
    form, 
    errors, 
    isLoading, 
    handleOnInputChange, 
    handleOnSubmit
  }
}
