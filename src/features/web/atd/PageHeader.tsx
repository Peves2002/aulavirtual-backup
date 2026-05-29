import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}

const PageHeader = ({ eyebrow, title, subtitle, children }: Props) => (
  <section className="relative overflow-hidden border-b border-white/5">
    <div className="absolute inset-0 bg-mesh opacity-60" />
    <div className="container relative py-20 md:py-28 text-center max-w-4xl">
      {eyebrow && (
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
          {eyebrow}
        </div>
      )}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
