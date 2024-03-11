import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameDetail, cleanDetail } from '../../redux/actions';
import { useEffect  } from 'react';
import style from './Detail.module.css'

export default function Detail( ) {
const params = useParams(); // trae un obj con el id x ej { id: 1 }
const dispatch = useDispatch();
const navigate = useNavigate();
const videogameDetail = useSelector(state => state.videogameDetail)


useEffect(() => {
  
        dispatch(getVideogameDetail(params.id))

        return () => dispatch(cleanDetail()); //simulo el desmontaje del compo
}, [])

//console.log("VIDEOGAME DETAIL : ", videogameDetail)

if(!videogameDetail){
  return <p>Loading..</p>
}
  return (
    <div className={style.wrapper}>

    <div className={style.card}>
       <h2 className={style.name}>{videogameDetail?.name}</h2>
       <img src={videogameDetail.image} alt="" className={style.image}/>
       <h5 className={style.description}>{videogameDetail.description}</h5>

       <div className={style.textcontainer}>
       <h4>Rating: {videogameDetail?.rating}</h4>
       <h4>Released date: {videogameDetail?.released}</h4>
       <h4>Genres: {Array.isArray(videogameDetail.genres) ? videogameDetail.genres.join(' - ') : videogameDetail.genres}</h4>
       <h4>Platforms : {videogameDetail.platforms}</h4>
       </div>
       <button onClick={()=> navigate('/home')}>GO BACK</button>
    </div>

    </div>
  )
}
