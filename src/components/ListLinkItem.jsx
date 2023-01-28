import React from 'react'
import { Link } from 'react-router-dom'

export default function ListLinkItem({children, to, click}) {
  return (
    <li>
      <Link to={to} onClick={click}>{children}</Link>
    </li>
  )
}
