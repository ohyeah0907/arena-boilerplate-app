import React from 'react'
import { useParams } from 'react-router-dom'

function DetailPage() {
  const { variantsId } = useParams()
  return <div>Variants DetailPage {variantsId}</div>
}

export default DetailPage
