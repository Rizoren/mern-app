import React from "react"
import {Link, useHistory} from "react-router-dom";

export const LinksList = ({ links }) => {
    const history = useHistory()

    if (!links.length) {
        return (
            <div className="row center">
                <p className="center">Данных нет</p>
                <button className="btn yellow darken-4"
                        onClick={() => history.push('/create')}>Добавить</button>
            </div>
        )
    }

    return (
        <table className="highlight">
            <thead>
            <tr>
                <th>№</th>
                <th>Источник</th>
                <th>Сокращенная ссылка</th>
                <th>
                    <button className="btn yellow darken-4"
                            onClick={() => history.push('/create')}>Добавить</button>
                </th>
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