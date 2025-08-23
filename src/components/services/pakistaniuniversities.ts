export interface PakistaniUniversity {
    id: string;
    name: string;
    shortName: string;
    province: string;
    city: string;
    type: 'Public' | 'Private';
    website: string;
    established: number;
    ranking: number;
    image: string;
    logo: string;
    students: number;
    faculty: number;
    campuses: number;
    acres: number;
    chancellor?: string;
    vicechancellor?: string;
    programs: string[];
    faculties: string[];
    contact: {
        phone: string;
        email: string;
        address: string;
        fax?: string;
    };
    accreditation: string[];
    affiliations: string[];
    notable_alumni: string[];
    research_areas: string[];
    description: string;
    admission_requirements: string;
    tuition_fee_range: string;
    scholarships: string[];
    hostel_facilities: boolean;
    library: {
        books: number;
        digital_resources: boolean;
        study_spaces: number;
    };
    sports_facilities: string[];
    international_programs: boolean;
    exchange_programs: string[];
}

export const pakistaniUniversities: PakistaniUniversity[] = [
    {
        id: "university-of-karachi",
        name: "University of Karachi",
        shortName: "KU",
        province: "Sindh",
        city: "Karachi",
        type: "Public",
        website: "https://uok.edu.pk",
        established: 1951,
        ranking: 1,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/University_of_Karachi_Main_Building.jpg/1200px-University_of_Karachi_Main_Building.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/University_of_Karachi_logo.png/150px-University_of_Karachi_logo.png",
        students: 24000,
        faculty: 1200,
        campuses: 3,
        acres: 1279,
        chancellor: "Governor of Sindh",
        vicechancellor: "Prof. Dr. Khalid Mahmood Iraqi",
        programs: ["BS", "MS", "PhD", "MBA", "BBA", "MA", "BA"],
        faculties: ["Arts", "Science", "Commerce", "Law", "Engineering", "Medicine", "Pharmacy", "Education"],
        contact: {
            phone: "+92-21-99261300-8",
            email: "info@uok.edu.pk",
            address: "University Road, Karachi-75270, Sindh, Pakistan",
            fax: "+92-21-99261340"
        },
        accreditation: ["HEC", "PEC", "PMDC", "PPC"],
        affiliations: ["Association of Commonwealth Universities", "Islamic University Association"],
        notable_alumni: ["Arif Alvi", "Anwar Maqsood", "Tariq Aziz"],
        research_areas: ["Marine Sciences", "Computer Science", "Economics", "International Relations"],
        description: "The University of Karachi is a public research university located in Karachi, Sindh, Pakistan. It was established in 1951 and is one of Pakistan's largest universities by enrollment.",
        admission_requirements: "Intermediate (FSc/FA/ICS) with minimum 50% marks",
        tuition_fee_range: "PKR 15,000 - 50,000 per semester",
        scholarships: ["Merit Scholarships", "Need-based Aid", "Punjab Educational Endowment Fund"],
        hostel_facilities: true,
        library: {
            books: 400000,
            digital_resources: true,
            study_spaces: 500
        },
        sports_facilities: ["Cricket Ground", "Football Field", "Gymnasium", "Swimming Pool"],
        international_programs: true,
        exchange_programs: ["Erasmus+", "US Fulbright", "China Scholarship Council"]
    },
    {
        id: "lahore-university-of-management-sciences",
        name: "Lahore University of Management Sciences",
        shortName: "LUMS",
        province: "Punjab",
        city: "Lahore",
        type: "Private",
        website: "https://lums.edu.pk",
        established: 1984,
        ranking: 2,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/LUMS_Academic_Block.jpg/1200px-LUMS_Academic_Block.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/LUMS_logo.png/150px-LUMS_logo.png",
        students: 4500,
        faculty: 350,
        campuses: 1,
        acres: 100,
        chancellor: "Syed Babar Ali",
        vicechancellor: "Dr. Arshad Ahmad",
        programs: ["BS", "MS", "PhD", "MBA", "Executive Education"],
        faculties: ["Business", "Engineering", "Humanities & Social Sciences", "Law"],
        contact: {
            phone: "+92-42-35608000",
            email: "admissions@lums.edu.pk",
            address: "Opposite Sector U, DHA, Lahore Cantt, 54792, Punjab, Pakistan"
        },
        accreditation: ["HEC", "AACSB", "PEC"],
        affiliations: ["AACSB International", "Association of MBAs"],
        notable_alumni: ["Ali Jehangir Siddiqui", "Faisal Sultan", "Maria Usman"],
        research_areas: ["Business Analytics", "Renewable Energy", "Public Policy", "Computer Science"],
        description: "LUMS is a private research university known for its rigorous academic programs and diverse student body from across Pakistan and beyond.",
        admission_requirements: "SAT/LUMS Admission Test with excellent academic record",
        tuition_fee_range: "PKR 200,000 - 400,000 per semester",
        scholarships: ["National Outreach Programme", "Merit Scholarships", "International Scholarships"],
        hostel_facilities: true,
        library: {
            books: 150000,
            digital_resources: true,
            study_spaces: 800
        },
        sports_facilities: ["Sports Complex", "Cricket Ground", "Tennis Courts", "Squash Courts"],
        international_programs: true,
        exchange_programs: ["MIT", "Stanford", "Oxford", "Cambridge"]
    },
    {
        id: "quaid-i-azam-university",
        name: "Quaid-i-Azam University",
        shortName: "QAU",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://qau.edu.pk",
        established: 1967,
        ranking: 3,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Quaid-i-Azam_University_main_building.jpg/1200px-Quaid-i-Azam_University_main_building.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Quaid-e-Azam_University_logo.png/150px-Quaid-e-Azam_University_logo.png",
        students: 13000,
        faculty: 800,
        campuses: 1,
        acres: 1700,
        chancellor: "President of Pakistan",
        vicechancellor: "Prof. Dr. Muhammad Ali",
        programs: ["BS", "MS", "M.Phil", "PhD"],
        faculties: ["Natural Sciences", "Social Sciences", "Biological Sciences"],
        contact: {
            phone: "+92-51-90642172",
            email: "info@qau.edu.pk",
            address: "University Road, Islamabad, Pakistan"
        },
        accreditation: ["HEC", "UNESCO"],
        affiliations: ["Association of Commonwealth Universities"],
        notable_alumni: ["Pervez Hoodbhoy", "Hoodbhoy Pervez"],
        research_areas: ["Nuclear Physics", "Biotechnology", "Economics", "International Relations"],
        description: "QAU is a public research university in Islamabad, known for its strong programs in natural and social sciences.",
        admission_requirements: "Intermediate with minimum 60% marks",
        tuition_fee_range: "PKR 20,000 - 60,000 per semester",
        scholarships: ["HEC Scholarships", "Merit Awards"],
        hostel_facilities: true,
        library: {
            books: 350000,
            digital_resources: true,
            study_spaces: 400
        },
        sports_facilities: ["Sports Complex", "Cricket Ground", "Hockey Field"],
        international_programs: true,
        exchange_programs: ["Germany DAAD", "China Scholarship Council"]
    },
    {
        id: "national-university-of-sciences-and-technology",
        name: "National University of Sciences and Technology",
        shortName: "NUST",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://nust.edu.pk",
        established: 1991,
        ranking: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NUST_Main_Campus.jpg/1200px-NUST_Main_Campus.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/NUST_Logo.png/150px-NUST_Logo.png",
        students: 18000,
        faculty: 1100,
        campuses: 5,
        acres: 1000,
        chancellor: "General (R) Zubair Mahmood Hayat",
        vicechancellor: "Lt Gen Javed Mahmood Bukhari (R)",
        programs: ["BS", "MS", "PhD", "MBA"],
        faculties: ["Engineering", "IT", "Management Sciences", "Architecture", "Medicine"],
        contact: {
            phone: "+92-51-90855600",
            email: "info@nust.edu.pk",
            address: "H-12, Islamabad, Pakistan"
        },
        accreditation: ["HEC", "PEC", "PMDC", "NBA"],
        affiliations: ["QS World Rankings", "THE Rankings"],
        notable_alumni: ["Various Tech Leaders", "Military Officers"],
        research_areas: ["Engineering", "Computer Science", "Nanotechnology", "Robotics"],
        description: "NUST is a premier technology university in Pakistan with strong engineering and IT programs.",
        admission_requirements: "NET Entry Test with high scores",
        tuition_fee_range: "PKR 80,000 - 150,000 per semester",
        scholarships: ["Merit Scholarships", "Need-based Aid"],
        hostel_facilities: true,
        library: {
            books: 250000,
            digital_resources: true,
            study_spaces: 600
        },
        sports_facilities: ["Sports Complex", "Swimming Pool", "Gymnasium"],
        international_programs: true,
        exchange_programs: ["MIT", "Carnegie Mellon", "Technical University of Munich"]
    },
    {
        id: "university-of-the-punjab",
        name: "University of the Punjab",
        shortName: "PU",
        province: "Punjab",
        city: "Lahore",
        type: "Public",
        website: "https://pu.edu.pk",
        established: 1882,
        ranking: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Punjab_University_Old_Campus.jpg/1200px-Punjab_University_Old_Campus.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/University_of_the_Punjab_logo.png/150px-University_of_the_Punjab_logo.png",
        students: 35000,
        faculty: 1800,
        campuses: 4,
        acres: 1800,
        chancellor: "Governor of Punjab",
        vicechancellor: "Prof. Dr. Niaz Ahmad",
        programs: ["BA", "BS", "MA", "MS", "M.Phil", "PhD", "LLB", "MBBS"],
        faculties: ["Arts", "Sciences", "Commerce", "Law", "Engineering", "Medicine", "Islamic Studies"],
        contact: {
            phone: "+92-42-99232245",
            email: "info@pu.edu.pk",
            address: "Quaid-e-Azam Campus, Lahore-54590, Punjab, Pakistan"
        },
        accreditation: ["HEC", "PEC", "PMDC", "PBC"],
        affiliations: ["Association of Commonwealth Universities"],
        notable_alumni: ["Allama Iqbal", "Faiz Ahmed Faiz", "Abdus Salam"],
        research_areas: ["Oriental Studies", "Physics", "Chemistry", "Computer Science"],
        description: "The University of the Punjab is the oldest university in Pakistan, established in 1882.",
        admission_requirements: "Intermediate with minimum 45% marks",
        tuition_fee_range: "PKR 12,000 - 45,000 per semester",
        scholarships: ["Merit Scholarships", "Punjab Educational Endowment Fund"],
        hostel_facilities: true,
        library: {
            books: 600000,
            digital_resources: true,
            study_spaces: 800
        },
        sports_facilities: ["Sports Ground", "Gymnasium", "Swimming Pool"],
        international_programs: true,
        exchange_programs: ["UK Universities", "US Universities"]
    },
    {
        id: "pakistan-institute-of-engineering-and-applied-sciences",
        name: "Pakistan Institute of Engineering and Applied Sciences",
        shortName: "PIEAS",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://pieas.edu.pk",
        established: 1967,
        ranking: 6,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/PIEAS_Campus.jpg/1200px-PIEAS_Campus.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/PIEAS_logo.png/150px-PIEAS_logo.png",
        students: 2000,
        faculty: 200,
        campuses: 1,
        acres: 30,
        chancellor: "Chairman Pakistan Atomic Energy Commission",
        vicechancellor: "Dr. Muhammad Yousaf",
        programs: ["BS", "MS", "PhD"],
        faculties: ["Engineering", "Natural Sciences"],
        contact: {
            phone: "+92-51-9248-2357",
            email: "info@pieas.edu.pk",
            address: "Nilore, Islamabad, Pakistan"
        },
        accreditation: ["HEC", "PEC"],
        affiliations: ["IAEA", "International Nuclear Universities"],
        notable_alumni: ["Nuclear Scientists", "Engineers"],
        research_areas: ["Nuclear Engineering", "Materials Science", "Electronics"],
        description: "PIEAS is a specialized university focusing on nuclear engineering and applied sciences.",
        admission_requirements: "PIEAS Entry Test with excellent academic record",
        tuition_fee_range: "PKR 25,000 - 50,000 per semester",
        scholarships: ["PAEC Scholarships", "Merit Awards"],
        hostel_facilities: true,
        library: {
            books: 50000,
            digital_resources: true,
            study_spaces: 200
        },
        sports_facilities: ["Sports Ground", "Gymnasium"],
        international_programs: true,
        exchange_programs: ["IAEA", "European Universities"]
    },
    {
        id: "aga-khan-university",
        name: "Aga Khan University",
        shortName: "AKU",
        province: "Sindh",
        city: "Karachi",
        type: "Private",
        website: "https://aku.edu",
        established: 1983,
        ranking: 7,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/AKU_Hospital.jpg/1200px-AKU_Hospital.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Aga_Khan_University_logo.png/150px-Aga_Khan_University_logo.png",
        students: 3000,
        faculty: 400,
        campuses: 2,
        acres: 80,
        chancellor: "His Highness the Aga Khan",
        vicechancellor: "Dr. Sunil Dodani",
        programs: ["MBBS", "BScN", "MEd", "MBA", "MS"],
        faculties: ["Medicine", "Nursing", "Education", "Business"],
        contact: {
            phone: "+92-21-34930051",
            email: "info@aku.edu",
            address: "Stadium Road, Karachi-74800, Pakistan"
        },
        accreditation: ["HEC", "PMDC", "PNC"],
        affiliations: ["Aga Khan Development Network"],
        notable_alumni: ["Medical Professionals", "Healthcare Leaders"],
        research_areas: ["Health Sciences", "Education", "Business"],
        description: "AKU is an international university committed to excellence in education, research, and service.",
        admission_requirements: "MCAT/MDCAT for Medicine, specific tests for other programs",
        tuition_fee_range: "PKR 300,000 - 800,000 per semester",
        scholarships: ["Need-based Aid", "Merit Scholarships"],
        hostel_facilities: true,
        library: {
            books: 100000,
            digital_resources: true,
            study_spaces: 300
        },
        sports_facilities: ["Gymnasium", "Tennis Court"],
        international_programs: true,
        exchange_programs: ["Harvard", "Johns Hopkins", "McMaster"]
    },
    {
        id: "ghulam-ishaq-khan-institute",
        name: "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
        shortName: "GIKI",
        province: "Khyber Pakhtunkhwa",
        city: "Topi",
        type: "Private",
        website: "https://giki.edu.pk",
        established: 1993,
        ranking: 8,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/GIKI_Campus.jpg/1200px-GIKI_Campus.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/GIKI_logo.png/150px-GIKI_logo.png",
        students: 3500,
        faculty: 250,
        campuses: 1,
        acres: 400,
        chancellor: "Board of Governors",
        vicechancellor: "Prof. Dr. Jehanzeb Khan",
        programs: ["BS", "MS", "PhD"],
        faculties: ["Engineering", "Computer Science", "Management Sciences"],
        contact: {
            phone: "+92-938-271858-60",
            email: "info@giki.edu.pk",
            address: "Topi-23640, District Swabi, KPK, Pakistan"
        },
        accreditation: ["HEC", "PEC", "ABET"],
        affiliations: ["MIT", "Technical Universities"],
        notable_alumni: ["Tech Entrepreneurs", "Engineers"],
        research_areas: ["Electrical Engineering", "Computer Science", "Energy"],
        description: "GIKI is a leading engineering university with strong industry connections.",
        admission_requirements: "GIKI Entry Test with excellent academic record",
        tuition_fee_range: "PKR 120,000 - 200,000 per semester",
        scholarships: ["Merit Scholarships", "Need-based Aid"],
        hostel_facilities: true,
        library: {
            books: 80000,
            digital_resources: true,
            study_spaces: 400
        },
        sports_facilities: ["Sports Complex", "Cricket Ground"],
        international_programs: true,
        exchange_programs: ["MIT", "Purdue", "Technical Universities"]
    },
    {
        id: "university-of-peshawar",
        name: "University of Peshawar",
        shortName: "UoP",
        province: "Khyber Pakhtunkhwa",
        city: "Peshawar",
        type: "Public",
        website: "https://uop.edu.pk",
        established: 1950,
        ranking: 9,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/University_of_Peshawar.jpg/1200px-University_of_Peshawar.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a8/University_of_Peshawar_logo.png/150px-University_of_Peshawar_logo.png",
        students: 16000,
        faculty: 900,
        campuses: 2,
        acres: 1000,
        chancellor: "Governor of KPK",
        vicechancellor: "Prof. Dr. Muhammad Idrees",
        programs: ["BA", "BS", "MA", "MS", "M.Phil", "PhD"],
        faculties: ["Arts", "Sciences", "Social Sciences", "Islamic Studies"],
        contact: {
            phone: "+92-91-9216750",
            email: "info@uop.edu.pk",
            address: "University Road, Peshawar-25120, KPK, Pakistan"
        },
        accreditation: ["HEC"],
        affiliations: ["Association of Commonwealth Universities"],
        notable_alumni: ["Scholars", "Politicians"],
        research_areas: ["Pashto Studies", "Islamic Studies", "Area Studies"],
        description: "University of Peshawar is a major public university in northwestern Pakistan.",
        admission_requirements: "Intermediate with minimum 45% marks",
        tuition_fee_range: "PKR 10,000 - 30,000 per semester",
        scholarships: ["Merit Scholarships", "KPK Government Scholarships"],
        hostel_facilities: true,
        library: {
            books: 250000,
            digital_resources: true,
            study_spaces: 500
        },
        sports_facilities: ["Sports Ground", "Gymnasium"],
        international_programs: false,
        exchange_programs: ["Limited Programs"]
    },
    {
        id: "fast-national-university",
        name: "FAST National University of Computer and Emerging Sciences",
        shortName: "FAST-NU",
        province: "Multiple",
        city: "Karachi, Lahore, Islamabad, Peshawar, Faisalabad",
        type: "Private",
        website: "https://nu.edu.pk",
        established: 2000,
        ranking: 10,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/FAST_NU_Karachi.jpg/1200px-FAST_NU_Karachi.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/FAST_logo.png/150px-FAST_logo.png",
        students: 12000,
        faculty: 600,
        campuses: 5,
        acres: 200,
        chancellor: "Board of Governors",
        vicechancellor: "Dr. Amir Ali",
        programs: ["BS", "MS", "PhD"],
        faculties: ["Computer Science", "Engineering", "Management Sciences"],
        contact: {
            phone: "+92-21-34520448",
            email: "info@nu.edu.pk",
            address: "A.K. Brohi Road, H-11/4, Islamabad, Pakistan"
        },
        accreditation: ["HEC", "PEC", "NCEAC"],
        affiliations: ["International Computer Science Programs"],
        notable_alumni: ["Software Engineers", "Tech Entrepreneurs"],
        research_areas: ["Computer Science", "Software Engineering", "AI"],
        description: "FAST-NU is a leading computer science and engineering university with multiple campuses.",
        admission_requirements: "FAST Entry Test with strong academic background",
        tuition_fee_range: "PKR 80,000 - 150,000 per semester",
        scholarships: ["Merit Scholarships", "Need-based Aid"],
        hostel_facilities: true,
        library: {
            books: 120000,
            digital_resources: true,
            study_spaces: 800
        },
        sports_facilities: ["Sports Complex", "Cricket Ground"],
        international_programs: true,
        exchange_programs: ["Carnegie Mellon", "TU Munich"]
    },
    // Continue with more universities...
    {
        id: "university-of-engineering-and-technology-lahore",
        name: "University of Engineering and Technology Lahore",
        shortName: "UET Lahore",
        province: "Punjab",
        city: "Lahore",
        type: "Public",
        website: "https://uet.edu.pk",
        established: 1921,
        ranking: 11,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/UET_Lahore_Main_Building.jpg/1200px-UET_Lahore_Main_Building.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/UET_Lahore_logo.png/150px-UET_Lahore_logo.png",
        students: 15000,
        faculty: 800,
        campuses: 4,
        acres: 300,
        chancellor: "Governor of Punjab",
        vicechancellor: "Prof. Dr. Shahid Munir",
        programs: ["BS", "MS", "PhD"],
        faculties: ["Engineering", "Architecture", "Technology"],
        contact: {
            phone: "+92-42-99029245",
            email: "info@uet.edu.pk",
            address: "G.T. Road, Lahore-54890, Punjab, Pakistan"
        },
        accreditation: ["HEC", "PEC", "ABET"],
        affiliations: ["Commonwealth Universities"],
        notable_alumni: ["Engineers", "Architects"],
        research_areas: ["Civil Engineering", "Electrical Engineering", "Computer Engineering"],
        description: "UET Lahore is the oldest engineering university in Pakistan.",
        admission_requirements: "ECAT with intermediate pre-engineering",
        tuition_fee_range: "PKR 30,000 - 80,000 per semester",
        scholarships: ["Merit Scholarships", "Punjab Government Scholarships"],
        hostel_facilities: true,
        library: {
            books: 150000,
            digital_resources: true,
            study_spaces: 600
        },
        sports_facilities: ["Engineering Sports Complex", "Cricket Ground"],
        international_programs: true,
        exchange_programs: ["German Universities", "US Universities"]
    },
    {
        id: "comsats-university",
        name: "COMSATS University Islamabad",
        shortName: "CUI",
        province: "Multiple",
        city: "Islamabad, Lahore, Karachi, Peshawar, Abbottabad",
        type: "Public",
        website: "https://comsats.edu.pk",
        established: 1998,
        ranking: 12,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/COMSATS_Islamabad.jpg/1200px-COMSATS_Islamabad.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/COMSATS_logo.png/150px-COMSATS_logo.png",
        students: 45000,
        faculty: 2000,
        campuses: 7,
        acres: 500,
        chancellor: "Federal Government",
        vicechancellor: "Prof. Dr. Muhammad Tabassum Afzal",
        programs: ["BS", "MS", "PhD"],
        faculties: ["Engineering", "Computer Science", "Business", "Sciences"],
        contact: {
            phone: "+92-51-9049-3000",
            email: "info@comsats.edu.pk",
            address: "Park Road, Chak Shahzad, Islamabad, Pakistan"
        },
        accreditation: ["HEC", "PEC", "NCEAC"],
        affiliations: ["COMSATS Science & Technology Network"],
        notable_alumni: ["IT Professionals", "Engineers"],
        research_areas: ["Computer Science", "Engineering", "Biotechnology"],
        description: "COMSATS is a technology-focused university with multiple campuses across Pakistan.",
        admission_requirements: "COMSATS Entry Test",
        tuition_fee_range: "PKR 40,000 - 100,000 per semester",
        scholarships: ["Merit Scholarships", "Need-based Aid"],
        hostel_facilities: true,
        library: {
            books: 200000,
            digital_resources: true,
            study_spaces: 1000
        },
        sports_facilities: ["Sports Complex", "Multiple Grounds"],
        international_programs: true,
        exchange_programs: ["International Technology Programs"]
    },
    {
        id: "air-university",
        name: "Air University",
        shortName: "AU",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://au.edu.pk",
        established: 2002,
        ranking: 13,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Air_University_Islamabad.jpg/1200px-Air_University_Islamabad.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Air_University_logo.png/150px-Air_University_logo.png",
        students: 8000,
        faculty: 400,
        campuses: 2,
        acres: 200,
        chancellor: "Chief of Air Staff",
        vicechancellor: "Air Marshal (R) Javaid Ahmed",
        programs: ["BS", "MS", "PhD"],
        faculties: ["Engineering", "Computer Science", "Management Sciences"],
        contact: {
            phone: "+92-51-9062-9391",
            email: "info@au.edu.pk",
            address: "PAF Complex E-9, Islamabad, Pakistan"
        },
        accreditation: ["HEC", "PEC"],
        affiliations: ["Pakistan Air Force"],
        notable_alumni: ["Air Force Officers", "Engineers"],
        research_areas: ["Aerospace Engineering", "Computer Science", "Management"],
        description: "Air University is a public university established by the Pakistan Air Force.",
        admission_requirements: "University Entry Test",
        tuition_fee_range: "PKR 35,000 - 75,000 per semester",
        scholarships: ["PAF Scholarships", "Merit Awards"],
        hostel_facilities: true,
        library: {
            books: 80000,
            digital_resources: true,
            study_spaces: 400
        },
        sports_facilities: ["PAF Sports Complex", "Aviation Museum"],
        international_programs: true,
        exchange_programs: ["International Aerospace Programs"]
    },
    {
        id: "university-of-balochistan",
        name: "University of Balochistan",
        shortName: "UoB",
        province: "Balochistan",
        city: "Quetta",
        type: "Public",
        website: "https://uob.edu.pk",
        established: 1970,
        ranking: 14,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/University_of_Balochistan.jpg/1200px-University_of_Balochistan.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/University_of_Balochistan_logo.png/150px-University_of_Balochistan_logo.png",
        students: 12000,
        faculty: 600,
        campuses: 1,
        acres: 1300,
        chancellor: "Governor of Balochistan",
        vicechancellor: "Prof. Dr. Shafiq ur Rehman",
        programs: ["BA", "BS", "MA", "MS", "M.Phil", "PhD"],
        faculties: ["Arts", "Sciences", "Social Sciences", "Islamic Studies"],
        contact: {
            phone: "+92-81-9211255",
            email: "info@uob.edu.pk",
            address: "Sariab Road, Quetta, Balochistan, Pakistan"
        },
        accreditation: ["HEC"],
        affiliations: ["Universities of Pakistan"],
        notable_alumni: ["Provincial Leaders", "Scholars"],
        research_areas: ["Balochi Studies", "Geology", "Geography"],
        description: "The University of Balochistan is the premier university of Balochistan province.",
        admission_requirements: "Intermediate with minimum 45% marks",
        tuition_fee_range: "PKR 8,000 - 25,000 per semester",
        scholarships: ["Balochistan Government Scholarships", "Merit Awards"],
        hostel_facilities: true,
        library: {
            books: 180000,
            digital_resources: false,
            study_spaces: 300
        },
        sports_facilities: ["Sports Ground", "Gymnasium"],
        international_programs: false,
        exchange_programs: ["Limited Programs"]
    },
    {
        id: "international-islamic-university",
        name: "International Islamic University Islamabad",
        shortName: "IIUI",
        province: "Islamabad Capital Territory",
        city: "Islamabad",
        type: "Public",
        website: "https://iiui.edu.pk",
        established: 1980,
        ranking: 15,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/i/i1/IIUI_Main_Campus.jpg/1200px-IIUI_Main_Campus.jpg",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/IIUI_logo.png/150px-IIUI_logo.png",
        students: 25000,
        faculty: 1200,
        campuses: 2,
        acres: 1800,
        chancellor: "President of Pakistan",
        vicechancellor: "Prof. Dr. Ahmed Yousif Al-Draiweesh",
        programs: ["BA", "BS", "MA", "MS", "M.Phil", "PhD", "LLB"],
        faculties: ["Shariah & Law", "Arabic", "Social Sciences", "Engineering", "Management Sciences"],
        contact: {
            phone: "+92-51-9019-7967",
            email: "info@iiui.edu.pk",
            address: "H-10, Islamabad, Pakistan"
        },
        accreditation: ["HEC", "OIC"],
        affiliations: ["Organization of Islamic Cooperation"],
        notable_alumni: ["Islamic Scholars", "Diplomats"],
        research_areas: ["Islamic Studies", "Arabic Literature", "Engineering"],
        description: "IIUI is an international Islamic university with students from across the Muslim world.",
        admission_requirements: "University Entry Test and Islamic Studies background",
        tuition_fee_range: "PKR 20,000 - 60,000 per semester",
        scholarships: ["OIC Scholarships", "International Scholarships"],
        hostel_facilities: true,
        library: {
            books: 300000,
            digital_resources: true,
            study_spaces: 800
        },
        sports_facilities: ["Sports Complex", "Mosque Complex"],
        international_programs: true,
        exchange_programs: ["Islamic Universities Worldwide"]
    }
];

