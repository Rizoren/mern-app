import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreateProductPage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [name, setName] = useState('')

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                await request('/api/product', 'POST', {name},
                    {Authorization: `Bearer ${auth.token}`})
                history.push(`/products`)
            } catch (e) {}
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h1>Сведения о продукте</h1>
                <div className="input-field">
                    <input
                        placeholder="Введите наименование продукта"
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="name">Наименование продукта</label>
                </div>
            </div>
        </div>
    )
}