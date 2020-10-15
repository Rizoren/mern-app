import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory, useParams} from 'react-router-dom'
import Select from 'react-select'

export const DetailRecipePage = () => {
    const history = useHistory()
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [recipe, setRecipe] = useState({ name: '', complexity: '', stages: [], ingredients: [] })
    const [product, setProduct] = useState([])
    // eslint-disable-next-line
    const [modals, setModals] = useState()
    const recipeId = useParams().id

    const getRecipe = useCallback( async () => {
        try {
            const fetched = await request(`/api/recipe/${recipeId}`, 'GET', null, {Authorization: `Bearer ${token}`})
            setRecipe(fetched)
        } catch (e) {}
    }, [token, recipeId, request])

    const getProductList = useCallback( async () => {
        try {
            const fetched = await request(`/api/product`, 'GET', null, {Authorization: `Bearer ${token}`})
            setProduct(fetched)
        } catch (e) {}
    }, [token, request])

    useEffect(() => {
        getProductList()
        getRecipe()
    }, [getProductList, getRecipe])


    const handlerChange = event => {
        setRecipe({...recipe, [event.target.name]: event.target.value});
    };

    const submitHandler = async () => {
        try {
            await request(`/api/recipe/${recipeId}`, 'POST', {recipe}, {Authorization: `Bearer ${token}`})
            history.push(`/recipes`)
        } catch (e) {}
    }

    useEffect(() => {
        window.M.updateTextFields()
        const el = document.querySelectorAll('.modal')
        setModals(window.M.Modal.init(el, {}))
    },[setModals])

    // TODO: Необходимо реализовать передачу текущей записи в модальное окно
    // TODO: Выделить модальное окно в отдельный компонент (для начала на каждую таблицу свое)

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
                    <h3>Ingredients</h3>
                    <table id="ingredients" className="highlight">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Наименование</th>
                            <th>Объем</th>
                            <th>
                                <button className="btn yellow darken-4"
                                        onClick={() => history.push('/new-product')}>Добавить</button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipe.ingredients.map((product, index) => {
                            return (
                                <tr key={product._id}>
                                    <td>{index + 1}</td>
                                    <td>{product.product}</td>
                                    <td>{product.value}</td>
                                    <td>
                                        <a data-target="modal1" className="waves-effect waves-light modal-trigger">Открыть</a>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    {/* <!-- Modal Structure -->*/}
                    <div id="modal1" className="modal">
                        <div className="modal-content" style={{height: '400px'}}>
                            <h4>Ingredient info</h4>
                            <div className="input-field">
                                <input
                                    placeholder="Введите объем продукта"
                                    type="text"
                                    name="ingredients-value"
                                    id="ingredients-value"
                                    value={recipe.ingredients}
                                    onChange={handlerChange}
                                />
                                <label htmlFor="name">Сложность рецепта</label>
                            </div>
                            <div className="input-field col s12">
                                <Select name="ingredients" options={product.map(t => { return { value: t._id, label: t.name} }) } />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
                        </div>
                    </div>

                    <h3>Stages</h3>
                    <table id="ingredients" className="highlight">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Описание</th>
                            <th>
                                <button className="btn yellow darken-4"
                                        onClick={() => history.push('/new-product')}>Добавить</button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {recipe.stages.map((stage) => {
                            return (
                                <tr key={stage.num}>
                                    <td>{stage.num}</td>
                                    <td>{stage.description}</td>
                                    <td>
                                        <a data-target="modal2" className="waves-effect waves-light modal-trigger">Открыть</a>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    {/* <!-- Modal Structure -->*/}
                    <div id="modal2" className="modal">
                        <div className="modal-content" style={{height: '400px'}}>
                            <h4>Stage info</h4>
                            <p>Stage: 0</p>
                            <div className="input-field">
                                <textarea
                                    placeholder="Введите описание этапа рецепта"
                                    name="stage-name"
                                    id="stage-name"
                                    value={recipe.name}
                                    onChange={handlerChange}
                                />
                                <label htmlFor="name">Наименование рецепта</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-close waves-effect waves-green btn-flat">Agree</button>
                        </div>
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
                        onClick={() => history.push('/recipes')}
                        disabled={loading}
                >Отмена</button>
            </div>
        </>
    )
}