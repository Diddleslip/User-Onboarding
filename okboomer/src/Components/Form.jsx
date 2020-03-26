import React, { useEffect, useState} from 'react';
import * as Yup from "yup";
import axios from "axios";

const formSchema = Yup.object().shape ({
    name: Yup.string().required("What's your name?"),
    email: Yup.string().email("What's your email?"),
    password: Yup.string().required("Insert password here"),
    terms: Yup.boolean().oneOf([true], "Please agree to sell your soul!")
})

export default function Form() {

    const [buttonDisable, setButtonDisabled] = useState(true);
    const [post, setPost] = useState([]);

    const formSubmit = event => {
        event.preventDefault();
        axios
            .post("https://reqres.in/api/users", formData)
            .then(response => {
                setPost(response.data);
            })
            .catch(err => {
                console.log(err.response);
            })
            setFormData({
                name: "",
                email: "",
                password: "",
                terms: ""
            })
    }

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    useEffect(() => {
        formSchema.isValid(formData).then((valid) => {
            setButtonDisabled(!valid);
        })
    }, [formData])

    const inputChange = event => {
        event.persist();

        const newChange = {
            ...formData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.yomama : event.target.value
        }
        validateChange(event);
        setFormData(newChange);
    }

    const validateChange = event => {
        Yup
        .reach(formSchema, event.target.name)
        .validate(event.target.value)
        .then(() => {
            setErrors({
                ...errors,
                [event.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors,
                [event.target.name]: err.errors
            })
        })
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <label>
                    Name: 
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={inputChange}
                    />
                </label><br/>

                <label>
                    Email: 
                    <input
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={inputChange}
                    />
                </label><br/>

                <label htmlFor="password">
                    Password: 
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={inputChange}
                    />
                </label><br/>

                <label htmlFor="terms">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox" 
                        yomama={formData.terms}
                        onChange={inputChange}
                    />
                    Click to sell your soul
                </label><br/>
                <pre>{JSON.stringify(post, null, 2)}</pre>

                <button disabled={buttonDisable}>Submit</button>
            </form>
        </div>
    )
}