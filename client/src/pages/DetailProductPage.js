import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory, useParams} from 'react-router-dom'

export const DetailProductPage = () => {
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [product, setProduct] = useState({ name: '' })
    const productId = useParams().id

    const getProduct = useCallback( async () => {
        try {
            const fetched = await request(`/api/product/${productId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setProduct(fetched)
        } catch (e) {}
    }, [token, productId, request])

    useEffect(() => {
        getProduct()
    }, [getProduct])


    const handlerChange = event => {
        setProduct({...product, [event.target.name]: event.target.value});
    };

    const submitHandler = async () => {
        try {
            await request(`/api/product/${productId}`, 'POST', {product}, {Authorization: `Bearer ${token}`})
            history.push(`/products`)
        } catch (e) {}
    }

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    return (
        <>
            <div className="row">
                <div className="col s8 offset-s2">
                    <h1>Сведения о продукте</h1>
                    <div className="input-field">
                        <input
                            placeholder="Введите наименование продукта"
                            type="text"
                            name="name"
                            id="name"
                            value={product.name}
                            onChange={handlerChange}
                        />
                        <label htmlFor="name">Наименование продукта</label>
                    </div>
                </div>
            </div>
            <div className="row right">
                <button className="btn yellow darken-4"
                        style={{marginRight: 10}}
                        onClick={submitHandler}
                        disabled={loading}
                >Сохранить</button>
                <button className="btn grey lighten-1 black-text"
                        onClick={() => history.push('/products')}
                        disabled={loading}
                >Отмена</button>

            </div>
        </>
    )
}