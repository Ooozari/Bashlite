import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";


/* --- Headings --- */
const headingVariants = cva(
    "",
    {
        variants: {
            level: {
                h1: "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[64px]",
                h3: "text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[42px] 2xl:text-[48px]",
                h4: "text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px]",
                h5: "text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[18px]",
                large: "text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]",
                normal: "text-[14px] md:text-[16px]",
                medium: "text-[16px] md:text-[18px]",
                pageheading: "text-[20px] sm:text-[24px] md:text-[28px] lg:text-[30px] xl:text-[32px] 2xl:text-[36px] leading-[1.2]",
                sectionheading: "text-[20px] sm:text-[21px] md:text-[22px] lg:text-[24px] xl:text-[25px] 2xl:text-[26px] leading-[1.3]",
               

            },
        },
        defaultVariants: { level: "h1" },
    }
);
const headingTagMap = {
    h1: "h1",
    normal: "p",
    medium: "p",
    pageheading: "h2",
    sectionheading: "h3",
};

export function Heading({ className, level = "h1", children }) {
    const Tag = headingTagMap[level] || "p"; // ✅ safe mapping
    return (
        <Tag className={cn(headingVariants({ level }), className)}>
            {children}
        </Tag>
    );
}


/* --- Paragraph --- */
const paragraphVariants = cva("", {
    variants: {
        size: {
            xxl: "text-[18px] md:text-[20px] xl:text-[22px]",
            xl: "text-[14px] md:text-[16px] xl:text-[18px]",
            large: "text-[14px] md:text-[16px]",
            normal: "text-[12px] md:text-[14px]",
            label: "text-[12px] md:text-[14px] font-[700]",
            btntext: "text-[14px] md:text-[16px] font-[500]",
            minibtntext: "text-[12px] md:text-[12px] font-[800]",
            sm: "text-[12px]",

        },
    },
    defaultVariants: { size: "label" },
});

export function Paragraph({ className, size = "label", children }) {
    return <p className={cn(paragraphVariants({ size }), className)}>{children}</p>;
}
