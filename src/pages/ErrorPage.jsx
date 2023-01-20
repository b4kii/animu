import React from 'react'

export default function ErrorPage() {
  const container = {
    widht: "70vw",
    height: "100vh",
    paddingTop: "3.5rem",
    fontSize: "2em",
    display: "grid",
    placeContent: "center",
    textAlign: "center"
  }

  return (
    <section style={container}>
      <h1>Something went wrong :-/</h1>
      <p style={{fontSize: ".8em"}}>Please refresh the page</p>
    </section>
  )
}
