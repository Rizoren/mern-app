import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {RecipesList} from "../components/RecipesList";

export const RecipesPage = () => {
    const [recipes, setRecipes] = useState([])
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchRecipes = useCallback(async () => {
       try {
           const fetched = await request('/api/recipe', 'GET', null, { Authorization: `Bearer ${token}` })
           setRecipes(fetched)
       } catch (e) {}
    }, [request, token])

    useEffect(() => {
        fetchRecipes()
    }, [fetchRecipes])

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            { !loading && recipes && <RecipesList recipes={recipes} /> }
        </div>
    )
}