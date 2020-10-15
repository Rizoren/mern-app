import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'

export const CreateRecipePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [recipe, setRecipe] = useState({ name: '', complexity: '', stages: [], ingredients: [] })

    const submitHandler = async () => {
        console.log(recipe)
        try {
            await request(`/api/recipe`, 'POST', {recipe}, {Authorization: `Bearer ${auth.token}`})
            history.push(`/recipes`)
        } catch (e) {}
    }

    const handlerChange = event => {
        setRecipe({...recipe, [event.target.name]: event.target.value});
    };

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    return (
        <>
        <div className="row">
            <div className="col s8 offset-s2">
                <h1>Create recipe</h1>
                <div className="input-field">
                    <input
                        placeholder="Введите наименование рецепта"
                        type="text"
                        name="name"
                        id="name"
                        value={recipe.name}
                        onChange={handlerChange}
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
                        onChange={handlerChange}
                    />
                    <label htmlFor="name">Сложность рецепта</label>
                </div>
            </div>
        </div>
        <div className="row">
            <button className="btn yellow darken-4"
                    style={{marginRight: 10}}
                    onClick={submitHandler}
            >Создать</button>
            <button className="btn grey lighten-1 black-text"
                    onClick={() => history.push('/recipes')}
            >Отмена</button>
        </div>
        </>
    )
}