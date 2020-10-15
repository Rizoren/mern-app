import React, {useCallback, useContext, useState, useEffect} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {RecipesList} from "../components/RecipesList";
import {useLocation} from 'react-router-dom'

export const RecommendationsPage = () => {
    const {request, loading} = useHttp()
    const {token, userId} = useContext(AuthContext)
    const [recommendations, setRecommendations] = useState([])
    const back = new URLSearchParams(useLocation().search).get('b');

    const getRecommendations = useCallback(async () => {
       try {
           const fetched = await request(`/api/recipe/${userId}/recommendations`, 'GET', null, { Authorization: `Bearer ${token}` })
           setRecommendations(fetched)
       } catch (e) {}
    }, [request, token, userId])

    useEffect(() => {
        if (back) {
            getRecommendations()
        }
    },[back, getRecommendations])

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <div className="row center" style={{padding: "30px"}}>
                    <button className="btn yellow darken-4 center" style={{margin: "auto"}}
                            onClick={getRecommendations}>Посоветуй!</button>
            </div>
            { loading && !recommendations &&
                <div className="row">
                    <p className="center">Данных нет</p>
                </div>
            }
            { !loading && recommendations && <RecipesList recipes={recommendations} readOnly={true} /> }
        </div>
    )
}