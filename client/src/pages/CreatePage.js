import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link},
                    {Authorization: `Bearer ${auth.token}`})
                history.push(`/detail/${data.link._id}`)
            } catch (e) {}
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h1>Создать ссылку</h1>
                <div className="input-field">
                    <input
                        placeholder="Введите ссылку"
                        type="text"
                        name="link"
                        id="link"
                        value={link}
                        onChange={event => setLink(event.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Ссылка</label>
                </div>
            </div>
        </div>
    )
}