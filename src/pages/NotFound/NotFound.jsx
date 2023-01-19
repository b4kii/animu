import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const container = {
    widht: "70vw",
    height: "100vh",
    paddingTop: "3.5rem",
    fontSize: "3.5em",
    display: "grid",
    placeContent: "center",
    textAlign: "center"
  }

  return (
    <section style={container}>
      <div>404</div>
      <div>Page Not Found :-(</div>
      <p style={{fontSize: ".3em"}}>
        <Link to="/"> &lt;- Go back to home page</Link>
      </p>
    </section>
  )
}
