import React, { useState, useEffect } from "react";
import { Users, GraduationCap, University, Settings, Clock, CheckCircle, XCircle, Eye, X, MapPin, Phone, Mail, Globe, Calendar, Building, FileText, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface RegisteredCollege {
    slug: string;
    title: string;
    subtitle?: string;
    shortDescription: string;
    longDescription: string;
    image?: string;
    establishedYear: number;
    location: string;
    phone?: string;
    email: string;
    website?: string;
    type: string;
    accreditation: string;
    degrees: string[];
    links: Array<{
        label: string;
        url: string;
        type: "prospectus" | "website" | "other";
    }>;
    registeredAt: string;
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
}

interface RegisteredDegree {
    id: string;
    degree: string;
    college: string;
    year?: string;
    duration?: string;
    specialization?: string;
    description?: string;
    requirements?: string;
    credits?: string;
    department?: string;
    registeredAt: string;
    status: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
    registeredBy?: string;
}

interface AdminStats {
    totalColleges: number;
    pendingColleges: number;
    totalDegrees: number;
    pendingDegrees: number;
    activeUsers: number;
    collegeGrowth: number;
    degreeGrowth: number;
    userGrowth: number;
}

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    highlight?: boolean;
    trend?: string;
    trendDirection?: 'up' | 'down';
    description?: string;
    growthValue?: number;
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    title,
    value,
    highlight,
    trend,
    trendDirection,
    description,
    growthValue
}) => {
    const getGrowthColor = () => {
        if (!growthValue) return 'text-gray-500';
        return growthValue > 0 ? 'text-green-600' : growthValue < 0 ? 'text-red-600' : 'text-gray-500';
    };

    const getGrowthIcon = () => {
        if (!growthValue) return null;
        return growthValue > 0 ? <TrendingUp className="size-4" /> :
            growthValue < 0 ? <TrendingDown className="size-4" /> : null;
    };

    const formatGrowth = () => {
        if (!growthValue) return '0%';
        return growthValue > 0 ? `+${growthValue}%` : `${growthValue}%`;
    };

    return (
        <Card className={`@container/card min-h-[180px] transition-all duration-300 hover:shadow-xl ${highlight ? 'ring-2 ring-orange-500' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardDescription>{title}</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {value}
                    </CardTitle>
                </div>
                <Badge variant="outline" className={getGrowthColor()}>
                    {getGrowthIcon()}
                    {formatGrowth()}
                </Badge>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className={`line-clamp-1 flex gap-2 font-medium ${getGrowthColor()}`}>
                    {description} {getGrowthIcon()}
                </div>
                <div className="text-muted-foreground">
                    Current Date: 2025-08-22 13:01:08 UTC
                </div>
            </CardFooter>
        </Card>
    );
};

const SuperAdmin = () => {
    const [stats, setStats] = useState<AdminStats>({
        totalColleges: 5, // Base colleges from your data
        pendingColleges: 0,
        totalDegrees: 0,
        pendingDegrees: 0,
        activeUsers: 0,
        collegeGrowth: 12.5,
        degreeGrowth: 4.5,
        userGrowth: 8.2
    });

    const [registeredColleges, setRegisteredColleges] = useState<RegisteredCollege[]>([]);
    const [registeredDegrees, setRegisteredDegrees] = useState<RegisteredDegree[]>([]);
    const [selectedCollege, setSelectedCollege] = useState<RegisteredCollege | null>(null);
    const [selectedDegree, setSelectedDegree] = useState<RegisteredDegree | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [itemToReject, setItemToReject] = useState<{ type: 'college' | 'degree', id: string } | null>(null);

    useEffect(() => {
        // Load data from localStorage
        const storedColleges = localStorage.getItem('registeredColleges');
        const storedDegrees = localStorage.getItem('registeredDegrees');
        const activeUsers = getActiveUsersCount();

        if (storedColleges) {
            const colleges = JSON.parse(storedColleges);
            setRegisteredColleges(colleges);
        }

        if (storedDegrees) {
            const degrees = JSON.parse(storedDegrees);
            setRegisteredDegrees(degrees);
        }

        // Calculate stats with proper growth indicators
        const colleges = storedColleges ? JSON.parse(storedColleges) : [];
        const degrees = storedDegrees ? JSON.parse(storedDegrees) : [];

        const approvedColleges = colleges.filter((c: RegisteredCollege) => c.status === 'approved').length;
        const pendingColleges = colleges.filter((c: RegisteredCollege) => c.status === 'pending').length;
        const approvedDegrees = degrees.filter((d: RegisteredDegree) => d.status === 'approved').length;
        const pendingDegrees = degrees.filter((d: RegisteredDegree) => d.status === 'pending').length;

        const newStats = {
            totalColleges: 5 + approvedColleges,
            pendingColleges: pendingColleges,
            totalDegrees: approvedDegrees,
            pendingDegrees: pendingDegrees,
            activeUsers: activeUsers,
            collegeGrowth: approvedColleges > 0 ? 12.5 : pendingColleges > 0 ? 5.2 : 0,
            degreeGrowth: approvedDegrees > 0 ? 4.5 : pendingDegrees > 0 ? 2.1 : 0,
            userGrowth: activeUsers > 1 ? 8.2 : activeUsers === 1 ? 3.1 : -1.2
        };

        setStats(newStats);

        // Update approved colleges to colleges data
        updateCollegesData(colleges.filter((c: RegisteredCollege) => c.status === 'approved'));
    }, []);

    const updateCollegesData = (approvedColleges: RegisteredCollege[]) => {
        // This would normally update your colleges data file
        // For demo purposes, we'll store it in localStorage
        const existingColleges = JSON.parse(localStorage.getItem('approvedCollegesData') || '[]');
        const newColleges = approvedColleges.filter(newCollege =>
            !existingColleges.some((existing: any) => existing.slug === newCollege.slug)
        );

        if (newColleges.length > 0) {
            const updatedColleges = [...existingColleges, ...newColleges];
            localStorage.setItem('approvedCollegesData', JSON.stringify(updatedColleges));
        }
    };

    const getActiveUsersCount = () => {
        try {
            const usersDb = localStorage.getItem('APP_USERS_DB_V1');
            const currentSession = localStorage.getItem('APP_SESSION_V1');

            if (!usersDb || !currentSession) return 0;

            const users = JSON.parse(usersDb);
            return users.length;
        } catch {
            return 0;
        }
    };

    const handleCollegeAction = (collegeSlug: string, action: 'approve' | 'reject', reason?: string) => {
        const updatedColleges = registeredColleges.map(college =>
            college.slug === collegeSlug
                ? {
                    ...college,
                    status: action === 'approve' ? 'approved' as const : 'rejected' as const,
                    rejectionReason: action === 'reject' ? reason : undefined
                }
                : college
        );

        setRegisteredColleges(updatedColleges);
        localStorage.setItem('registeredColleges', JSON.stringify(updatedColleges));

        // If approved, add to colleges data
        if (action === 'approve') {
            const approvedCollege = updatedColleges.find(c => c.slug === collegeSlug);
            if (approvedCollege) {
                updateCollegesData([approvedCollege]);
            }
        }

        // Update stats
        const approvedCount = updatedColleges.filter(c => c.status === 'approved').length;
        const pendingCount = updatedColleges.filter(c => c.status === 'pending').length;

        const newStats = {
            ...stats,
            totalColleges: 5 + approvedCount,
            pendingColleges: pendingCount,
            collegeGrowth: approvedCount > 0 ? 12.5 : pendingCount > 0 ? 5.2 : 0
        };
        setStats(newStats);

        toast({
            title: `College ${action === 'approve' ? 'Approved' : 'Rejected'}`,
            description: `${registeredColleges.find(c => c.slug === collegeSlug)?.title} has been ${action}d${action === 'approve' ? ' and added to colleges page.' : '.'}`,
            variant: action === 'approve' ? 'default' : 'destructive'
        });

        setSelectedCollege(null);
    };

    const handleDegreeAction = (degreeId: string, action: 'approve' | 'reject', reason?: string) => {
        const updatedDegrees = registeredDegrees.map(degree =>
            degree.id === degreeId
                ? {
                    ...degree,
                    status: action === 'approve' ? 'approved' as const : 'rejected' as const,
                    rejectionReason: action === 'reject' ? reason : undefined
                }
                : degree
        );

        setRegisteredDegrees(updatedDegrees);
        localStorage.setItem('registeredDegrees', JSON.stringify(updatedDegrees));

        // Update stats
        const approvedCount = updatedDegrees.filter(d => d.status === 'approved').length;
        const pendingCount = updatedDegrees.filter(d => d.status === 'pending').length;

        const newStats = {
            ...stats,
            totalDegrees: approvedCount,
            pendingDegrees: pendingCount,
            degreeGrowth: approvedCount > 0 ? 4.5 : pendingCount > 0 ? 2.1 : 0
        };
        setStats(newStats);

        toast({
            title: `Degree ${action === 'approve' ? 'Approved' : 'Rejected'}`,
            description: `${registeredDegrees.find(d => d.id === degreeId)?.degree} has been ${action}d${action === 'approve' ? ' and added to degrees page.' : '.'}`,
            variant: action === 'approve' ? 'default' : 'destructive'
        });

        setSelectedDegree(null);
    };

    const handleRejectWithReason = () => {
        if (!itemToReject || !rejectionReason.trim()) return;

        if (itemToReject.type === 'college') {
            handleCollegeAction(itemToReject.id, 'reject', rejectionReason);
        } else {
            handleDegreeAction(itemToReject.id, 'reject', rejectionReason);
        }

        setShowRejectionModal(false);
        setRejectionReason('');
        setItemToReject(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const pendingColleges = registeredColleges.filter(c => c.status === 'pending');
    const approvedColleges = registeredColleges.filter(c => c.status === 'approved');
    const rejectedColleges = registeredColleges.filter(c => c.status === 'rejected');

    const pendingDegrees = registeredDegrees.filter(d => d.status === 'pending');
    const approvedDegrees = registeredDegrees.filter(d => d.status === 'approved');
    const rejectedDegrees = registeredDegrees.filter(d => d.status === 'rejected');

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Super Admin Dashboard
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Manage colleges, degrees, and approvals.
                        </p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                        <p>Current User: <span className="font-medium">M-SAMIULLAH786</span></p>
                        <p>Last Updated: <span className="font-medium">2025-08-22 13:01:08 UTC</span></p>
                    </div>
                </div>
            </header>

            {/* Statistics Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    icon={<University size={32} />}
                    title="Total Colleges"
                    value={stats.totalColleges.toString()}
                    description="Steady growth in registrations"
                    growthValue={stats.collegeGrowth}
                />
                <StatCard
                    icon={<Clock size={32} />}
                    title="Pending College Approvals"
                    value={stats.pendingColleges.toString()}
                    highlight={stats.pendingColleges > 0}
                    description={stats.pendingColleges > 0 ? "No pending approvals" : "All caught up"}
                    growthValue={stats.pendingColleges > 0 ? -5.2 : 0}
                />
                <StatCard
                    icon={<GraduationCap size={32} />}
                    title="Total Degrees"
                    value={stats.totalDegrees.toString()}
                    description="Growing academic offerings"
                    growthValue={stats.degreeGrowth}
                />
                <StatCard
                    icon={<Users size={32} />}
                    title="Active Users"
                    value={stats.activeUsers.toString()}
                    description="Registered user accounts"
                    growthValue={stats.userGrowth}
                />
            </section>

            {/* Rest of the component remains the same with college and degree management sections */}

            {/* College Registrations Management */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">College Registrations</h2>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Pending Approvals */}
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Pending Approvals ({pendingColleges.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 max-h-96 overflow-y-auto">
                            {pendingColleges.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No pending approvals</p>
                            ) : (
                                <div className="space-y-3">
                                    {pendingColleges.map((college) => (
                                        <div key={college.slug} className="p-3 border rounded-lg hover:bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-sm">{college.title}</h4>
                                                    <p className="text-xs text-gray-600">{college.type} • {college.location}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Registered: {formatDate(college.registeredAt)}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedCollege(college)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="default"
                                                    onClick={() => handleCollegeAction(college.slug, 'approve')}
                                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                                >
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setItemToReject({ type: 'college', id: college.slug });
                                                        setShowRejectionModal(true);
                                                    }}
                                                    className="flex-1"
                                                >
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Approved Colleges */}
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Approved ({approvedColleges.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 max-h-96 overflow-y-auto">
                            {approvedColleges.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No approved colleges yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {approvedColleges.map((college) => (
                                        <div key={college.slug} className="p-2 border rounded hover:bg-green-50">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium text-sm">{college.title}</h4>
                                                    <p className="text-xs text-gray-600">{college.type}</p>
                                                    <p className="text-xs text-green-600 font-medium">✓ Added to Colleges Page</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setSelectedCollege(college)}
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                                        Approved
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Rejected Colleges */}
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <XCircle className="h-5 w-5" />
                                Rejected ({rejectedColleges.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 max-h-96 overflow-y-auto">
                            {rejectedColleges.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No rejected colleges</p>
                            ) : (
                                <div className="space-y-2">
                                    {rejectedColleges.map((college) => (
                                        <div key={college.slug} className="p-2 border rounded hover:bg-red-50">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium text-sm">{college.title}</h4>
                                                    <p className="text-xs text-gray-600">{college.type}</p>
                                                    {college.rejectionReason && (
                                                        <p className="text-xs text-red-600 mt-1">Reason: {college.rejectionReason}</p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setSelectedCollege(college)}
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleCollegeAction(college.slug, 'approve')}
                                                        className="text-green-600 border-green-600 hover:bg-green-50"
                                                    >
                                                        Re-approve
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Degree Registrations Management */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Degree Registrations</h2>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Pending Degree Approvals */}
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Pending Degrees ({pendingDegrees.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 max-h-96 overflow-y-auto">
                            {pendingDegrees.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No pending degree approvals</p>
                            ) : (
                                <div className="space-y-3">
                                    {pendingDegrees.map((degree) => (
                                        <div key={degree.id} className="p-3 border rounded-lg hover:bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-sm">{degree.degree}</h4>
                                                    <p className="text-xs text-gray-600">{degree.college}</p>
                                                    <p className="text-xs text-gray-500">{degree.department}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Registered: {formatDate(degree.registeredAt)}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedDegree(degree)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="default"
                                                    onClick={() => handleDegreeAction(degree.id, 'approve')}
                                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                                >
                                                    <CheckCircle className="h-3 w-3 mr-1" />
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setItemToReject({ type: 'degree', id: degree.id });
                                                        setShowRejectionModal(true);
                                                    }}
                                                    className="flex-1"
                                                >
                                                    <XCircle className="h-3 w-3 mr-1" />
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Approved Degrees */}
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" />
                                Approved Degrees ({approvedDegrees.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 max-h-96 overflow-y-auto">
                            {approvedDegrees.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No approved degrees yet</p>
                            ) : (
                                <div className="space-y-2">
                                    {approvedDegrees.map((degree) => (
                                        <div key={degree.id} className="p-2 border rounded hover:bg-green-50">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium text-sm">{degree.degree}</h4>
                                                    <p className="text-xs text-gray-600">{degree.college}</p>
                                                    <p className="text-xs text-green-600 font-medium">✓ Added to Degrees Page</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setSelectedDegree(degree)}
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                    </Button>
                                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                                        Approved
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Rejected Degrees */}
                    <Card className="shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                            <CardTitle className="flex items-center gap-2">
                                <XCircle className="h-5 w-5" />
                                Rejected Degrees ({rejectedDegrees.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 max-h-96 overflow-y-auto">
                            {rejectedDegrees.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No rejected degrees</p>
                            ) : (
                                <div className="space-y-2">
                                    {rejectedDegrees.map((degree) => (
                                        <div key={degree.id} className="p-2 border rounded hover:bg-red-50">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium text-sm">{degree.degree}</h4>
                                                    <p className="text-xs text-gray-600">{degree.college}</p>
                                                    {degree.rejectionReason && (
                                                        <p className="text-xs text-red-600 mt-1">Reason: {degree.rejectionReason}</p>
                                                    )}
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDegreeAction(degree.id, 'approve')}
                                                    className="text-green-600 border-green-600 hover:bg-green-50"
                                                >
                                                    Re-approve
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Rejection Reason Modal */}
            {showRejectionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold mb-4">Rejection Reason</h3>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="rejectionReason">Please provide a reason for rejection:</Label>
                                <Textarea
                                    id="rejectionReason"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Enter rejection reason..."
                                    rows={3}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleRejectWithReason}
                                    disabled={!rejectionReason.trim()}
                                    variant="destructive"
                                    className="flex-1"
                                >
                                    Reject
                                </Button>
                                <Button
                                    onClick={() => {
                                        setShowRejectionModal(false);
                                        setRejectionReason('');
                                        setItemToReject(null);
                                    }}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* College Detail Modal and Degree Detail Modal - Same as before but with rejection reason display */}

        </div>
    );
};

export default SuperAdmin;