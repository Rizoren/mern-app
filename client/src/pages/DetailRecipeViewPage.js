import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory, useParams} from 'react-router-dom'

export const DetailRecipeViewPage = () => {
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [recipe, setRecipe] = useState({ name: '', complexity: '', stages: [], ingredients: [] })
    const recipeId = useParams().id

    const getRecipe = useCallback( async () => {
        try {
            const fetched = await request(`/api/recipe/${recipeId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setRecipe(fetched)
        } catch (e) {}
    }, [token, recipeId, request])

    useEffect(() => {
        getRecipe()
        window.M.updateTextFields()
    }, [getRecipe])

    return (
        <>
            <div className="row">
                <div className="col s8 offset-s2">
                    <h1>Detail recipe</h1>
                    <div className="input-field">
                        <input
                            placeholder="Введите наименование рецепта"
                            type="text"
                            name="name"
                            id="name"
                            value={recipe.name}
                            readOnly={true}
                        />
                        <label htmlFor="name">Наименование рецепта</label>
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Введите сложность рецепта 1-5"
                            type="number"
                            max="5" min="1"
                            name="complexity"
                            id="complexity"
                            value={recipe.complexity}
                            readOnly={true}
                        />
                        <label htmlFor="name">Сложность рецепта</label>
                    </div>
                    <h3>Ingredients</h3>
                    <table id="ingredients" className="highlight">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Наименование</th>
                            <th>Объем</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipe.ingredients.map((product, index) => {
                            return (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.product}</td>
                                    <td>{product.value}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <h3>Stages</h3>
                    <table id="ingredients" className="highlight">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Описание</th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipe.stages.map((stage) => {
                            return (
                                <tr key={stage.num}>
                                    <td>{stage.num}</td>
                                    <td>{stage.description}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row right">
                <button className="btn grey lighten-1 black-text"
                        onClick={() => history.push('/recommendations?b=1')}
                        disabled={loading}
                >Назад</button>
            </div>
        </>
    )
}