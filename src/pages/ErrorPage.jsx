import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <section className="container">
      <h1>Something went wrong :-/</h1>
      <p>Please refresh the page</p>
    </section>
  )
}
