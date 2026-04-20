import { Construction } from "lucide-react";

interface ComingSoonProps {
    title: string;
}

export function ComingSoon({ title }: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Construction className="w-12 h-12 text-stone-amber mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            <p className="text-zinc-400 max-w-md">
                This module is under construction and will be available in Phase 1.
            </p>
        </div>
    );
}
