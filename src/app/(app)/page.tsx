"use client";
import Navbar from "@/components/Navbar";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Messages from "@/messages.json";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const Page = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <>
      <Navbar />
      <div className="flex justify-center flex-col text-center gap-2 mt-10">
        <h1 className="font-bold text-2xl">Welcome to Truth Tunnel</h1>
        <p className="font-bold">
          Here you can send anonymous messages to anyone and your identity remains secret
        </p>
      </div>
      <div className="flex justify-center mt-5">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {Messages.map(({ from, content }, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 flex-col gap-3">
                      <h1 className="font-bold text-2xl">{from}</h1>
                      <p className="font-bold text-xl text-gray-500">
                        {content}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex justify-center items-center mt-10 borer flex-col">
        <p>Made with ❤️ by Mitul Sonagara</p>
        <p>© 2024</p>
      </div>
    </>
  );
};

export default Page;