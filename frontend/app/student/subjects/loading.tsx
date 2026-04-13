export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
      </div>

      <div className="h-32 bg-muted rounded" />

      <div className="h-20 bg-muted rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
        <div className="h-10 bg-muted rounded" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-card rounded-lg border border-border p-4 sm:p-6 space-y-4">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
            <div className="space-y-1">
              <div className="h-4 bg-muted rounded w-2/3" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-6 bg-muted rounded w-16" />
            </div>
            <div className="h-9 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
