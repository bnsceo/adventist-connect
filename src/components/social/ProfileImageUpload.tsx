import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { uploadProfileImage } from "@/utils/profileImageUpload";

interface ProfileImageUploadProps {
    type: 'avatar' | 'banner';
}

export const ProfileImageUpload = ({ type }: ProfileImageUploadProps) => {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        try {
            // Add file size and type validation here
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                throw new Error("File size too large. Please upload an image under 5MB.");
            }
            if (!file.type.startsWith("image/")) {
                throw new Error("Invalid file type. Please upload an image.");
            }

            await uploadProfileImage(file, type);
            toast({
                title: "Success",
                description: `${type === 'avatar' ? 'Profile' : 'Banner'} image updated successfully`,
            });
        } catch (error: any) { // Type the error as any or Error
            console.error(`Error uploading ${type} image:`, error);
            toast({
                title: "Error",
                description: error.message || `Failed to upload ${type} image. Please try again.`,
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                }}
            />
            <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                disabled={isUploading}
            >
                <Camera className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : `Change ${type === 'avatar' ? 'Profile Picture' : 'Banner Image'}`}
            </Button>
        </div>
    );
};
