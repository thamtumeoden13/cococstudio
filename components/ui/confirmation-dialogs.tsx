"use client"
import { X, AlertCircle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DenyAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  studentName?: string
}

export function DenyAccountDialog({ open, onOpenChange, onConfirm, studentName }: DenyAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <DialogTitle className="text-xl">Deny Account Request</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-gray-600 px-6">
          Denying this request will notify the student they're not eligible due to unsuccessful ID card verification.
        </DialogDescription>
        <DialogFooter className="sm:justify-center">
          <Button className="w-full bg-red-400 hover:bg-red-500 text-white" onClick={onConfirm}>
            Deny & Notify Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface ApproveAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  studentName?: string
  avatars?: Array<{
    initials: string
    color?: string
  }>
}

export function ApproveAccountDialog({
  open,
  onOpenChange,
  onConfirm,
  studentName,
  avatars = [],
}: ApproveAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>

          {avatars.length > 0 && (
            <div className="flex -space-x-2 mt-2 mb-4">
              {avatars.map((avatar, index) => (
                <Avatar key={index} className="border-2 border-white h-8 w-8">
                  <AvatarFallback className={getAvatarColor(avatar.color)}>{avatar.initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}

          <DialogTitle className="text-xl">Approve Book Request</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-gray-600 px-6">
          Approve the student's account request and grant access. A confirmation email will be sent upon approval.
        </DialogDescription>
        <DialogFooter className="sm:justify-center">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={onConfirm}>
            Approve & Send Confirmation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to get avatar background color
function getAvatarColor(color?: string) {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-600"
    case "green":
      return "bg-green-100 text-green-600"
    case "yellow":
      return "bg-yellow-100 text-yellow-600"
    case "purple":
      return "bg-purple-100 text-purple-600"
    case "indigo":
      return "bg-indigo-100 text-indigo-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

