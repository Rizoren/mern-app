import React, {useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span className="brand-logo" style={{paddingLeft: "50px"}}>Food Gourmet</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/links">Ссылки</NavLink></li>
                    <li><NavLink to="/products">Продукты</NavLink></li>
                    <li><NavLink to="/recipes">Рецепты</NavLink></li>
                    <li><NavLink to="/recommendations">Рекомендации</NavLink></li>
                    <li><NavLink to="/favorites">Мои продукты</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}