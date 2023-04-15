import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import apiClient from "../services/apiClient"

export const useGroupForm = ({user, setForm}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form] = useState({
    name: "", 
    subject:  "",
    isbn:  "",
    school:  "",
    description:  "",
    capacity:  "",
  });

  const handleOnInputChange = (event) => {
    // if (event.target.name === "email") {
    //   if (event.target.value.indexOf("@") === -1) {
    //     setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
    //   } else {
    //     setErrors((e) => ({ ...e, email: null }));
    //   }
    // }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
    try {
      const { data, error } = await apiClient.createNewGroup({
        name: form.name, 
        subject: form.subject,
        isbn: form.isbn,
        school: form.school,
        description: form.description,
        capacity: form.capacity,
      });

      if (data) {
        // Perform The  necessary actions with the data returned from the API -- ASK AARON
        
        navigate("/group/"); // Fetch the group -- ASK Aaron
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
