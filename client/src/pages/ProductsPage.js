import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ProductsList} from "../components/ProductsList";
import {useHistory} from "react-router-dom"

export const ProductsPage = () => {
    const history = useHistory()
    const [products, setProducts] = useState([])
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchProducts = useCallback(async () => {
       try {
           const fetched = await request('/api/product', 'GET', null, { Authorization: `Bearer ${token}` })
           setProducts(fetched)
       } catch (e) {}
    }, [request, token])

    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <div className="row">
                <button className="btn yellow darken-4"
                        style={{marginRight: 10}}
                        onClick={() => history.push('/new-product')}
                >Добавить</button>
            </div>
            { !loading && products && <ProductsList products={products} /> }
        </div>
    )
}