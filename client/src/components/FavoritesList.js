import React from "react"
import {Link} from "react-router-dom";

export const FavoritesList = ({ products, type, nameBlock, handlerDelete }) => {
    if (!products.length) {
        return (<></>)
    }

    return (
        <>
        <p>{nameBlock}</p>
        <table className="highlight">

            <thead>
            <tr>
                <th>№</th>
                <th>Наименование</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            { products.filter(p => p.relationship === type).map((product, index) => {
               return (
                   <tr key={product._id}>
                       <td>{index + 1}</td>
                       <td>{product.product}</td>
                       <td>
                           <Link onClick={() => handlerDelete(product._id)} >Удалить</Link>
                       </td>
                   </tr>
               )
            }) }
            </tbody>
        </table>
        </>
    )
}