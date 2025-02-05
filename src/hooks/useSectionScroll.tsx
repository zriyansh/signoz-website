import { BlogCardProps } from "components/BlogCard";
import React, { useCallback, useEffect } from "react";
import { useIsDesktop } from "./useDeviceType";
import cx from "classnames";

export const useSectionScroll = ({
  currentSelected,
  setCurrentSelected,
  section,
  style,
  cards = 3,
}: useSectionScrollProps): JSX.Element => {
  const isDesktop = useIsDesktop();
  const scrollHandler = useCallback(
    (event: Event) => {
      const el = event.target as HTMLDivElement;
      setCurrentSelected(Math.floor(el.scrollLeft / 350));
    },
    [setCurrentSelected]
  );

  useEffect(() => {
    const scrollContainer = section + "scrollContainer";

    const el = document.getElementById(scrollContainer);
    if (!isDesktop) {
      el?.addEventListener("scroll", scrollHandler);
    }

    return () => {
      if (!isDesktop) {
        el?.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [section, scrollHandler, isDesktop]);

  const onClickHandler = (index: number) => () => {
    setCurrentSelected(index);
  };

  return (
    <>
      <div style={style} className={cx("flex justify-center gap-4 my-4")}>
        {new Array(cards).fill(0).map((_, index) => (
          <div
            onClick={onClickHandler(index)}
            key={index + _}
            className={cx("rounded-full w-2 h-2 cursor-pointer", {
              "bg-signoz-medium-light": currentSelected !== index,
              "bg-signoz-primary": currentSelected === index,
            })}
          />
        ))}
      </div>
    </>
  );
};

interface useSectionScrollProps {
  currentSelected: number;
  setCurrentSelected: React.Dispatch<React.SetStateAction<number>>;
  section: BlogCardProps["tags"];
  style?: React.CSSProperties;
  cards?: number;
}
