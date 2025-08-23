interface UniversityAPI {
    name: string;
    state_province: string;
    country: string;
    web_pages: string[];
    domains: string[];
    alpha_two_code: string;
}

export interface PakistaniUniversity {
    id: string;
    name: string;
    province: string;
    city: string;
    type: 'Public' | 'Private';
    website: string;
    established: number;
    ranking?: number;
    programs: string[];
}

// Free API for Universities
export const fetchUniversitiesFromAPI = async (): Promise<UniversityAPI[]> => {
    try {
        const response = await fetch('http://universities.hipolabs.com/search?country=Pakistan');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching universities:', error);
        return [];
    }
};

// Enhanced Pakistani Universities Data
export const enhancedPakistaniUniversities: PakistaniUniversity[] = [
    {
        id: "university-of-karachi",
        name: "University of Karachi",
        province: "Sindh",
        city: "Karachi",
        type: "Public",
        website: "https://uok.edu.pk",
        established: 1951,
        ranking: 1,
        programs: ["BS Computer Science", "BBA", "MBA", "Engineering", "Medicine"]
    },
    {
        id: "lahore-university-of-management-sciences",
        name: "Lahore University of Management Sciences (LUMS)",
        province: "Punjab",
        city: "Lahore",
        type: "Private",
        website: "https://lums.edu.pk",
        established: 1984,
        ranking: 2,
        programs: ["BS Computer Science", "BBA", "MBA", "Engineering", "Economics"]
    },
    {
        id: "quaid-i-azam-university",
        name: "Quaid-i-Azam University",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://qau.edu.pk",
        established: 1967,
        ranking: 3,
        programs: ["BS Physics", "BS Chemistry", "BS Mathematics", "Economics", "International Relations"]
    },
    {
        id: "national-university-of-sciences-and-technology",
        name: "National University of Sciences and Technology (NUST)",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://nust.edu.pk",
        established: 1991,
        ranking: 4,
        programs: ["Engineering", "Computer Science", "Business", "Architecture", "Medicine"]
    },
    {
        id: "university-of-the-punjab",
        name: "University of the Punjab",
        province: "Punjab",
        city: "Lahore",
        type: "Public",
        website: "https://pu.edu.pk",
        established: 1882,
        ranking: 5,
        programs: ["Arts", "Sciences", "Commerce", "Law", "Engineering", "Medicine"]
    },
    {
        id: "pakistan-institute-of-engineering-and-applied-sciences",
        name: "Pakistan Institute of Engineering and Applied Sciences (PIEAS)",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://pieas.edu.pk",
        established: 1967,
        ranking: 6,
        programs: ["Nuclear Engineering", "Computer Science", "Electronics", "Materials Science"]
    },
    {
        id: "aga-khan-university",
        name: "Aga Khan University",
        province: "Sindh",
        city: "Karachi",
        type: "Private",
        website: "https://aku.edu",
        established: 1983,
        ranking: 7,
        programs: ["Medicine", "Nursing", "Business", "Education", "Media Studies"]
    },
    {
        id: "ghulam-ishaq-khan-institute",
        name: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
        province: "Khyber Pakhtunkhwa",
        city: "Topi",
        type: "Private",
        website: "https://giki.edu.pk",
        established: 1993,
        ranking: 8,
        programs: ["Engineering", "Computer Science", "Management Sciences"]
    },
    {
        id: "university-of-peshawar",
        name: "University of Peshawar",
        province: "Khyber Pakhtunkhwa",
        city: "Peshawar",
        type: "Public",
        website: "https://uop.edu.pk",
        established: 1950,
        ranking: 9,
        programs: ["Arts", "Sciences", "Islamic Studies", "Law", "Medicine"]
    },
    {
        id: "fast-national-university",
        name: "FAST National University of Computer and Emerging Sciences",
        province: "Multiple",
        city: "Karachi, Lahore, Islamabad",
        type: "Private",
        website: "https://nu.edu.pk",
        established: 2000,
        ranking: 10,
        programs: ["Computer Science", "Software Engineering", "Electrical Engineering", "Management Sciences"]
    }
];