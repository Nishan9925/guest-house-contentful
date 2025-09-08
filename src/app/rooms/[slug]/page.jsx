import RoomsRepository from '@/app/lib/Rooms';
import AboutRepository from '@/app/lib/About';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import RoomGallery from '@/components/rooms/RoomGallery';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { MarkerIcon, EnvelopeIcon, PhoneIcon } from '@/components/Icons';

export const dynamicParams = true;

export default async function RoomPage({ params }) {
    const slug = params?.slug;

    // try {
    const room = await RoomsRepository.getInstance().getBySlug(slug, {}, false);

    if (!room) {
        notFound();
    }

    const fields = room.fields;
    const title = fields.name;
    const bedType = fields.bedType;
    const category = fields.category;
    const sizeSqft = fields.sizeSqft;
    const floorNumber = fields.floorNumber;
    const smokingAllowed = fields.smokingAllowed;
    const description = fields.description || fields.roomDescription || fields.longDescription;
    const images = Array.isArray(fields.images) ? fields.images : [];
    const amenities = fields.amenities;


    const galleryImages = images.map(img => ({
        url: `https:${img.fields.file.url}`,
        alt: img.fields.title || title,
        id: img.sys.id
    }));


    const getColumnImages = (columnIndex, totalColumns) => {
        return galleryImages.filter((_, index) => index % totalColumns === columnIndex);
    };

    const aboutData = await AboutRepository.getInstance().getModels();
    const lng = aboutData?.[0]?.fields?.guestHouseLocation?.lon;
    const lat = aboutData?.[0]?.fields?.guestHouseLocation?.lat;
    const email = aboutData?.[0]?.fields?.email;
    const phoneNumber = aboutData?.[0]?.fields?.phoneNumber;

    return (
        <section className="w-full max-w-[1200px] mx-auto md:py-10 py-8 px-4 flex flex-col gap-3">
            <div className="flex flex-col gap-4 mb-4">
                <h1 className="text-2xl font-semibold text-black">{title}</h1>
                <MarkerIcon
                    addressTitle={"Building 4, 3rd street, 1st side street., 3612 Chʼiva, Armenia"}
                    lng={lng}
                    lat={lat}
                    fill={"black"}
                    textColor={"text-black"}
                />
            </div>
            <div>
                {galleryImages.length > 0 && (
                    <div className="">
                        <RoomGallery images={galleryImages} />
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                {description && (
                    <div className="prose prose-invert max-w-none">
                        <h2 className="text-xl font-semibold mb-4 text-accent-first">Room Description</h2>
                        <div className="text-black">
                            {description.nodeType
                                ? documentToReactComponents(description)
                                : description}
                        </div>
                    </div>
                )}
                <p className='text-black font-semibold'>Bed Type: {bedType}</p>
                <p className='text-black font-semibold'>Size: {sizeSqft}m²</p>
                <p className='text-black font-semibold'>Floor Number: {floorNumber}</p>
                <p className='text-black font-semibold'>Smoking: {smokingAllowed ? 'Allowed' : 'Not Allowed'}</p>
            </div>
            <div className='flex flex-col gap-2 mt-4 mb-4 items-start justify-start bg-accent-second p-10 gap-6'>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-2xl text-white font-semibold'>Do you want to rent a room?</h3>
                    <p className='text-base text-white'>We are ready to help you with your stay. Please contact us.</p>
                </div>
                <div className='max-w-[1100px]  flex flex-col justify-center items-center'>
                {(email || phoneNumber) && (
                    <div className="inline-flex flex-wrap gap-4">
                        {email && (
                            <EnvelopeIcon email={email} iconColor={"white"} textColor={"text-white"} />
                        )}
                        {phoneNumber && (
                            <PhoneIcon phoneNumber={phoneNumber} iconColor={"white"} textColor={"text-white"} />

                        )}
                    </div>
                )}
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold text-accent-first'>Our Benefits and Amenities</h3>
                {amenities && (
                    <div className='flex md:flex-row flex-col gap-8'>
                        {(() => {
                            const entries = Array.isArray(amenities) ? amenities : [amenities];
                            const getText = (node) => {
                                if (!node) return '';
                                if (node.nodeType === 'text') return node.value || '';
                                if (Array.isArray(node.content)) return node.content.map(getText).join('');
                                return '';
                            };
                            return entries.map((amenity, idx) => {
                                const title = amenity?.fields?.amenitiesTitle || 'Amenities';
                                const rich = amenity?.fields?.amenitiesList;
                                const ulNode = rich?.content?.find((n) => n.nodeType === 'unordered-list');
                                const items = (ulNode?.content || [])
                                    .map((li) => getText(li).trim())
                                    .filter(Boolean);
                                return (
                                    <div key={idx} className="min-w-[220px]">
                                        <h3 className='text-base font-semibold mb-3 text-black'>{title}</h3>
                                        <ul className='list-disc pl-5 text-black'>
                                            {items.map((text, i) => (
                                                <li key={i}> {text}</li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            });
                        })()}
                    </div>
                )}
            </div>
        </section>
    );
    // } catch (error) {
    //     // console.error("Error fetching room:", error);
    //     notFound();
    // }
}

// Dynamic SEO for room pages
export async function generateMetadata({ params }) {
    const slug = params?.slug;
    const room = await RoomsRepository.getInstance().getBySlug(slug, {}, false);
    console.log("seo", room);
    if (!room) return {};

    const f = room.fields;
    console.log(f);
    const seoTitle = f.name || "Room";
    const seoDescription = f.bedType || "Comfortable room at Arevik B&B";
    const canonicalPath =  `/rooms/${slug}`;

    // Build absolute image URL if available
    const ogImage = Array.isArray(f.images) && f.images[0]?.fields?.file?.url
        ? `https:${f.images[0].fields.file.url}`
        : undefined;

    return {
        title: seoTitle,
        description: typeof seoDescription === 'string' ? seoDescription : undefined,
        alternates: { canonical: canonicalPath },
        openGraph: {
            title: seoTitle,
            description: typeof seoDescription === 'string' ? seoDescription : undefined,
            url: canonicalPath,
            images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: seoTitle }] : undefined,
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: typeof seoDescription === 'string' ? seoDescription : undefined,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}
