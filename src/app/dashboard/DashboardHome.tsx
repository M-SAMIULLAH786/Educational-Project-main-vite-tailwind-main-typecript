export default function DashboardHome() {
    return (
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20m9-9H3" />
                        </svg>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Subscriptions</h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="m22 21-3-3m0 0a5.5 5.5 0 1 0-7.78-7.78 5.5 5.5 0 0 0 7.78 7.78Z" />
                        </svg>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Sales</h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </div>
                    <div className="space-y-1">
                        <div className="text-2xl font-bold">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-card shadow-sm">
                <div className="flex items-center justify-between p-6 pb-2">
                    <div className="space-y-1">
                        <h3 className="text-lg font-medium">Analytics Overview</h3>
                        <p className="text-sm text-muted-foreground">Your performance metrics for the last 30 days</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            Last 7 days
                        </button>
                        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3">
                            Last 30 days
                        </button>
                    </div>
                </div>
                <div className="p-6 pt-0">
                    <div className="h-[300px] w-full rounded-md bg-muted/20 flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                        <div className="text-center space-y-2">
                            <div className="text-muted-foreground">📊</div>
                            <p className="text-sm text-muted-foreground">Chart visualization would go here</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">New user registered</p>
                                <p className="text-xs text-muted-foreground">2 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">Payment received</p>
                                <p className="text-xs text-muted-foreground">5 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">System update completed</p>
                                <p className="text-xs text-muted-foreground">1 hour ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-card p-6 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-muted-foreground/25 hover:bg-muted/50 transition-colors">
                            <div className="text-2xl mb-2">📝</div>
                            <span className="text-sm font-medium">Create Report</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-muted-foreground/25 hover:bg-muted/50 transition-colors">
                            <div className="text-2xl mb-2">👥</div>
                            <span className="text-sm font-medium">Add User</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-muted-foreground/25 hover:bg-muted/50 transition-colors">
                            <div className="text-2xl mb-2">⚙️</div>
                            <span className="text-sm font-medium">Settings</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-muted-foreground/25 hover:bg-muted/50 transition-colors">
                            <div className="text-2xl mb-2">📊</div>
                            <span className="text-sm font-medium">Analytics</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}