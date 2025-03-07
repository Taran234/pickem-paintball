"use client";

import React, { useRef } from "react";
import { GiGooeyImpact, GiGooeyMolecule } from "react-icons/gi";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface TickerItemProps {
    text: string;
}

const TickerItem: React.FC<TickerItemProps> = ({ text }) => {
    return (
        <div className="flex gap-6 items-center p-2 whitespace-nowrap">
            <GiGooeyMolecule
                color="black"
                className=" h-[32px] w-[50px] max-sm:h-[20px] max-sm:w-[20px]"
            />
            <span className="text-black font-bold">{text}</span>
        </div>
    );
};

export const NewsTicker: React.FC = () => {
    const targetRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const xRaw = useTransform(scrollYProgress, [0, 1], [0, -1000]); // Adjusted to control horizontal movement
    const x = useSpring(xRaw, { mass: 1, stiffness: 150, damping: 25 }); // Smoothened spring physics

    const tickerItems = [
        "Pick your squad",
        "follow the action live",
        "collect kills",
        "climb the leaderboard",
    ];

    return (
        <section
            ref={targetRef}
            className="overflow-hidden px-0 py-4 w-full bg-neutral-200"
        >
            <div className="relative flex items-center text-xl tracking-tight uppercase">
                <motion.div
                    style={{ x }}
                    className="flex whitespace-nowrap px-4 gap-8"
                >
                    {tickerItems.map((text, index) => (
                        <TickerItem key={index} text={text} />
                    ))}
                    {/* Duplicate ticker items for seamless looping */}
                    {tickerItems.map((text, index) => (
                        <TickerItem key={`loop-${index}`} text={text} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
