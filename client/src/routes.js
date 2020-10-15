import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import {ProductsPage} from "./pages/ProductsPage";
import {CreateProductPage} from "./pages/CreateProductPage";
import {DetailProductPage} from "./pages/DetailProductPage";
import {RecipesPage} from "./pages/RecipesPage";
import {CreateRecipePage} from "./pages/CreateRecipePage";
import {DetailRecipePage} from "./pages/DetailRecipePage";
import {FavoritesPage} from "./pages/FavoritesPage";
import {RecommendationsPage} from "./pages/RecommendationsPage";
import {DetailRecipeViewPage} from "./pages/DetailRecipeViewPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Route path="/products" exact>
                    <ProductsPage />
                </Route>
                <Route path="/new-product" exact>
                    <CreateProductPage />
                </Route>
                <Route path="/products/:id" exact>
                    <DetailProductPage />
                </Route>
                <Route path="/recipes" exact>
                    <RecipesPage />
                </Route>
                <Route path="/new-recipe" exact>
                    <CreateRecipePage />
                </Route>
                <Route path="/recipes/:id" exact>
                    <DetailRecipePage />
                </Route>
                <Route path="/favorites" exact>
                    <FavoritesPage />
                </Route>
                <Route path="/recommendations" exact>
                    <RecommendationsPage />
                </Route>
                <Route path="/recipe-view/:id" exact>
                    <DetailRecipeViewPage />
                </Route>
                <Redirect to="/links" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}