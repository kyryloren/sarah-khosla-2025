// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About')
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('about')
            .title('About'),
        ),
      S.listItem()
        .title('Global')
        .child(
          S.editor()
            .id('globalSettings')
            .schemaType('globalSettings')
            .documentId('globalSettings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (li) => !['about', 'globalSettings'].includes(String(li.getId())),
      ),
    ])
