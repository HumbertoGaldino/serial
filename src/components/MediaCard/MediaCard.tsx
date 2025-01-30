import Image from "next/image";
import Link from "next/link";

export default function MediaCard({
  media_image,
  media_title,
}: {
  media_image: string;
  media_title: string;
}) {
  return (
    <Link className="w-[354px] flex-shrink-0" href={`/series/${media_title}`}>
      <Image src={media_image} alt={media_title} width={354} height={523} className="object-cover" />
    </Link>
  );
}
