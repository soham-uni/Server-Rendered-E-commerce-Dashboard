export function formatZodErrors(fieldErrors: any) {
  const messages: any = {};

  if (fieldErrors.name)
    messages.name = ["Product name must be at least 2 characters"];

  if (fieldErrors.price)
    messages.price = ["Price cannot be negative"];

  if (fieldErrors.stock)
    messages.stock = ["Stock cannot be negative"];

  if (fieldErrors.category)
    messages.category = ["Please select a category"];

  if (fieldErrors.images)
    messages.images = ["Please upload valid images"];

  return messages;
}
