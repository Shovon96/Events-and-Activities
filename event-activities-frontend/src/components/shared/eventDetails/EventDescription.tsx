interface EventDescriptionProps {
    description: string;
}

export default function EventDescription({ description }: EventDescriptionProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
                {description}
            </p>
        </div>
    );
}
