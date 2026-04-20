import { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import type { ParseResponse } from '../../types/parsing';
import { ParsingService } from '../../services/parsing.service';

interface MaterialListUploadProps {
    onParseComplete: (result: ParseResponse) => void;
    disabled?: boolean;
}

/**
 * "Upload Material List" button with progress indicator.
 * Handles file selection, upload, and AI parsing flow.
 */
export const MaterialListUpload = ({ onParseComplete, disabled }: MaterialListUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);
        setProgress(0);

        // Simulate progress for UX (real upload is fast since it's local)
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 15, 85));
        }, 200);

        try {
            const result = await ParsingService.uploadMaterialList(file);
            setProgress(100);
            clearInterval(progressInterval);

            // Brief delay to show 100% before callback
            setTimeout(() => {
                onParseComplete(result);
                setUploading(false);
                setProgress(0);
            }, 300);
        } catch (err) {
            clearInterval(progressInterval);
            setError(err instanceof Error ? err.message : 'Failed to parse material list');
            setUploading(false);
            setProgress(0);
        }

        // Reset file input so the same file can be re-uploaded
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [onParseComplete]);

    return (
        <div className="inline-flex flex-col items-end gap-2">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.xlsx,.xls,.csv"
                className="hidden"
                onChange={handleFileChange}
                id="material-list-upload-input"
            />

            <Button
                onClick={handleClick}
                disabled={disabled || uploading}
                variant="secondary"
                className="relative overflow-hidden border-dashed border-stone-amber/30 hover:border-stone-amber/60 hover:bg-stone-amber/5 transition-all"
                id="upload-material-list-btn"
            >
                {uploading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin text-stone-amber" />
                        <span className="text-stone-amber">Parsing...</span>
                    </>
                ) : (
                    <>
                        <Camera className="w-4 h-4 mr-1.5 text-stone-amber" />
                        <Upload className="w-3.5 h-3.5 mr-2 text-stone-amber" />
                        Upload Material List
                    </>
                )}

                {/* Progress bar overlay */}
                {uploading && (
                    <div
                        className="absolute bottom-0 left-0 h-0.5 bg-stone-amber transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                )}
            </Button>

            {error && (
                <div className="text-xs text-rose-400 max-w-60 text-right">
                    {error}
                </div>
            )}
        </div>
    );
};
