import Image from "next/image"

interface ImageProfileProps {
  src: string;
  alt: string;
}

export const ImageProfile = ({
  src,
  alt,
}: ImageProfileProps) => {
  return (
    <div 
      className="
        relative 
        inline-block 
        overflow-hidden
        rounded-full
        w-8
        h-8
        sm:w-10
        sm:h-10
      "
    >
      <Image 
        fill
        src={src}
        alt={alt}
      />
    </div>
  )
}
