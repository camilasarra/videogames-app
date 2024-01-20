import Button from "../button/button"
import style from './LandigPage.module.css'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getVideogames, getGenres } from "../../redux/actions"


export default function LandingPage(){
    const dispatch = useDispatch()
    const allVideogames = useSelector((state) => state.allVideogames)

    useEffect(() => {

        dispatch(getVideogames())
        dispatch(getGenres())

    },[] )

return (
    <div className={style.container}>
        <div className={style.gif}></div>

        <h1 className={style.title}>Welcome to my Videogames!</h1>

        <div className={style.btn_container}>

        {
            allVideogames.length 
            ? <Button className={style.bigbutton} path='/home' text="START" />
            : <div className={style.pac_man} ></div>

        }    
        
        </div>
    </div>
)
}