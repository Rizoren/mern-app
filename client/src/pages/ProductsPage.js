import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {ProductsList} from "../components/ProductsList";

export const ProductsPage = () => {
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
            { !loading && products && <ProductsList products={products} /> }
        </div>
    )
}