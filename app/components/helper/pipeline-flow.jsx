import { HiArrowNarrowRight } from "react-icons/hi";

// Horizontal chain of steps with arrows. Wraps on narrow screens.
function PipelineFlow({ steps, highlight = [] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2">
      {steps.map((step, i) => {
        const strong = highlight.includes(i);
        return (
          <li key={step} className="flex items-center">
            <span className={strong ? "chip-strong" : "chip"}>{step}</span>
            {i < steps.length - 1 ? (
              <HiArrowNarrowRight className="mx-1.5 shrink-0 text-muted/60" size={14} aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export default PipelineFlow;
