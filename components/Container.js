import React from 'react'

export default ({ className = '', ...props }) => (
  <div className={`mw9 center ${className}`} {...props} />
)
