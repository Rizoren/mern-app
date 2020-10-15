import React from "react"
import {Link, useHistory} from "react-router-dom";

export const ProductsList = ({ products }) => {
    const history = useHistory()
    if (!products.length) {
        return (
            <div className="row">
                <p className="center">Данных нет</p>
                <button className="btn yellow darken-4"
                        onClick={() => history.push('/new-product')}>Добавить</button>
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
                    <button className="btn yellow darken-4"
                            onClick={() => history.push('/new-product')}>Добавить</button>
                </th>
            </tr>
            </thead>

            <tbody>
            { products.map((product, index) => {
               return (
                   <tr key={product._id}>
                       <td>{index + 1}</td>
                       <td>{product.name}</td>
                       <td>
                           <Link to={`/products/${product._id}`}>Открыть</Link>
                       </td>
                   </tr>
               )
            }) }
            </tbody>
        </table>
    )
}