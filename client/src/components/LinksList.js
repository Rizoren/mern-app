import React from "react"
import {Link} from "react-router-dom";

export const LinksList = ({ links }) => {
    if (!links.length) {
        return (
            <p className="center">Данных нет</p>
        )
    }

    return (
        <table className="highlight">
            <thead>
            <tr>
                <th>№</th>
                <th>Источник</th>
                <th>Сокращенная ссылка</th>
                <th></th>
            </tr>
            </thead>

            <tbody>
            { links.map((link, index) => {
               return (
                   <tr key={link._id}>
                       <td>{index + 1}</td>
                       <td>{link.from}</td>
                       <td>{link.to}</td>
                       <td>
                           <Link to={`/detail/${link._id}`}>Открыть</Link>
                       </td>
                   </tr>
               )
            }) }
            </tbody>
        </table>
    )
}