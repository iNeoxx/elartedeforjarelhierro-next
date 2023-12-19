import Image from "next/image";

export default function QuienesSomos(){
    return(
        <section className="container max-w-full pt-16 pb-16 text-center">
            <h2 className="font-bold max-[1024px]:text-2xl  lg:text-5xl">¿Quiénes Somos?</h2>
            <div className="pt-8 container max-w-full flex justify-center">
            <div className="flex items-center m-auto p-10 text-xs bg-[#EEEDED] rounded-xl max-[1024px]:w-11/12 lg:w-4/12 xl:w-4/12 2xl:w-1/2">
                <p className="text-base text-left">Lorem ipsum dolor sit amet consectetur adipiscing elit duis libero, nulla condimentum dignissim venenatis torquent facilisis a neque, conubia integer vitae interdum feugiat litora enim bibendum. Imperdiet nec sociosqu quis a habitant metus bibendum, scelerisque dignissim sollicitudin eros placerat penatibus pharetra porttitor, justo rhoncus arcu ut sem suscipit. Sed ullamcorper libero dictum dignissim blandit turpis quisque, duis pellentesque laoreet habitasse diam venenatis ligula pharetra, per taciti conubia purus dapibus vivamus. Nisl justo nec laoreet aliquet cras facilisis eros class suscipit, dictumst inceptos duis non nisi quisque convallis ante tortor, tellus sem blandit maecenas vulputate cursus pulvinar nascetur. Pellentesque enim luctus libero convallis vulputate duis quis fermentum, est elementum cras sagittis magna semper condimentum sollicitudin lacinia, parturient eleifend hac auctor dui aptent inceptos. Augue sagittis rhoncus vehicula volutpat per fringilla vulputate, integer morbi ullamcorper curae arcu risus luctus neque, proin vestibulum netus velit ut quisque.</p>
            </div>
            <div className="w-max pr-5 hidden lg:block">
                <Image
                    src="/assets/nosotros.png"
                    width={750}   
                    height={512}
                    className="rounded-2xl"
                    alt="Nosotros"            
                />
            </div>
            </div>
        </section>
    )
}