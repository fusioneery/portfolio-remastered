import { useIntersection } from 'use-intersection'
import React, { useRef } from 'react'

export const InViewAnimation = ({
  children,
  variants,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
  externalRef,
}) => {
  const ref = useRef()
  const inView = useIntersection(externalRef ? externalRef : ref, {
    threshold,
    rootMargin,
    once: true,
  })
  return (
    <children.type
      {...children.props}
      {...{ ref, variants }}
      animate={inView ? 'visible' : 'hidden'}
      exit="hidden"
      initial="hidden"
    />
  )
}
