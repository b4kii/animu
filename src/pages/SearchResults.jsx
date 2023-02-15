import React from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AnimeDataContext } from '../contexts/AnimeDataContext'

export default function SearchResults() {
  const { searchKeyword } = useParams();
  console.log(searchKeyword);

  return (
    <div>SearchResults</div>
  )
}
