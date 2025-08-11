export function parseModelsEntries(entries) {
  // Example: return array of entry items
  return entries.items || []
}

export function parsePaginatedEntries(entries, page) {
  // Example: return paginated data
  return {
    items: entries.items || [],
    total: entries.total || 0,
    page,
  }
}
