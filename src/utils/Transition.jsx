import { CSSTransition as ReactCSSTransition } from 'react-transition-group'
import React, { useRef, useEffect, useContext, createContext } from 'react'
import PropTypes from 'prop-types'

const TransitionContext = createContext({
  parent: {}
})

const useIsInitialRender = () => {
  const isInitialRender = useRef(true)
  useEffect(() => {
    isInitialRender.current = false
  }, [])
  return isInitialRender.current
}

const CSSTransition = ({
  show,
  enter = '',
  enterFrom = '',
  enterTo = '',
  leave = '',
  leaveFrom = '',
  leaveTo = '',
  appear,
  children
}) => {
  const enterClasses = enter.split(' ').filter((s) => s.length)
  const enterFromClasses = enterFrom.split(' ').filter((s) => s.length)
  const enterToClasses = enterTo.split(' ').filter((s) => s.length)
  const leaveClasses = leave.split(' ').filter((s) => s.length)
  const leaveFromClasses = leaveFrom.split(' ').filter((s) => s.length)
  const leaveToClasses = leaveTo.split(' ').filter((s) => s.length)

  const addClasses = (node, classes) =>
    classes.length && node.classList.add(...classes)

  const removeClasses = (node, classes) =>
    classes.length && node.classList.remove(...classes)

  return (
    <ReactCSSTransition
      appear={appear}
      unmountOnExit
      in={show}
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      onEnter={(node) => {
        addClasses(node, [...enterClasses, ...enterFromClasses])
      }}
      onEntering={(node) => {
        removeClasses(node, enterFromClasses)
        addClasses(node, enterToClasses)
      }}
      onEntered={(node) => {
        removeClasses(node, [...enterToClasses, ...enterClasses])
      }}
      onExit={(node) => {
        addClasses(node, [...leaveClasses, ...leaveFromClasses])
      }}
      onExiting={(node) => {
        removeClasses(node, leaveFromClasses)
        addClasses(node, leaveToClasses)
      }}
      onExited={(node) => {
        removeClasses(node, [...leaveToClasses, ...leaveClasses])
      }}
    >
      {children}
    </ReactCSSTransition>
  )
}

CSSTransition.propTypes = {
  show: PropTypes.bool.isRequired,
  appear: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  enter: PropTypes.string,
  enterFrom: PropTypes.string,
  enterTo: PropTypes.string,
  leave: PropTypes.string,
  leaveFrom: PropTypes.string,
  leaveTo: PropTypes.string
}

const Transition = ({ show, appear, ...rest }) => {
  const { parent } = useContext(TransitionContext)
  const isInitialRender = useIsInitialRender()
  const isChild = show === undefined

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    )
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear
        }
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  )
}

Transition.propTypes = {
  show: PropTypes.bool.isRequired,
  appear: PropTypes.bool.isRequired
}

export default Transition
