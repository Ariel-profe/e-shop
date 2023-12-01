import Image from "next/image"

export const HomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 rounded-md">
        <div className="flex flex-col md:flex-row items-center justify-evenly gap-2 mx-auto px-8 py-12">
            <div className="mb-8 md:mb-0 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Summer Sale</h1>
                <p className="text-lg md:text-xl text-white mb-2">Enjoy discounts on selected items</p>
                <p className="text-2xl md:text-5xl text-yellow-400 font-bold">GET 50% OFF</p>
            </div>
            <div className="w-1/3 relative aspect-video">
                <Image src="/banner-image.png" alt="banner-image" fill className="object-contain" />
            </div>
        </div>
    </div>
  )
}
