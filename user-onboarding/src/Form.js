import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Must include an email"),
    password: yup.string().required("Password is required"),
    terms: yup.boolean().oneOf([true], "Must sell your soul to continue")
});

export default function Form() {

    const [buttonDisabled, setButtonDisabled] = useState (true);
    const [post, setPost] = useState([]);

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState])



    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState, 
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked :
            e.target.value
        };
        setFormState(newFormData);
        validateChange(e)
    }

    const formSubmit = e => {
        e.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setPost(res.data);
            console.log("success", post);
    
            setFormState({
              name: "",
              email: "",
              password: "",
              terms: "",
            });
          })
          .catch(err => {
            console.log(err.res);
          });
      };

    const validateChange = e => {
        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors
            })
        })
    }

    return (
        <div>
            <h2>Sign Up Registration</h2>
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                Name:
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange= {inputChange}
                    />
                </label><br/>
                <label htmlFor="email">
                Email:
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange= {inputChange}
                    />
                </label><br/>
                <label htmlFor="password">
                Password:
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formState.password}
                        onChange= {inputChange}
                    />
                </label><br/>
                <label htmlFor="terms">
                Terms of Service:
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        checked={formState.terms}
                        onChange= {inputChange}
                    />
                </label><br/>
                <pre>{JSON.stringify(post, null, 2)}</pre>
                <button disabled={buttonDisabled}>Submit</button>
            </form>
        </div>
        )
}