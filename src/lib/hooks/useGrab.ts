import { useRef, useState, PointerEvent, MouseEvent } from "react";

export const useGrab = (
  height: number,
  move: (from: number, to: number) => void,
  ids: string[],
) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [grabbedId, setGrabbedId] = useState<string | null>(null);
  const [grabbedPosition, setGrabbedPosition] = useState(0);
  const [grabbedOffset, setGrabbedOffset] = useState(0);

  const computeGrabbedPosition = (event: PointerEvent) => {
    if (!scrollAreaRef.current) {
      return grabbedPosition;
    }

    const positionY =
      event.clientY - scrollAreaRef.current.offsetTop + window.scrollY;

    if (positionY < 0 || positionY > scrollAreaRef.current.offsetHeight) {
      return grabbedPosition;
    }

    const scrolledPosition = positionY + scrollAreaRef.current.scrollTop;
    return scrolledPosition;
  };

  const handleGrab = (event: PointerEvent, id: string) => {
    setGrabbedId(id);
    const newGrabbedPosition = computeGrabbedPosition(event);
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
