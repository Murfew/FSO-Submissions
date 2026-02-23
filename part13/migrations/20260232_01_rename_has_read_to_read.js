export const up = async ({ context: queryInterface }) => {
  await queryInterface.renameColumn('reading_lists', 'has_read', 'read')
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.renameColumn('reading_lists', 'read', 'has_read')
}
