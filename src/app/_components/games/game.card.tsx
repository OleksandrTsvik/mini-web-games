import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  href: string;
  src: string | StaticImport;
  title: string;
};

export default function GameCard({ href, src, title }: Props) {
  return (
    <Link
      href={href}
      className="relative block overflow-hidden aspect-video cursor-pointer rounded-xl group"
    >
      <div className="z-10 h-full w-full border border-transparent overflow-hidden rounded-xl transition duration-300 ease-in-out">
        <Image
          className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
          src={src}
          alt={title}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20"></div>
      <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
        <h3 className="font-serif text-2xl font-bold text-white">{title}</h3>
      </div>
    </Link>
  );
}
