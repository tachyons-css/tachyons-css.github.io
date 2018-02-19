import React from 'react'
import classNames from 'classnames'

export default ({ className = '', ph, ...props }) => {
  const cx = classNames(className, 'mw9 center', {
    'ph3 ph5-m ph0-l': ph
  })
  return <div className={cx} {...props} />
}
