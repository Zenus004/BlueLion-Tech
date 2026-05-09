export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-cyan-300" />
        <p className="mt-3 text-sm text-blue-100">{label}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message }) {
  return <div className="rounded-xl border border-red-300/30 bg-red-500/20 p-4 text-red-100">{message}</div>;
}
