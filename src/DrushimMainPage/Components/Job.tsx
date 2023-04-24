import { type } from '@testing-library/user-event/dist/type'
import React from 'react'

type text = {
    description: string
}


export default function Job({description}: text) {
  return (
    <div>{description}</div>
  )
}