// API Service Functions
export class PakistaniUniversitiesAPI {
    private static instance: PakistaniUniversitiesAPI;
    private universities: PakistaniUniversity[] = pakistaniUniversities;

    static getInstance(): PakistaniUniversitiesAPI {
        if (!PakistaniUniversitiesAPI.instance) {
            PakistaniUniversitiesAPI.instance = new PakistaniUniversitiesAPI();
        }
        return PakistaniUniversitiesAPI.instance;
    }

    async getAllUniversities(): Promise<PakistaniUniversity[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.universities;
    }

    async getUniversityById(id: string): Promise<PakistaniUniversity | null> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.universities.find(uni => uni.id === id) || null;
    }

    async searchUniversities(query: string): Promise<PakistaniUniversity[]> {
        await new Promise(resolve => setTimeout(resolve, 300));
        const normalizedQuery = query.toLowerCase();
        return this.universities.filter(uni =>
            uni.name.toLowerCase().includes(normalizedQuery) ||
            uni.city.toLowerCase().includes(normalizedQuery) ||
            uni.province.toLowerCase().includes(normalizedQuery) ||
            uni.programs.some(program => program.toLowerCase().includes(normalizedQuery))
        );
    }

    async getUniversitiesByProvince(province: string): Promise<PakistaniUniversity[]> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.universities.filter(uni =>
            uni.province.toLowerCase() === province.toLowerCase()
        );
    }

    async getTopRankedUniversities(limit: number = 10): Promise<PakistaniUniversity[]> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.universities
            .sort((a, b) => a.ranking - b.ranking)
            .slice(0, limit);
    }

    async getUniversitiesByType(type: 'Public' | 'Private'): Promise<PakistaniUniversity[]> {
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.universities.filter(uni => uni.type === type);
    }

    async getUniversityStatistics() {
        await new Promise(resolve => setTimeout(resolve, 200));
        return {
            totalUniversities: this.universities.length,
            publicUniversities: this.universities.filter(u => u.type === 'Public').length,
            privateUniversities: this.universities.filter(u => u.type === 'Private').length,
            totalStudents: this.universities.reduce((sum, u) => sum + u.students, 0),
            totalFaculty: this.universities.reduce((sum, u) => sum + u.faculty, 0),
            provinces: [...new Set(this.universities.map(u => u.province))].length,
            oldestUniversity: this.universities.reduce((oldest, current) =>
                current.established < oldest.established ? current : oldest
            ),
            largestUniversity: this.universities.reduce((largest, current) =>
                current.students > largest.students ? current : largest
            )
        };
    }
}