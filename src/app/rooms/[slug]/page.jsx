import RoomsRepository from '@/app/lib/Rooms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const dynamicParams = true;

export default async function RoomPage({ params }) {
    const slug = params?.slug;
    
    try {
        const room = await RoomsRepository.getInstance().getBySlug(slug, {}, false);

        if (!room) {
            notFound();
        }

        const fields = room.fields || {};
        const title = fields.name || 'Room';
        const bedType = fields.bedType;
        const category = fields.category;
        const sizeSqft = fields.sizeSqft;
        const floorNumber = fields.floorNumber;
        const smokingAllowed = fields.smokingAllowed;
        const description = fields.description || fields.roomDescription || fields.longDescription;
        const images = Array.isArray(fields.images) ? fields.images : [];

        // Prepare images for masonry gallery
        const galleryImages = images.map(img => ({
            url: `https:${img.fields.file.url}`,
            alt: img.fields.title || title,
            id: img.sys.id
        }));

        // Split images into 4 columns for masonry layout
        const getColumnImages = (columnIndex, totalColumns) => {
            return galleryImages.filter((_, index) => index % totalColumns === columnIndex);
        };

        return (
            <section className="w-full max-w-[1200px] mx-auto md:py-20 py-10 px-4">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white">{title}</h1>
                    <div className="flex flex-wrap gap-4 mb-6">
                        {bedType && (
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {bedType}
                            </span>
                        )}
                        {category && (
                            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                                {category}
                            </span>
                        )}
                        {sizeSqft && (
                            <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                                {sizeSqft} sq ft
                            </span>
                        )}
                        {floorNumber && (
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                Floor {floorNumber}
                            </span>
                        )}
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            smokingAllowed 
                                ? "bg-red-100 text-red-800" 
                                : "bg-gray-100 text-gray-800"
                        }`}>
                            {smokingAllowed ? "Smoking Allowed" : "Non-Smoking"}
                        </span>
                    </div>
                </div>

                {/* Masonry Gallery */}
                {galleryImages.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-white">Room Gallery</h2>
                        <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300 rounded-lg border border-gray-700">
                            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4">
                                {galleryImages.map((image, index) => (
                                    <div key={image.id} className="break-inside-avoid mb-4">
                                        <Image
                                            className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                                            src={image.url}
                                            alt={image.alt}
                                            width={400}
                                            height={300}
                                            priority={index < 3} // Priority for first 3 images
                                            style={{ height: 'auto' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Room Description */}
                {description && (
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-semibold mb-4 text-white">Room Description</h2>
                        <div className="text-gray-300">
                            {description.nodeType
                                ? documentToReactComponents(description)
                                : description}
                        </div>
                    </div>
                )}
            </section>
        );
    } catch (error) {
        console.error("Error fetching room:", error);
        notFound();
    }
}