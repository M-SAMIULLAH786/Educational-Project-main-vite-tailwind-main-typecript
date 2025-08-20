import React from "react";
import { Users, GraduationCap, University, Settings } from "lucide-react";

const SuperAdmin = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Super Admin Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                    Manage colleges, degrees.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    icon={<University size={32} />}
                    title="Total Colleges"
                    value="128"
                    color="from-sky-400 to-blue-500"
                />
                <StatCard
                    icon={<GraduationCap size={32} />}
                    title="Total Degrees"
                    value="542"
                    color="from-emerald-400 to-green-500"
                />
                <StatCard
                    icon={<Users size={32} />}
                    title="Active Users"
                    value="3,240"
                    color="from-purple-400 to-indigo-500"
                />
                <StatCard
                    icon={<Settings size={32} />}
                    title="System Settings"
                    value="Configured"
                    color="from-amber-400 to-orange-500"
                />
            </section>

           
        </div>
    );
};
const StatCard = ({
    icon,
    title,
    value,
    color,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
}) => (
    <div
        className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md bg-gradient-to-r ${color} text-white`}
    >
        <div className="mb-3">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const ManagementCard = ({
    title,
    desc,
    btn,
}: {
    title: string;
    desc: string;
    btn: string;
}) => (
    <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{desc}</p>
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:opacity-90">
            {btn}
        </button>
    </div>
);

export default SuperAdmin;
