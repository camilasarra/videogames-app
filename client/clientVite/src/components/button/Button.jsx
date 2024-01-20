import React from 'react'
import { Link } from 'react-router-dom'

export default function Button({ path, text}) {
  return (
    <Link to={path} >
        <button>
            {text}
        </button>
    </Link>
  )
}
