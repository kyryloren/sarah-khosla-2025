// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home')
        .icon(() => '🏠')
        .child(
          S.editor()
            .id('home')
            .schemaType('home')
            .documentId('home')
            .title('Home'),
        ),
      S.listItem()
        .title('About')
        .icon(() => '👤')
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('about')
            .title('About'),
        ),
      S.listItem()
        .title('Global')
        .icon(() => '⚙️')
        .child(
          S.editor()
            .id('globalSettings')
            .schemaType('globalSettings')
            .documentId('globalSettings'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (li) =>
          !['home', 'about', 'globalSettings'].includes(String(li.getId())),
      ),
    ])
