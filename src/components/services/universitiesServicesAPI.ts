import { enhancedPakistaniUniversities, fetchUniversitiesFromAPI, PakistaniUniversity } from './universitiesAPI';

export interface UniversityWithDetails extends PakistaniUniversity {
    slug: string;
    image: string;
    shortDescription: string;
    longDescription: string;
    degrees: string[];
    links: Array<{
        label: string;
        url: string;
        type: "website" | "admissions" | "prospectus";
    }>;
    contact: {
        phone?: string;
        email?: string;
        address: string;
    };
    stats: {
        students: number;
        faculty: number;
        campuses: number;
    };
}

export class UniversitiesService {
    private static instance: UniversitiesService;
    private universities: UniversityWithDetails[] = [];

    static getInstance(): UniversitiesService {
        if (!UniversitiesService.instance) {
            UniversitiesService.instance = new UniversitiesService();
        }
        return UniversitiesService.instance;
    }

    async loadUniversities(): Promise<UniversityWithDetails[]> {
        try {
            // Try to fetch from API first
            const apiUniversities = await fetchUniversitiesFromAPI();

            // Combine API data with our enhanced data
            const combinedData = this.combineUniversityData(apiUniversities);

            this.universities = combinedData;

            // Cache the data
            localStorage.setItem('pakistani_universities_cache', JSON.stringify(combinedData));
            localStorage.setItem('universities_last_updated', new Date().toISOString());

            return combinedData;
        } catch (error) {
            console.error('Error loading universities:', error);

            // Fallback to cached data or default data
            const cachedData = localStorage.getItem('pakistani_universities_cache');
            if (cachedData) {
                this.universities = JSON.parse(cachedData);
                return this.universities;
            }

            // Final fallback to our static data
            return this.getEnhancedUniversityData();
        }
    }

    private combineUniversityData(apiData: any[]): UniversityWithDetails[] {
        return enhancedPakistaniUniversities.map(uni => ({
            ...uni,
            slug: this.generateSlug(uni.name),
            image: this.getUniversityImage(uni.name),
            shortDescription: this.generateShortDescription(uni),
            longDescription: this.generateLongDescription(uni),
            degrees: uni.programs,
            links: [
                {
                    label: "Official Website",
                    url: uni.website,
                    type: "website" as const
                },
                {
                    label: "Admissions",
                    url: `${uni.website}/admissions`,
                    type: "admissions" as const
                },
                {
                    label: "Prospectus",
                    url: `${uni.website}/prospectus`,
                    type: "prospectus" as const
                }
            ],
            contact: {
                phone: this.getUniversityPhone(uni.name),
                email: this.getUniversityEmail(uni.name),
                address: `${uni.city}, ${uni.province}, Pakistan`
            },
            stats: this.getUniversityStats(uni.name)
        }));
    }

    private getEnhancedUniversityData(): UniversityWithDetails[] {
        return enhancedPakistaniUniversities.map(uni => ({
            ...uni,
            slug: this.generateSlug(uni.name),
            image: this.getUniversityImage(uni.name),
            shortDescription: this.generateShortDescription(uni),
            longDescription: this.generateLongDescription(uni),
            degrees: uni.programs,
            links: [
                {
                    label: "Official Website",
                    url: uni.website,
                    type: "website" as const
                },
                {
                    label: "Admissions",
                    url: `${uni.website}/admissions`,
                    type: "admissions" as const
                },
                {
                    label: "Prospectus",
                    url: `${uni.website}/prospectus`,
                    type: "prospectus" as const
                }
            ],
            contact: {
                phone: this.getUniversityPhone(uni.name),
                email: this.getUniversityEmail(uni.name),
                address: `${uni.city}, ${uni.province}, Pakistan`
            },
            stats: this.getUniversityStats(uni.name)
        }));
    }

    private generateSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    private getUniversityImage(name: string): string {
        const imageMap: { [key: string]: string } = {
            "University of Karachi": "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
            "Lahore University of Management Sciences (LUMS)": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
            "Quaid-i-Azam University": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
            "National University of Sciences and Technology (NUST)": "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
            "University of the Punjab": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800"
        };
        return imageMap[name] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800";
    }

    private generateShortDescription(uni: PakistaniUniversity): string {
        return `${uni.type} university in ${uni.city}, ${uni.province}, established in ${uni.established}.`;
    }

    private generateLongDescription(uni: PakistaniUniversity): string {
        return `${uni.name} is a prestigious ${uni.type.toLowerCase()} university located in ${uni.city}, ${uni.province}. Established in ${uni.established}, it has been a leading institution of higher education in Pakistan, offering diverse academic programs and contributing significantly to research and development in the region.`;
    }

    private getUniversityPhone(name: string): string {
        const phoneMap: { [key: string]: string } = {
            "University of Karachi": "+92-21-99261300",
            "Lahore University of Management Sciences (LUMS)": "+92-42-35608000",
            "Quaid-i-Azam University": "+92-51-90642172",
            "National University of Sciences and Technology (NUST)": "+92-51-90855600"
        };
        return phoneMap[name] || "+92-XXX-XXXXXXX";
    }

    private getUniversityEmail(name: string): string {
        const emailMap: { [key: string]: string } = {
            "University of Karachi": "info@uok.edu.pk",
            "Lahore University of Management Sciences (LUMS)": "admissions@lums.edu.pk",
            "Quaid-i-Azam University": "info@qau.edu.pk",
            "National University of Sciences and Technology (NUST)": "info@nust.edu.pk"
        };
        return emailMap[name] || "info@university.edu.pk";
    }

    private getUniversityStats(name: string): { students: number; faculty: number; campuses: number } {
        const statsMap: { [key: string]: { students: number; faculty: number; campuses: number } } = {
            "University of Karachi": { students: 24000, faculty: 1200, campuses: 1 },
            "Lahore University of Management Sciences (LUMS)": { students: 4500, faculty: 350, campuses: 1 },
            "Quaid-i-Azam University": { students: 13000, faculty: 800, campuses: 1 },
            "National University of Sciences and Technology (NUST)": { students: 15000, faculty: 900, campuses: 4 }
        };
        return statsMap[name] || { students: 5000, faculty: 300, campuses: 1 };
    }

    async searchUniversities(query: string): Promise<UniversityWithDetails[]> {
        if (this.universities.length === 0) {
            await this.loadUniversities();
        }

        const normalizedQuery = query.toLowerCase();
        return this.universities.filter(uni =>
            uni.name.toLowerCase().includes(normalizedQuery) ||
            uni.city.toLowerCase().includes(normalizedQuery) ||
            uni.province.toLowerCase().includes(normalizedQuery) ||
            uni.programs.some(program => program.toLowerCase().includes(normalizedQuery))
        );
    }

    async getUniversityBySlug(slug: string): Promise<UniversityWithDetails | null> {
        if (this.universities.length === 0) {
            await this.loadUniversities();
        }

        return this.universities.find(uni => uni.slug === slug) || null;
    }

    async getUniversitiesByProvince(province: string): Promise<UniversityWithDetails[]> {
        if (this.universities.length === 0) {
            await this.loadUniversities();
        }

        return this.universities.filter(uni =>
            uni.province.toLowerCase() === province.toLowerCase()
        );
    }

    async getTopRankedUniversities(limit: number = 10): Promise<UniversityWithDetails[]> {
        if (this.universities.length === 0) {
            await this.loadUniversities();
        }

        return this.universities
            .filter(uni => uni.ranking)
            .sort((a, b) => (a.ranking || 999) - (b.ranking || 999))
            .slice(0, limit);
    }
}