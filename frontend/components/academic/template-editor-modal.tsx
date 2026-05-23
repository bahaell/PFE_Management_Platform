'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2, Plus } from 'lucide-react'
import type { AcademicTemplate, AcademicTemplateType, TemplateField } from '@/models/academic-template.model'

interface TemplateEditorModalProps {
  open: boolean
  template?: AcademicTemplate | null
  onClose: () => void
  onSave: (template: Omit<AcademicTemplate, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => void
}

export function TemplateEditorModal({
  open,
  template,
  onClose,
  onSave,
}: TemplateEditorModalProps) {
  const [name, setName] = useState(template?.name || '')
  const [type, setType] = useState<AcademicTemplateType>(template?.type || 'convention')
  const [description, setDescription] = useState(template?.description || '')
  const [fields, setFields] = useState<TemplateField[]>(template?.fields || [])
  const [newField, setNewField] = useState<Partial<TemplateField>>({})

  const handleAddField = () => {
    if (newField.key && newField.label) {
      setFields([...fields, { ...newField, required: newField.required || false, type: newField.type || 'text' } as TemplateField])
      setNewField({})
    }
  }

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (name && type && fields.length > 0) {
      onSave({
        name,
        type,
        description,
        fields,
        createdBy: 'COORD001',
      })
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{template ? 'Modifier le modèle' : 'Créer un nouveau modèle'}</DialogTitle>
          <DialogDescription>
            Créez ou modifiez un modèle de document académique
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom du modèle</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Convention de Stage Standard"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de document</label>
              <Select value={type} onValueChange={(v) => setType(v as AcademicTemplateType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="convention">Convention de Stage</SelectItem>
                  <SelectItem value="encadrement">Fiche d'Encadrement</SelectItem>
                  <SelectItem value="demande_pfe">Demande de PFE</SelectItem>
                  <SelectItem value="pv_soutenance">PV de Soutenance</SelectItem>
                  <SelectItem value="affectation">Affectation Encadrant</SelectItem>
                  <SelectItem value="autre">Autre Document</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le but et le contenu de ce modèle"
              rows={2}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Champs du document</h3>

            {fields.length > 0 && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {fields.map((field, index) => (
                  <Card key={index} className="p-3 flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{field.label}</p>
                      <p className="text-xs text-muted-foreground">{field.key}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveField(index)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            )}

            <Card className="p-4 space-y-3 bg-muted/50">
              <h4 className="text-sm font-medium">Ajouter un champ</h4>
              <Input
                placeholder="Clé du champ (ex: student_name)"
                value={newField.key || ''}
                onChange={(e) => setNewField({ ...newField, key: e.target.value })}
              />
              <Input
                placeholder="Libellé (ex: Nom de l'étudiant)"
                value={newField.label || ''}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              />
              <Select value={newField.type || 'text'} onValueChange={(v) => setNewField({ ...newField, type: v as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texte</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="textarea">Texte long</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={newField.required || false}
                  onCheckedChange={(v) => setNewField({ ...newField, required: !!v })}
                />
                <label className="text-sm">Champ obligatoire</label>
              </div>
              <Button onClick={handleAddField} variant="outline" className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter le champ
              </Button>
            </Card>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={!name || !type || fields.length === 0}>
              {template ? 'Mettre à jour' : 'Créer le modèle'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
