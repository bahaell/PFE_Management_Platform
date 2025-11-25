"use client";

import { useState, useEffect } from "react";
import { AcademicDocumentsService } from "@/services/service_academic_documents";
import { AcademicDocument } from "@/models/academic_document.model";
import { DocumentTable } from "@/components/academic-documents/DocumentTable";
import { DocumentFilters } from "@/components/academic-documents/DocumentFilters";
import { DocumentGeneratorModal } from "@/components/academic-documents/DocumentGeneratorModal";
import { DocumentPreviewModal } from "@/components/academic-documents/DocumentPreviewModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CoordinatorDocumentsPage() {
  const [documents, setDocuments] = useState<AcademicDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<AcademicDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<AcademicDocument | null>(null);
  const [generatorInitialData, setGeneratorInitialData] = useState<Partial<AcademicDocument> | undefined>(undefined);

  const { toast } = useToast();

  // Mock data for generator modal
  const students = AcademicDocumentsService.getMockStudents();
  const teachers = AcademicDocumentsService.getMockTeachers();
  const projects = AcademicDocumentsService.getMockProjects();

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchQuery, typeFilter, statusFilter]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const docs = await AcademicDocumentsService.getAllDocuments();
      setDocuments(docs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = [...documents];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.id.toLowerCase().includes(query) ||
          doc.studentId.toLowerCase().includes(query)
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((doc) => doc.type === typeFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((doc) => doc.status === statusFilter);
    }

    setFilteredDocuments(filtered);
  };

  const handleGenerateDocument = async (data: {
    type: AcademicDocument["type"];
    studentId: string;
    teacherId?: string;
    projectId?: string;
  }) => {
    try {
      if (selectedDocument && selectedDocument.status === "requested") {
        // If generating from a request, update the existing document
        await AcademicDocumentsService.generateDocument(selectedDocument.id, {
          teacherId: data.teacherId,
          projectId: data.projectId,
        });
        toast({
          title: "Success",
          description: "Document generated successfully.",
        });
      } else {
        // Create new document
        // For now, we don't have a direct create method that takes all params in the service mock
        // We'll simulate it by requesting then generating
        const newDoc = await AcademicDocumentsService.requestDocument(data.type, data.studentId);
        await AcademicDocumentsService.generateDocument(newDoc.id, {
          teacherId: data.teacherId,
          projectId: data.projectId,
        });
        toast({
          title: "Success",
          description: "New document created and generated.",
        });
      }
      loadDocuments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate document.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = (doc: AcademicDocument) => {
    setSelectedDocument(doc);
    setIsPreviewOpen(true);
  };

  const handleDownload = (doc: AcademicDocument) => {
    if (doc.fileUrl) {
      window.open(doc.fileUrl, "_blank");
    } else {
      toast({
        title: "Error",
        description: "File not available.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateAction = (doc: AcademicDocument) => {
    setSelectedDocument(doc);
    setGeneratorInitialData({
      type: doc.type,
      studentId: doc.studentId,
      teacherId: doc.teacherId,
      projectId: doc.projectId,
    });
    setIsGeneratorOpen(true);
  };

  const handleEdit = (doc: AcademicDocument) => {
    toast({
      title: "Info",
      description: "Edit metadata functionality not implemented in this demo.",
    });
  };

  const handleDelete = async (doc: AcademicDocument) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        await AcademicDocumentsService.deleteDocument(doc.id);
        toast({
          title: "Success",
          description: "Document deleted.",
        });
        loadDocuments();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete document.",
          variant: "destructive",
        });
      }
    }
  };

  const openNewGenerator = () => {
    setSelectedDocument(null);
    setGeneratorInitialData(undefined);
    setIsGeneratorOpen(true);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Documents</h1>
          <p className="text-muted-foreground">
            Manage and generate official documents for students and teachers.
          </p>
        </div>
        <Button onClick={openNewGenerator}>
          <Plus className="mr-2 h-4 w-4" />
          Generate Document
        </Button>
      </div>

      <DocumentFilters
        onSearchChange={setSearchQuery}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        showStudentFilter={true}
      />

      {loading ? (
        <div className="flex justify-center py-8">Loading...</div>
      ) : (
        <DocumentTable
          documents={filteredDocuments}
          role="coordinator"
          onPreview={handlePreview}
          onDownload={handleDownload}
          onGenerate={handleGenerateAction}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <DocumentGeneratorModal
        open={isGeneratorOpen}
        onOpenChange={setIsGeneratorOpen}
        onGenerate={handleGenerateDocument}
        students={students}
        teachers={teachers}
        projects={projects}
        initialData={generatorInitialData}
      />

      <DocumentPreviewModal
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        document={selectedDocument}
      />
    </div>
  );
}
