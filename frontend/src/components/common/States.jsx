export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <p className="mt-3 text-sm text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message }) {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
      {message}
    </div>
  );
}
