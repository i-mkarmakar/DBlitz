"use client";

import React from "react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { ArrowRightIcon } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";

const Page = () => {
  const { theme } = useTheme();

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <a
        href="https://github.com/i-mkarmakar"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 right-0"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          style={{
            fill: "#fff",
            color: "#000",
            border: 0,
            position: "absolute",
            top: 0,
            right: 0,
          }}
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 
            C122.0,82.7 120.5,78.6 120.5,78.6 
            C119.2,72.0 123.4,76.3 123.4,76.3 
            C127.3,80.9 125.5,87.3 125.5,87.3 
            C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: "130px 106px" }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 
            C114.9,115.1 118.7,116.5 119.8,115.4 
            L133.7,101.6 
            C136.9,99.2 139.9,98.4 142.2,98.6 
            C133.8,88.0 127.5,74.4 143.8,58.0 
            C148.5,53.4 154.0,51.2 159.7,51.0 
            C160.3,49.4 163.2,43.6 171.4,40.1 
            C171.4,40.1 176.1,42.5 178.8,56.2 
            C183.1,58.6 187.2,61.8 190.9,65.4 
            C194.5,69.0 197.7,73.2 200.1,77.6 
            C213.8,80.2 216.3,84.9 216.3,84.9 
            C212.7,93.1 206.9,96.0 205.4,96.6 
            C205.1,102.4 203.0,107.8 198.3,112.5 
            C181.9,128.9 168.3,122.5 157.7,114.1 
            C157.9,116.9 156.7,120.9 152.7,124.9 
            L141.0,136.5 
            C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </a>

      <main className="flex-grow pt-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 animate-fadeInUp">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 group">
              <span>⚡ Introducing DBlitz</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
            <h1 className="text-5xl sm:text-6xl font-bold">
              Build{" "}
              <LineShadowText className="italic" shadowColor="#ffffff">
                SQL
              </LineShadowText>{" "}
              Databases Visually, <br /> Export Instantly.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Design and manage your entire schema with drag-and-drop ease and
              live SQL generation — all in one place.
            </p>
            <RainbowButton
              onClick={() => (window.location.href = "/Editor")}
              className="mt-6"
            >
              Explore it now
            </RainbowButton>
          </div>
          <MagicCard
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            className="p-0"
          >
            <div className="mt-24 mb-12 bg-transparent border rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Think Visually, Design Smarter
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      {
                        number: "1",
                        title: "Visual Creation",
                        description:
                          "Start by dragging tables, setting columns, and linking relationships.",
                      },
                      {
                        number: "2",
                        title: "Instant SQL Output",
                        description:
                          "Preview the SQL statements based on design, copy or download them.",
                      },
                      {
                        number: "3",
                        title: "Smart Productivity",
                        description:
                          "Toggle themes and follow best practices for efficient design.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="min-w-5 min-h-5 sm:min-w-6 sm:min-h-6 rounded-full bg-[#ff5941] flex items-center justify-center mt-1 text-white text-[9px] sm:text-[10px]">
                          <span className="font-semibold">{item.number}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-base sm:text-lg">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative mt-8 md:mt-0">
                  <div className="mx-auto w-full max-w-[500px] sm:max-w-[600px] px-2">
                    <div className="bg-gray-800 rounded-t-xl p-2 aspect-[16/10]">
                      <div className="bg-white rounded-lg h-full p-4 overflow-hidden"></div>
                    </div>
                    <div className="bg-gray-800 h-4 rounded-b-lg transform perspective-1000 rotate-x-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </MagicCard>
        </section>
      </main>
    </div>
  );
};

export default Page;
