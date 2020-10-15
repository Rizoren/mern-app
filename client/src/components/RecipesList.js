import React from "react"
import {Link, useHistory} from "react-router-dom";

export const RecipesList = ({ recipes, readOnly = false }) => {
    const history = useHistory()

    if (!recipes.length) {
        return (
            <div className="row center">
                <p className="center">Данных нет</p>
                { !readOnly && <button className="btn yellow darken-4"
                         onClick={() => history.push('/new-recipe')}>Добавить</button> }
            </div>
        )
    }

    return (
        <table className="highlight">
            <thead>
            <tr>
                <th>№</th>
                <th>Наименование</th>
                <th>
                    { !readOnly && <button className="btn yellow darken-4"
                            onClick={() => history.push('/new-recipe')}>Добавить</button> }
                </th>

            </tr>
            </thead>

            <tbody>
            { recipes.map((recipe, index) => {
               return (
                   <tr key={recipe._id}>
                       <td>{index + 1}</td>
                       <td>{recipe.name}</td>
                       <td>
                           <Link to={`/${readOnly ? 'recipe-view' : 'recipes'}/${recipe._id}`}>Открыть</Link>
                       </td>
                   </tr>
               )
            }) }
            </tbody>
        </table>
    )
}