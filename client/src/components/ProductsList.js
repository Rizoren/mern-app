import React from "react"
import {Link} from "react-router-dom";

export const ProductsList = ({ products }) => {
    if (!products.length) {
        return (
            <p className="center">Данных нет</p>
        )
    }

    return (
        <table className="highlight">
            <thead>
            <tr>
                <th>№</th>
                <th>Наименование</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            { products.map((product, index) => {
               return (
                   <tr key={product._id}>
                       <td>{index + 1}</td>
                       <td>{product.name}</td>
                       <td>
                           <Link to={`/product/${product._id}`}>Открыть</Link>
                       </td>
                   </tr>
               )
            }) }
            </tbody>
        </table>
    )
}