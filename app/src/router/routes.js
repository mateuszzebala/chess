import { NewGamePage } from '../pages/NewGamePage'
import { HomePage } from '../pages/HomePage'
import { OptionsPage } from '../pages/OptionsPage'
import { SignInPage } from '../pages/account/SignInPage'
import { GamePage } from '../pages/GamePage'
import { SignUpPage } from '../pages/account/SignUpPage'

class Route {
    constructor(page, path, link) {
        this.PAGE = page
        this.PATH = path
        this.LINK = link
    }
}

export const ROUTES = {
    HOME: new Route(HomePage, '/', () => '/'),
    OPTIONS: new Route(OptionsPage, '/options/', () => '/options/'),
    NEWGAME: new Route(NewGamePage, '/newgame/', () => '/newgame/'),
    GAME: new Route(GamePage, '/game/:id/', (id) => `/game/${id}`),
    SIGNIN: new Route(SignInPage, '/account/signin/', () => '/account/signin/'),
    SIGNUP: new Route(SignUpPage, '/account/signup/', () => '/account/signup/')
}
