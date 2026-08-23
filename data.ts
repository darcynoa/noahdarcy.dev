const data: {
    id: number;
    name: string;
    image: string[];
    description: string;
    ctaColor: string;
    ctaText: string;
    ctaLink: string;
}[] = [
    {
        id: 1,
        name: "At The Helm Productions",
        image: ["/work/athp-2.png"],
        description:
            "An astonishing website put together to promote a budding film company with their first short film",
        ctaColor: "bg-red",
        ctaText: "See the site!",
        ctaLink: "https://atthehelmproductions.com",
    },
    {
        id: 2,
        name: "Plant Based Coneys",
        image: ["/work/pbc-1.png"],
        description:
            "This was one of my most fun builds, for something that I was so passionate about. I’m glad I was able to work with them 💚",
        ctaColor: "bg-red",
        ctaLink: "https://plantbasedconeys.com",
        ctaText: "Check it out!",
    },
    {
        id: 3,
        name: "Nook's Cranny",
        image: ["/work/nc-1.png", "/work/athp-2.png"],
        description:
            "This one has yet to conceive itself but I'm so excited for it to become a thing.",
        ctaColor: "bg-green",
        ctaLink: "#",
        ctaText: "this is fake!",
    },
];

export default data;
