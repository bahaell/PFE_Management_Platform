"use client";

import { useState, useEffect } from "react";
import { AcademicDocumentsService } from "@/services/service_academic_documents";
import { AcademicDocument } from "@/models/academic_document.model";
import { DocumentTable } from "@/components/academic-documents/DocumentTable";
import { DocumentFilters } from "@/components/academic-documents/DocumentFilters";
import { DocumentPreviewModal } from "@/components/academic-documents/DocumentPreviewModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function StudentDocumentsPage() {
  const [documents, setDocuments] = useState<AcademicDocument[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<AcademicDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<AcademicDocument | null>(null);
  const [requestType, setRequestType] = useState<AcademicDocument["type"]>("convention");

  const { toast } = useToast();

  // Mock student ID - in a real app this would come from auth context
  const currentStudentId = "STU001";

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchQuery, typeFilter, statusFilter]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const docs = await AcademicDocumentsService.getDocumentsForStudent(currentStudentId);
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
      filtered = filtered.filter((doc) =>
        doc.type.toLowerCase().includes(query)
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

  const handleRequestDocument = async () => {
    try {
      await AcademicDocumentsService.requestDocument(requestType, currentStudentId);
      toast({
        title: "Success",
        description: "Document requested successfully.",
      });
      setIsRequestOpen(false);
      loadDocuments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to request document.",
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

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Documents</h1>
          <p className="text-muted-foreground">
            View and request your official academic documents.
          </p>
        </div>
        <Button onClick={() => setIsRequestOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Request Document
        </Button>
      </div>

      <DocumentFilters
        onSearchChange={setSearchQuery}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        showStudentFilter={false}
      />

      {loading ? (
        <div className="flex justify-center py-8">Loading...</div>
      ) : (
        <DocumentTable
          documents={filteredDocuments}
          role="student"
          onPreview={handlePreview}
          onDownload={handleDownload}
        />
      )}

      {/* Simple Request Modal */}
      <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Document</DialogTitle>
            <DialogDescription>
              Select the type of document you need.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="request-type">Document Type</Label>
              <Select
                value={requestType}
                onValueChange={(val) => setRequestType(val as AcademicDocument["type"])}
              >
                <SelectTrigger id="request-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="convention">Convention de Stage</SelectItem>
                  <SelectItem value="encadrement">Fiche d'Encadrement</SelectItem>
                  <SelectItem value="demande_pfe">Demande de PFE</SelectItem>
                  <SelectItem value="pv_soutenance">PV de Soutenance</SelectItem>
                  <SelectItem value="affectation_encadrant">
                    Affectation Encadrant
                  </SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRequestOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestDocument}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DocumentPreviewModal
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        document={selectedDocument}
      />
    </div>
  );
}
