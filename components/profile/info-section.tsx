interface InfoSectionProps {
  title: string
  items: Array<{
    label: string
    value: string | number
  }>
}

export function InfoSection({ title, items }: InfoSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/20 transition-all duration-200"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-2 tracking-wide">
              {item.label}
            </p>
            <p className="text-lg font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
