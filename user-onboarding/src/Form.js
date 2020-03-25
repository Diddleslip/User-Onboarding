import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { axios } from "axios";

export default function Form() {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState, 
            [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked :
            e.target.value
        };
        setFormState(newFormData);
    }

    return (
        <div>
            <form>
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
                <label htmlfor="terms">
                Terms of Service:
                    <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        value={formState.terms}
                        onChange= {inputChange}
                    />
                </label><br/>
                <button>Submit</button>
            </form>
        </div>
        )
}