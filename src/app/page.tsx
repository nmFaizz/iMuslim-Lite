import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import { cta, mainFeatures } from "./constants/home";
import Link from "next/link";
import Hero from "@/components/home/Hero";

export default function PageHome() {
  return (
    <MainLayout
      containerSize="1200"
      withNavbar
    >
      <Hero />

      <section className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-5">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="border p-5 flex flex-col items-center justify-center text-center rounded-xl bg-background">
              <div className="w-[50px] h-[50px] bg-secondary-purple dark:bg-primary-purple rounded-lg flex items-center justify-center">
                {feature.icon}
              </div>

              <h3 className="font-bold text-2xl mt-4">
                {feature.title}
              </h3>
              <p>
                {feature.description}
              </p>
            </div>
          ))}
      </section>

      <section className="mt-12 md:mt-24 space-y-12">
        {cta.map((data, i) => (
          <div key={i} className="flex gap-8 md:gap-12 flex-col md:flex-row">
            <figure>
              <Image 
                src={data.image.src}
                alt={data.image.alt}
                width={data.image.width}
                height={data.image.height}
              />
            </figure>

            <div className="space-y-5 max-w-[470px]">
              <h2 className="font-semibold text-2xl">
                {data.title}
              </h2>

              <p>
                {data.description}
              </p>

              <Link href={data.button.href}>
                <Button>
                  <span className="flex items-center gap-2">
                    {data.button.text}
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </MainLayout>
  );
}

