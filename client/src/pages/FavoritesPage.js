import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import Select from "react-select";
import {FavoritesList} from "../components/FavoritesList";

export const FavoritesPage = () => {
    const rels = [{ value: 1, label: 'Нравится' }, { value: -1, label: 'Не нравится'}]
    const {request, loading} = useHttp()
    const {token, userId} = useContext(AuthContext)
    const [favorites, setFavorites] = useState(null)
    const [newFavorite, setNewFavorite] = useState({ product: '', relationship: '', owner: userId })
    const [products, setProducts] = useState([])

    const fetchProducts = useCallback(async () => {
       try {
           const fetched = await request(`/api/product`, 'GET', null, { Authorization: `Bearer ${token}` })
           setProducts(fetched)
       } catch (e) {}
    }, [request, token])

    const getFavorites = useCallback( async () => {
        try {
            const fetched = await request(`/api/favorite/${userId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setFavorites(fetched)
        } catch (e) {}
    }, [token, userId, request])

    useEffect(() => {
        fetchProducts()
        getFavorites()
    }, [fetchProducts, getFavorites])

    const handlerAdd = async () => {
        if (!newFavorite.product || !newFavorite.relationship) return;
        try {
            const fetched = await request(`/api/favorite/${userId}`, 'POST', {newFavorite}, {Authorization: `Bearer ${token}`})
            setFavorites(prevState => ([...prevState, fetched]))
        } catch (e) {}
    }

    const handlerDelete = async (favId) => {
        try {
            await request(`/api/favorite/${userId}/${favId}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
            setFavorites(favorites.filter(f => f._id !== favId))
        } catch (e) {}
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <div className="row">
                <div className="input-field col s6">
                    <Select name="product" options={products.map(t => { return { value: t._id, label: t.name} }) }
                            onChange={e => setNewFavorite({...newFavorite, product: e.value})}
                    />
                </div>
                <div className="input-field col s3">
                    <Select name="relationship" options={rels}
                            onChange={e => setNewFavorite({...newFavorite, relationship: e.value})}
                    />
                </div>
                <div className="col s3" style={{padding: "30px"}}>
                    <button className="btn yellow darken-4" style={{margin: "auto"}}
                            onClick={handlerAdd}>Добавить</button>
                </div>
            </div>
            { loading && !favorites &&
                <div className="row">
                    <p className="center">Данных нет</p>
                </div>
            }
            { !loading && favorites
                && <FavoritesList products={favorites} type={1}
                                  nameBlock={rels.filter(r => r.value === 1)[0].label}
                                  handlerDelete={handlerDelete}
            /> }
            { !loading && favorites
                && <FavoritesList products={favorites} type={-1}
                                  nameBlock={rels.filter(r => r.value === -1)[0].label}
                                  handlerDelete={handlerDelete}
            /> }
        </div>
    )
}