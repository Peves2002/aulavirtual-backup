'use client'

import { useState, useEffect, useRef, useCallback } from "react";

import { Search, X } from "lucide-react";

export default function NavSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<number>(0);
  const [current, setCurrent] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const highlightClass = "atd-search-highlight";
  const activeClass = "atd-search-highlight-active";

  const clearHighlights = useCallback(() => {
    document.querySelectorAll(`.${highlightClass}`).forEach((el) => {
      const parent = el.parentNode;

      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
        parent.normalize();
      }
    });
    setMatches(0);
    setCurrent(0);
  }, [highlightClass]);

  const doSearch = useCallback((q: string) => {
    clearHighlights();
    if (!q.trim()) return;

    const walker = document.createTreeWalker(
      document.querySelector("main") || document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;

          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();

          if (["script", "style", "noscript"].includes(tag)) return NodeFilter.FILTER_REJECT;
          if (parent.closest("nav, header")) return NodeFilter.FILTER_REJECT;
          
return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const nodesToReplace: { node: Text; matches: RegExpMatchArray[] }[] = [];

    let node: Node | null;

    while ((node = walker.nextNode())) {
      const text = node.textContent || "";
      const found = [...text.matchAll(regex)];

      if (found.length) nodesToReplace.push({ node: node as Text, matches: found });
    }

    let total = 0;

    nodesToReplace.forEach(({ node, matches: found }) => {
      const parent = node.parentNode;

      if (!parent) return;
      const frag = document.createDocumentFragment();
      let lastIdx = 0;

      found.forEach((m) => {
        const idx = m.index ?? 0;

        if (idx > lastIdx) frag.appendChild(document.createTextNode(node.textContent!.slice(lastIdx, idx)));
        const span = document.createElement("span");

        span.className = highlightClass;
        span.textContent = m[0];
        span.dataset.matchIdx = String(total++);
        frag.appendChild(span);
        lastIdx = idx + m[0].length;
      });
      if (lastIdx < node.textContent!.length) frag.appendChild(document.createTextNode(node.textContent!.slice(lastIdx)));
      parent.replaceChild(frag, node);
    });

    setMatches(total);
    if (total > 0) scrollToMatch(0);
  }, [clearHighlights, highlightClass]);

  const scrollToMatch = (idx: number) => {
    document.querySelectorAll(`.${activeClass}`).forEach((el) => el.classList.remove(activeClass));
    const el = document.querySelector(`[data-match-idx="${idx}"]`);

    if (el) {
      el.classList.add(activeClass);
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setCurrent(idx);
    }
  };

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else { clearHighlights(); setQuery(""); }
  }, [open, clearHighlights]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handler);
    
return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    doSearch(e.target.value);
  };

  return (
    <>
      {/* Inject highlight styles */}
      <style>{`
        .${highlightClass} { background: rgba(220,38,38,0.35); border-radius: 2px; padding: 0 1px; }
        .${activeClass} { background: rgba(220,38,38,0.7) !important; outline: 2px solid rgba(220,38,38,0.9); border-radius: 2px; }
      `}</style>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs text-muted-foreground border border-white/10 bg-white/5 hover:bg-white/10 hover:text-foreground transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden xl:inline">Buscar...</span>
        <kbd className="hidden xl:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
      </button>

      {/* Search overlay */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-lg rounded-xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ background: "rgba(10,10,16,0.97)", backdropFilter: "blur(20px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleChange}
                placeholder="Buscar en esta página..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                style={{ color: "rgba(255,255,255,0.9)" }}
              />
              {query && (
                <button onClick={() => { setQuery(""); clearHighlights(); }} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Results info + navigation */}
            <div className="px-4 py-3 flex items-center justify-between">
              {query ? (
                <>
                  <span className="text-xs text-muted-foreground">
                    {matches === 0 ? "Sin resultados" : `${current + 1} de ${matches} coincidencias`}
                  </span>
                  {matches > 1 && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => scrollToMatch((current - 1 + matches) % matches)}
                        className="px-2 py-1 text-xs rounded border border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                      >↑ Anterior</button>
                      <button
                        onClick={() => scrollToMatch((current + 1) % matches)}
                        className="px-2 py-1 text-xs rounded border border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                      >Siguiente ↓</button>
                    </div>
                  )}
                </>
              ) : (
                <span className="text-xs text-muted-foreground">Escribe para buscar en el contenido de la página</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
