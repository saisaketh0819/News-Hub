import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // show after 300px scroll
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      title="Back to top"
      className="
        btn btn-primary rounded-circle shadow
        position-fixed
        end-0 bottom-0
        m-4
        d-flex align-items-center justify-content-center
      "
      style={{ width: 48, height: 48, zIndex: 1050 }}
    >
      {/* choose ONE of these icon options */}
      {/* Bootstrap Icons: */}
      {/* Or Unicode: */}
      {/* <span aria-hidden="true">↑</span> */}
      {/* Or inline SVG: */}
      { <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor"><path d="M8 3l5 5-.7.7L8.5 5.6V13h-1V5.6L3.7 8.7 3 8z"/></svg> }
    </button>
  );
}
