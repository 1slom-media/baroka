import { styled } from "@mui/material/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { slideDown } from "../animations/keyframes";

export const StyledBox = styled(
  ({ children, componentHeight, fixedOn, fixed, ...rest }) => (
    <div {...rest}>{children}</div>
  )
)(({ theme, componentHeight, fixedOn, fixed }) => ({
  "& .hold": {
    zIndex: 2,
    boxShadow: "none",
    position: "relative",
  },
  "& .fixed": {
    background: "#fff",
    left: 0,
    right: 0,
    zIndex: 1000,
    position: "fixed",
    top: `${fixedOn}px`,
    boxShadow: theme.shadows[2],
    transition: "all 350ms ease-in-out",
    animation: `${slideDown} 400ms ${theme.transitions.easing.easeInOut}`,
  },
  "& + .section-after-sticky": {
    paddingTop: fixed ? componentHeight : 0,
  },
}));

const Sticky = ({
  fixedOn,
  containerRef,
  children,
  notifyPosition,
  notifyOnScroll,
  onSticky,
}) => {
  const [fixed, setFixed] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);
  const elementRef = useRef(null);
  const positionRef = useRef(0);
  const scrollListener = useCallback(() => {
    if (!window) return;
    const distance = window.pageYOffset - positionRef.current;

    if (containerRef?.current) {
      const containerDistance =
        parseInt(containerRef.current.offsetTop, 10) +
        parseInt(containerRef.current?.offsetHeight, 10) -
        parseInt(window.pageYOffset, 10);

      if (notifyPosition && notifyOnScroll) {
        notifyOnScroll(
          distance <= notifyPosition && containerDistance > notifyPosition
        );
      }

      setFixed(distance <= fixedOn && containerDistance > fixedOn);
    }

    if (notifyPosition && notifyOnScroll) {
      notifyOnScroll(distance >= notifyPosition);
    }

    let isFixed = distance >= fixedOn;

    if (positionRef.current === 0) {
      isFixed =
        parseInt(distance >= fixedOn, 10) +
        parseInt(elementRef.current?.offsetHeight, 10);
    }

    setFixed(isFixed);
  }, []);

  function scrollWindow() {
    if (!window) return;
    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);
  }

  useEffect(() => {
    scrollWindow();
  }, []);
  useEffect(() => {
    if (!positionRef.current) {
      positionRef.current = elementRef.current?.offsetTop;
    }

    setParentHeight(elementRef.current?.offsetHeight || 0);
  }, [elementRef.current, children]);
  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed]);
  return (
    <StyledBox componentHeight={parentHeight} fixed={fixed} fixedOn={fixedOn}>
      <div
        ref={elementRef}
        className={clsx({
          hold: !fixed,
          fixed,
        })}
      >
        {children}
      </div>
    </StyledBox>
  );
};

Sticky.propTypes = {
  fixedOn: PropTypes.number,
  containerRef: PropTypes.shape({
    current: PropTypes.shape({
      offsetHeight: PropTypes.number,
      offsetTop: PropTypes.number,
    }),
  }),
  children: PropTypes.node,
  notifyPosition: PropTypes.number,
  notifyOnScroll: PropTypes.func,
  onSticky: PropTypes.func,
};

Sticky.defaultProps = {
  fixedOn: 0,
  children: <div />,
  notifyPosition: 0,
  onSticky: () => {},
  containerRef: {},
  notifyOnScroll: () => {},
};

export default Sticky;
