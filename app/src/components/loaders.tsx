export function SpinnerLoader() {
  return (
    <div class="flex h-screen w-full items-center justify-center">
      <div class="flex flex-col items-center space-y-4">
        <div class="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 size-6" />
        <p class="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}
