// Mock documents service for commit panel
// Documents are derived from the commits' documentId references

const MOCK_DOCUMENTS = [
  { id: "doc-1", name: "Report Draft", type: "document" },
  { id: "doc-2", name: "Architecture.pdf", type: "pdf" },
  { id: "doc-3", name: "Implementation", type: "document" },
]

export const DocumentsService = {
  async getDocuments() {
    return Promise.resolve(MOCK_DOCUMENTS)
  },

  async getDocumentById(id: string) {
    return Promise.resolve(MOCK_DOCUMENTS.find((doc) => doc.id === id) || null)
  },

  async addDocument(document: Omit<(typeof MOCK_DOCUMENTS)[0], "id">) {
    const newDoc = {
      ...document,
      id: `doc-${Date.now()}`,
    }
    MOCK_DOCUMENTS.push(newDoc)
    return Promise.resolve(newDoc)
  },

  async deleteDocument(id: string) {
    const initialLength = MOCK_DOCUMENTS.length
    const index = MOCK_DOCUMENTS.findIndex((doc) => doc.id === id)
    if (index > -1) {
      MOCK_DOCUMENTS.splice(index, 1)
    }
    return Promise.resolve(MOCK_DOCUMENTS.length < initialLength)
  },
}
