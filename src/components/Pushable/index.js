import React, { useState, useRef } from 'react';
import Pushable from './Pushable.styled';

export default ({ children, trigger, blockLeft, blockRight, backdrop, active }) => {
    const refElement = useRef(null);

    const [isMousePressed, setMousePressed] = useState(false);
    const [drawerPosition, setDrawerPosition] = useState({
        initialX: 0,
        positionX: 0,
        currentX: 0
    });

    const handleTrigger = () => {
        if (trigger) setTimeout(() => trigger(), 0);
    }

    const dragStart = (event) => {
        if (event.button === 1 || event.button === 2) {
            return
        }

        refElement.current.style.transition = 'none';
        refElement.current.style.cursor = 'grabbing';

        const { pageX } = (event.touches && event.touches[0]) || event;
        setMousePressed(true);
        setDrawerPosition({
            ...drawerPosition,
            initialX: pageX,
            currentX: pageX
        });
    }

    const dragging = (event) => {
        const { pageX } = (event.touches && event.touches[0]) || event;
        if (isMousePressed) {

            const delta = pageX - drawerPosition.currentX;
            const newPositionX = drawerPosition.positionX + delta;

            if (blockLeft && newPositionX < 0) {
                return
            }
            if (blockRight && newPositionX > 0) {
                return
            }

            setDrawerPosition({
                ...drawerPosition,
                currentX: pageX,
                positionX: newPositionX
            });
        }
    }

    const dragStop = (event) => {
        refElement.current.style.cursor = '';

        setMousePressed(false);

        const { pageX } = (event.changedTouches && event.changedTouches[0]) || event;
        const distance = drawerPosition.initialX - pageX;

        if (blockLeft && distance > 0) {
            return
        }
        if (blockRight && distance < 0) {
            return
        }

        /* pushy enough */
        if (Math.abs(distance) > 80) {
            refElement.current.style.transition = 'transform 0.2s ease-out';
            handleTrigger();
            setTimeout(() => {
                setDrawerPosition({
                    initialX: 0,
                    positionX: 0,
                    currentX: 0
                });
            }, 400);
            return
        }

        refElement.current.style.transition = 'transform 0.2s ease-out';
        setDrawerPosition({
            ...drawerPosition,
            initialX: 0,
            positionX: 0
        });
    }

    const onOut = (event) => {
        if (isMousePressed) {
            const { pageX, pageY } = event;

            /* checking if mouse is out of the parent node */
            const parentBox = refElement.current.parentNode.getBoundingClientRect();
            var { bottom, top, right, left } = parentBox;

            if (pageY >= bottom || pageY <= top || pageX >= right || pageX <= left) {
                dragStop(event);
            }

            /* checking if mouse is out of the element */
            const elementBox = refElement.current.getBoundingClientRect();
            // eslint-disable-next-line no-redeclare
            var { bottom, top, right, left } = elementBox;

            if (pageY >= bottom || pageY <= top || pageX >= right || pageX <= left) {
                dragStop(event);
            }
        }
    }

    const handleClick = () => {
        if(drawerPosition.positionX === 0) {
            setDrawerPosition({
                initialX: 0,
                positionX: 0,
                currentX: 0
            });
            handleTrigger();
        }
    }

    return (
        <Pushable
            role="button"
            tabIndex="0"
            ref={refElement}
            className={`pushable-item ${active ? 'active' : ''}`}
            style={{ transform: `translateX(${drawerPosition.positionX}px)` }}

            onMouseDown={dragStart}
            onMouseMove={dragging}
            onMouseUp={dragStop}

            onMouseOut={onOut}
            onBlur={onOut}

            onTouchStart={dragStart}
            onTouchMove={dragging}
            onTouchEnd={dragStop}
        >
            {children}

            {backdrop
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                ? <div
                    id="drawer-backdrop"
                    onClick={handleClick}
                    role="button"
                    tabIndex="0"
                >
                </div>
                : null}
        </Pushable>
    )
}