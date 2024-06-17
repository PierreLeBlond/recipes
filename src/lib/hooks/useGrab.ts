import { useRef, useState, PointerEvent, MouseEvent } from "react";

/*
 * Make sure to use `touch-action: none;` on the element where the grab originate to prevent pointer cancel on mobile, i.e. scrolling
 */
export const useGrab = (
  height: number,
  move: (from: number, to: number) => void,
  ids: string[],
) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [grabbedId, setGrabbedId] = useState<string | null>(null);
  const [grabbedPosition, setGrabbedPosition] = useState(0);
  const [grabbedOffset, setGrabbedOffset] = useState(0);

  const getRelativeTop = (event: PointerEvent) => {
    if (!scrollAreaRef.current) {
      return event.clientY;
    }

    return event.clientY - scrollAreaRef.current.offsetTop + window.scrollY;
  };

  const getRelativeScrolledTop = (relativeTop: number) => {
    if (!scrollAreaRef.current) {
      return relativeTop;
    }

    return relativeTop + scrollAreaRef.current.scrollTop;
  };

  const computeGrabbedPosition = (event: PointerEvent) => {
    if (!scrollAreaRef.current) {
      return grabbedPosition;
    }

    const relativeTop = getRelativeTop(event);

    const isOutOfBoundaries =
      relativeTop < grabbedOffset ||
      relativeTop >
        scrollAreaRef.current.offsetHeight - (height - grabbedOffset);

    if (isOutOfBoundaries) {
      return grabbedPosition + grabbedOffset;
    }

    const relativeScrolledTop = getRelativeScrolledTop(relativeTop);
    return relativeScrolledTop;
  };

  const handleGrab = (event: PointerEvent, id: string) => {
    event.preventDefault();
    event.stopPropagation();

    setGrabbedId(id);
    const newGrabbedPosition = getRelativeScrolledTop(getRelativeTop(event));
    const newGrabbedOffset =
      newGrabbedPosition - Math.floor(newGrabbedPosition / height) * height;
    setGrabbedOffset(newGrabbedOffset);
    setGrabbedPosition(newGrabbedPosition - newGrabbedOffset);
    event.preventDefault();
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!event.isPrimary || grabbedId === null) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const newGrabbedPosition = computeGrabbedPosition(event);
    setGrabbedPosition(newGrabbedPosition - grabbedOffset);

    const toIndex = Math.floor(newGrabbedPosition / height);

    if (toIndex < 0 || toIndex >= ids.length) {
      return;
    }

    const fromIndex = ids.indexOf(grabbedId);

    if (toIndex === fromIndex) {
      return;
    }

    move(fromIndex, toIndex);
  };

  const handlePointerUp = (event: PointerEvent) => {
    if (!event.isPrimary || grabbedId === null) {
      return;
    }
    event.preventDefault();
    setGrabbedId(null);
  };

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  return {
    scrollAreaRef,
    handlePointerMove,
    handlePointerUp,
    handleGrab,
    handleContextMenu,
    grabbedPosition,
    grabbedId,
  };
};
