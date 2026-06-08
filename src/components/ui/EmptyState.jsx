import Button from "./Button";

export default function EmptyState({
  title,
  description,
  actionText,
  onAction,
}) {
  return (
    <div className="text-center py-20 text-gray-400">
      <div className="text-xl text-white mb-2">
        {title}
      </div>

      <div className="text-sm text-gray-500 mb-6">
        {description}
      </div>

      {actionText && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}