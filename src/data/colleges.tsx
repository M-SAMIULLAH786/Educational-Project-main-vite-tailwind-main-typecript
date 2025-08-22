export interface CollegeLink {
    label: string
    url: string
    type?: "prospectus" | "website" | "other"
}

export interface College {
    slug: string
    title: string
    subtitle?: string
    shortDescription: string
    longDescription: string
    image?: string
    links: CollegeLink[]
    degrees: string[]
}

export const colleges: College[] = [
    {
        slug: "ips-uni-unit-of-education",
        title: "IPS Uni (Unit Of Education)",
        subtitle: "An Intermediate and BS Level Institute",
        shortDescription: "Private higher-education institute in Lahore.",
        longDescription:
            "The college, by its present name, focuses on modern professional and academic programs emphasizing practical skill development, applied learning, and industry alignment. Through mentorship, labs, and project-based curricula, it prepares students for competitive roles across technology and business sectors.",
        image: "https://gdscl.edu.pk/wp-content/uploads/2025/04/College-Cover-Photo.jpg",
        links: [
            { label: "Prospectus", url: "#", type: "prospectus" },
            { label: "College Website", url: "https://example.com", type: "website" }
        ],
        degrees: [
            "FSC (Pre-Engineering)",
            "FSC (Pre-Medical)",
            "ICS (Physics)",
            "ICS (Statistics)",
            "ICS (Economics)",
            "ICom",
            "BS (BBA)",
            "BS Computer Science",
            "BS Software Engineering",
            "BS Information Technology",
            "BS Data Science",
            "BS Artificial Intelligence",
            "BS Cybersecurity",
            "BS Economics",
            "BS English",
            "BS Islamic Studies",
            "BS Mathematics",
            "BS Physics",
            "BS Zoology",
            "BS Statistics",
            "BS Political Science",
            "BS Sociology"
        ]
    },
    {
        slug: "inspire-education-consultants",
        title: "Inspire Education Consultants",
        subtitle: "Established in 2009",
        shortDescription: "Education consultancy & study abroad guidance.",
        longDescription:
            "Inspire Education Consultants (est. 2009) provides structured counseling, test prep coordination, visa guidance, and scholarship application support for students seeking international academic pathways across multiple regions.",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/cd/e3/29/aitchison-college-lahore.jpg?w=1200&h=-1&s=1",
        links: [
            { label: "Prospectus", url: "#" },
            { label: "College Website", url: "https://example.com" }
        ],
        degrees: [
            "Advisory (UK)",
            "Advisory (USA)",
            "Advisory (Canada)",
            "Advisory (Europe)",
            "IELTS Guidance",
            "Visa Support"
        ]
    },
    {
        slug: "genuine-technology-of-computer-college",
        title: "Genuine Technology of Computer College",
        subtitle: "IT & Computer-Science Programs",
        shortDescription: "IT & computer-science programs.",
        longDescription:
            "Focused on foundational and advanced computing, the college delivers lab-intensive curricula, certification pathways, and portfolio-oriented projects for software, networking, and emerging technologies.",
        image: "https://gdscl.edu.pk/wp-content/uploads/2025/04/College-Cover-Photo.jpg",
        links: [
            { label: "Prospectus", url: "#" },
            { label: "College Website", url: "#" }
        ],
        degrees: [
            "FSC (Pre-Engineering)",
            "ICS (Physics)",
            "ICS (Statistics)",
            "ICS (Economics)",
            "ICom",
            "BS Computer Science",
            "BS Software Engineering",
            "BS Information Technology",
            "BS AI",
            "ADP Computer Science"
        ]
    },
    {
        slug: "matiz-education-consultants",
        title: "Matiz Education Consultants",
        subtitle: "Career Guidance & Abroad Study Services",
        shortDescription: "Career guidance & abroad study services.",
        longDescription:
            "Matiz Education Consultants offers personalized academic profiling, pathway planning, documentation support, and interview preparation for students pursuing international degrees.",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/cd/e3/29/aitchison-college-lahore.jpg?w=1200&h=-1&s=1",
        links: [
            { label: "Prospectus", url: "#" },
            { label: "College Website", url: "#" }
        ],
        degrees: [
            "Career Counseling",
            "International Admissions",
            "Scholarship Guidance",
            "Visa Advisory"
        ]
    },
    {
        slug: "nordic-international-school-lahore",
        title: "Nordic International School Lahore",
        subtitle: "International Curriculum School",
        shortDescription: "International curriculum school.",
        longDescription:
            "Nordic International School Lahore blends global curriculum standards with localized enrichment, focusing on inquiry-based learning, languages, and STEAM integration.",
        image: "https://gdscl.edu.pk/wp-content/uploads/2025/04/College-Cover-Photo.jpg",
        links: [
            { label: "Prospectus", url: "#" },
            { label: "College Website", url: "#" }
        ],
        degrees: [
            "Primary Years",
            "Middle School",
            "IGCSE Pathway",
            "A-Level Prep"
        ]
    }
]

export function getCollege(slug: string) {
    return colleges.find(c => c.slug === slug)
}