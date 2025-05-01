"use client";

import React from "react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { ArrowRightIcon, Check, AlertCircle } from "lucide-react";

import { DotPattern } from "@/components/magicui/dot-pattern";

const Page = () => {
  return (
    <div className="relative z-10">
      <main className="pt-24 pb-16">
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
            <RainbowButton>Explore it now</RainbowButton>
          </div>

          {/* New Laptop Mockup Section */}
          <div className="mt-24 bg-card rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2">
                  <h2 className="text-3xl font-bold">Why Design Visually</h2>
                  <AlertCircle className="text-orange-500 w-5 h-5" />
                </div>
                <div className="space-y-4">
                  {[
                    {
                      number: "1",
                      title: "Visual Creation",
                      description:
                        "Drag tables, set columns, link relationships.",
                    },
                    {
                      number: "2",
                      title: "Instant SQL Output",
                      description: "Live SQL preview, copy or download.",
                    },
                    {
                      number: "3",
                      title: "Smart Productivity",
                      description: "Toggle theme, follow best practices.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mt-1">
                        <span className="text-orange-500 font-semibold">
                          {item.number}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                {/* Laptop Mockup */}
                <div className="relative mx-auto max-w-[600px]">
                  <div className="relative">
                    {/* Laptop Frame */}
                    <div className="bg-gray-800 rounded-t-xl p-2 aspect-[16/10]">
                      {/* Screen Content */}
                      <div className="bg-white rounded-lg h-full p-4 overflow-hidden"></div>
                    </div>
                    {/* Laptop Base */}
                    <div className="bg-gray-800 h-4 rounded-b-lg transform perspective-1000 rotateX-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section className="mt-24 grid md:grid-cols-3 gap-8 animate-fadeInUp">
            {[
              {
                title: "Voice Analysis",
                description:
                  "AI-powered insights to detect vocal issues and monitor improvements.",
              },
              {
                title: "Personalized Training",
                description:
                  "Custom exercises designed to enhance your vocal strength and clarity.",
              },
              {
                title: "Progress Insights",
                description:
                  "Track your vocal wellness with detailed reports and analytics.",
              },
            ].map((feature, index) => (
              <div key={index} className="relative border border-red-500 p-6">
                <DotPattern width={5} height={5} />
                <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
                <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-red-500 text-white" />
                <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-red-500 text-white" />
                <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-red-500 text-white" />

                <div className="relative z-10 bg-white dark:bg-transparent p-6 rounded-[30px] h-full">
                  <Check className="text-pink-500 mb-4" size={24} />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
    </div>
  );
};

export default Page;
