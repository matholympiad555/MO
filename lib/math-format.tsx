import React from "react";

// Lightweight formatter for math formulas and mathematical expressions
// Supports inline $...$ and block $$...$$ expressions with clean typography
export function renderFormattedMath(text: string): React.ReactNode {
  if (!text) return null;

  // Split by block math first: $$ ... $$
  const blockParts = text.split(/\$\$([\s\S]*?)\$\$/g);

  return (
    <>
      {blockParts.map((blockPart, blockIndex) => {
        // Odd indices are block math expressions
        if (blockIndex % 2 === 1) {
          return (
            <div
              key={`block-${blockIndex}`}
              className="my-3 p-3.5 sm:p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm border border-slate-700/80 shadow-inner overflow-x-auto text-center"
            >
              <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-sans mb-1 font-semibold flex items-center justify-center gap-1.5">
                <span>∑ গাণিতিক সমীকরণ</span>
              </div>
              <code className="text-emerald-300 font-semibold tracking-wide">
                {formatMathFormulaString(blockPart.trim())}
              </code>
            </div>
          );
        }

        // Even indices are regular text which may contain inline math $...$
        const inlineParts = blockPart.split(/\$([^\$\n]+?)\$/g);

        return (
          <span key={`inline-block-${blockIndex}`}>
            {inlineParts.map((inlinePart, inlineIndex) => {
              if (inlineIndex % 2 === 1) {
                // Inline math
                return (
                  <span
                    key={`inline-${inlineIndex}`}
                    className="inline-flex items-center px-1.5 py-0.5 mx-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-mono text-xs sm:text-[13px] font-semibold tracking-tight shadow-2xs"
                    title="Mathematical Expression"
                  >
                    {formatMathFormulaString(inlinePart.trim())}
                  </span>
                );
              }

              // Normal text: handle line breaks and bold formatting
              return (
                <span key={`text-${inlineIndex}`}>
                  {renderTextWithFormatting(inlinePart)}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}

// Replaces LaTeX shorthand symbols with clean Unicode symbols for crisp rendering
function formatMathFormulaString(formula: string): string {
  let f = formula;
  f = f.replace(/\\cdot/g, "·");
  f = f.replace(/\\times/g, "×");
  f = f.replace(/\\div/g, "÷");
  f = f.replace(/\\pm/g, "±");
  f = f.replace(/\\le(q)?/g, "≤");
  f = f.replace(/\\ge(q)?/g, "≥");
  f = f.replace(/\\ne(q)?/g, "≠");
  f = f.replace(/\\approx/g, "≈");
  f = f.replace(/\\infty/g, "∞");
  f = f.replace(/\\implies/g, "⇒");
  f = f.replace(/\\iff/g, "⇔");
  f = f.replace(/\\triangle/g, "△");
  f = f.replace(/\\angle/g, "∠");
  f = f.replace(/\\parallel/g, "∥");
  f = f.replace(/\\pmod\{([^\}]+)\}/g, "(mod $1)");
  f = f.replace(/\\binom\{([^\}]+)\}\{([^\}]+)\}/g, "C($1, $2)");
  f = f.replace(/\\frac\{([^\}]+)\}\{([^\}]+)\}/g, "($1)/($2)");
  f = f.replace(/\\left\(/g, "(");
  f = f.replace(/\\right\)/g, ")");
  f = f.replace(/\\sqrt\{([^\}]+)\}/g, "√($1)");
  f = f.replace(/\^\\circ/g, "°");
  f = f.replace(/\^2/g, "²");
  f = f.replace(/\^3/g, "³");
  f = f.replace(/\^4/g, "⁴");
  return f;
}

// Parses bold **bold** and newlines
function renderTextWithFormatting(text: string): React.ReactNode {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => {
    const boldParts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <React.Fragment key={`line-${lineIndex}`}>
        {lineIndex > 0 && <br />}
        {boldParts.map((part, partIndex) => {
          if (partIndex % 2 === 1) {
            return (
              <strong key={`b-${partIndex}`} className="font-bold text-slate-900">
                {part}
              </strong>
            );
          }
          return part;
        })}
      </React.Fragment>
    );
  });
}
