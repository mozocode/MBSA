export const GRANTS_HERO =
  '/media/2024/01/Grants.jpeg'

export const PDF_ICON =
  '/media/2023/12/PDF-icon.svg'

export interface GrantDocument {
  id: string
  title: string
  previewImage: string
  pdfUrl: string
}

export const grantDocuments: GrantDocument[] = [
  {
    id: '2023-letter-from-president',
    title: '2023 Letter from the President',
    previewImage:
      '/media/2023/12/2023-Letter-from-the-President.png',
    pdfUrl:
      '/media/2023/12/2023-letter-from-the-president.pdf',
  },
  {
    id: '2022-gedtf-application',
    title: '2022 GEDTF Application',
    previewImage:
      '/media/2023/12/2022-GEDTF-Application.png',
    pdfUrl: '/media/2023/12/2022-gedtf-application.pdf',
  },
  {
    id: 'gedtf-award-letter-attachments',
    title: 'GEDTF Award Letter Attachments',
    previewImage:
      '/media/2023/12/GEDTF-Award-Letter-Attachments.png',
    pdfUrl:
      '/media/2023/12/gedtf-award-letter-attachments.pdf',
  },
  {
    id: '2022-gedtf-project-sandlot',
    title: '2022 \u2013 GEDTF Project Sandlot',
    previewImage:
      '/media/2023/12/2022-GEDTF-Project-Sandlot.png',
    pdfUrl:
      '/media/2023/12/2022-gedtf-020-signed-contract-project-sandlot.pdf',
  },
  {
    id: 'dced-contract-document',
    title: 'DCED Contract Document',
    previewImage:
      '/media/2023/12/DCED-Contract-Document.png',
    pdfUrl: '/media/2023/12/dced-contractdocument.pdf',
  },
  {
    id: 'dced-covid-grant-application',
    title: 'DCED COVID GRANT APPLICATION',
    previewImage:
      '/media/2023/12/DCED-COVID-GRANT-APPLICATION.png',
    pdfUrl:
      '/media/2023/12/dced-covid-grant-single-application-for-assistance.pdf',
  },
]
